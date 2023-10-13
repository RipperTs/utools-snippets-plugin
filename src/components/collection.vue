<template>
  <div class="left-component">
    <div class="left-container">
      <div class="title">分组列表</div>
      <div class="collection-list">
        <div v-for="(item,index) in collection_list" :key="index" v-if="collection_list.length > 0">
          <div class="item bg-white collection-item" @dblclick="dblclickCollection(item,index)"
               @click="clickCollection(item,index)"
               :class="current_collection_index=== index ? 'collection-item-active' : ''">
            <div class="name">{{ item.data.name }}</div>
            <div class="desc mt-0.5">共有 {{ item.data.num }} 个片段
            </div>
          </div>
        </div>
        <el-empty v-if="!collection_list.length" :image-size="100" class="mt-20"
                  description="暂无分组"></el-empty>
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

    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" @close="closeDialog"
               width="50%">
      <el-form class="form-box" :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.name"></el-input>
          <div class="explain mt-1.5">集合的名称, 最多不超过20个字符!</div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmit()">{{
            edit_collection_item !== null ? '修 改' : '保 存'
          }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {editCollectionEntity, getCollectionEntity} from "@/entitys";
import {collection_prefix} from "@/utils";

export default {
  props: {
    collection_list: {
      type: Array,
      default: () => []
    },
    current_collection_index: {
      type: Number,
      default: 0
    },
    current_collection_item: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        prefix: ''
      },
      formLabelWidth: '50px',
      edit_collection_item: null,
    }
  },

  methods: {

    closeDialog() {
      this.edit_collection_item = null
    },

    /**
     * 双击修改集合
     * @param item
     */
    dblclickCollection(item) {
      this.form = {
        name: item.data.name,
        prefix: item.data.prefix
      }
      this.edit_collection_item = item
      this.dialogFormVisible = true
    },

    /**
     * 删除集合
     * @returns {boolean}
     */
    delCollection() {
      const snippet_list = window.utools.db.allDocs(this.current_collection_item.data.id + '')
      if (snippet_list && snippet_list.length > 0) {
        this.$message({
          message: '请先删除所有文本片段后再删除分组',
          type: 'warning'
        })
        return false;
      }
      // 确认删除对话框
      this.$confirm('此操作将删除该分组及分组下的所有数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let result = window.utools.db.remove(this.current_collection_item)
        if (result.ok) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 通知父组件更新列表
          this.$emit('changeList')
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },
    /**
     * 单击某个集合
     * @param item
     * @param index
     */
    clickCollection(item, index) {
      this.$emit('clickCollection', item, index)
    },
    /**
     * 保存集合
     * @returns {boolean}
     */
    onSubmit() {
      if (!this._verify()) return false;

      if (this.edit_collection_item === null) {
        this.addCollection()
        return false;
      }

      this.editCollection()

    },

    /**
     * 修改集合分组
     */
    editCollection() {
      let result = editCollectionEntity(this.edit_collection_item, this.form.name, this.form.prefix)
      if (result.ok) {
        this.dialogFormVisible = false;
        this.form = {
          name: '',
          prefix: ''
        }
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('changeList')
      }
    },

    /**
     * 新增分组集合
     */
    addCollection() {
      let collectionEntity = getCollectionEntity(this.form.name, this.form.prefix)
      let result = window.utools.db.put({
        _id: `${collection_prefix}/${collectionEntity.id}`,
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
        this.$emit('changeList')
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
          message: '请输入分组名称',
          type: 'warning'
        })
        return false;
      }
      if (this.form.name.length > 20) {
        this.$message({
          message: '分组名称最多不超过20个字符',
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
    color: #909399;
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
      color: #606266;
      // 超出部分省略号
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .desc {
      font-size: 11px;
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

.form-box {
  // 禁止选中
  user-select: none;
}

.collection-item {
  background: #fff;
}
.collection-item-active{
  background: #eee;
}
</style>
