<template>
  <div class="left-component">
    <div class="left-container">
      <div class="title">分组列表</div>
      <div class="collection-list">
        <div v-for="(item,index) in collection_list" :key="index" v-if="collection_list.length > 0">
          <div class="item bg-white" @click="clickCollection(item,index)"
               :style="{'background':current_collection_index === index ? '#eee': '#fff'}">
            <div class="name">{{ item.data.name }}</div>
            <div class="desc mt-0.5">{{ item.data.num }} Snippets, prefix {{ item.data.prefix }}</div>
          </div>
        </div>
        <el-empty v-if="!collection_list.length" :image-size="100" class="mt-20" description="暂无分组"></el-empty>
      </div>
      <div class="add-btn">
        <el-button-group>
          <el-button size="mini" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
          <el-button size="mini" icon="el-icon-minus"
                     :disabled="this.current_collection_index >= this.collection_list.length"
                     @click="delCollection"></el-button>
        </el-button-group>
      </div>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="65%">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.name"></el-input>
          <div class="explain mt-1.5">集合的名称, 最多不超过10个字符!</div>
        </el-form-item>
        <el-form-item label="Prefix" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.prefix" placeholder="prefix"></el-input>
          <div class="explain mt-1.5">本集合中所有片段的关键字前缀，即设置本集合中的所有片段在展开前都需要
            > 前缀。
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmit()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getCollectionEntity} from "@/entitys";

export default {
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        prefix: ''
      },
      formLabelWidth: '50px',
      currCollectionItem: {},
      collection_list: [],
      current_collection_index: 0,
    }
  },
  created() {
    this.getCollectionList()
  },
  methods: {
    getCollectionList() {
      this.collection_list = window.utools.db.allDocs("collection")
    },
    delCollection() {
      // 确认删除对话框
      this.$confirm('此操作将删除该分组及分组下的所有数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let result = window.utools.db.remove(this.currCollectionItem)
        if (result.ok) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getCollectionList()
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },
    clickCollection(item, index) {
      this.currCollectionItem = item
      this.current_collection_index = index
      this.$emit('clickCollection', item, index)
    },
    onSubmit() {
      if (!this._verify()) return false;

      let collectionEntity = getCollectionEntity(this.form.name, this.form.prefix)
      let result = window.utools.db.put({
        _id: `collection/${collectionEntity.id}`,
        data: collectionEntity
      })
      if (result.ok) {
        this.dialogFormVisible = false;
        this.form = {
          name: '',
          prefix: ''
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.getCollectionList()
      } else {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    },

    _verify() {
      if (this.form.name === '') {
        this.$message({
          message: '请输入集合名称',
          type: 'warning'
        })
        return false;
      }
      return true;
    },
  },

}
</script>
<style lang="scss" scoped>
.left-container {
  height: 80vh;

  .title {
    font-size: 12px;
    padding: 4px;
    background: #fff;
    box-shadow: 0 0 4px #eee;
    border-radius: 3px 3px 0 0;
    border: 1px solid #eee;
    font-weight: 500;
  }

  .collection-list {
    background: #fff;
    // y轴超出部分滚动
    overflow-y: auto;
    height: 95%;
    padding-bottom: 10px;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-radius: 0 0 3px 3px;

    .name {
      font-size: 12px;
    }

    .desc {
      font-size: 12px;
      color: #aaa;
    }

    .item {
      padding: 5px 10px;
      cursor: pointer;
      // 虚线
      border-bottom: 1px dashed #eee;

      &:hover {
        background: #eee;
      }
    }
  }

  .add-btn {
    width: 100%;
    display: flex;
    justify-content: right;
    margin-top: 2px;

    .el-button--mini {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
    }
  }

}

.explain {
  font-size: 12px;
  color: #999;
  line-height: 18px;
}
</style>
