<template>
  <div class="left-component">
    <div class="left-container">
      <div class="title">分组列表</div>
      <div class="collection-list">
        <div v-for="(item,index) in collection_list" :key="index">
          <div class="item bg-white" @click="clickCollection(index)"
               :style="{'background':current_collection_index === index ? '#eee': '#fff'}">
            <div class="name">{{ item.name }}</div>
            <div class="desc mt-0.5">{{ item.num }} Snippets, prefix {{ item.prefix }}</div>
          </div>
        </div>
      </div>
      <div class="add-btn">
        <el-button-group>
          <el-button size="mini" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
          <el-button size="mini" icon="el-icon-minus"></el-button>
        </el-button-group>
      </div>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="65%">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
          <div class="explain mt-1.5">集合的名称, 最多不超过10个字符!</div>
        </el-form-item>
        <el-form-item label="Prefix" :label-width="formLabelWidth">
          <el-input v-model="form.prefix" placeholder="prefix"></el-input>
          <div class="explain mt-1.5">本集合中所有片段的关键字前缀，即设置本集合中的所有片段在展开前都需要 > 前缀。</div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    collection_list: {
      type: Array,
      default: () => {
        return []
      }
    },
    current_collection_index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogFormVisible: true,
      form: {
        name: '',
        prefix: ''
      },
      formLabelWidth: '50px',
    }
  },
  mounted() {

  },
  methods: {
    clickCollection(index) {
      this.$emit('clickCollection', index)
    },
    onSubmit(){
      this.$emit('onSubmit', this.form)
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
