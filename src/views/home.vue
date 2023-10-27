<template>
  <div class="container-main">
    <!--  顶部  -->
    <div class="top-content">
      <el-image
        class="ml-3 mt-1.5"
        style="width: 45px; height: 45px;border-radius: 3px;"
        src="data:image/png;base64,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"
        fit="contain"></el-image>
      <div class="description_content ml-3">
        <div class="title">Automatic snippets</div>
        <div class="desc mt-0.5">仅需简单的几步设置，就可以帮助您随时随地使用最有用的文本片段。</div>
      </div>
    </div>

    <!--  主体页面布局  -->
    <div class="setting-container p-5">
      <!--   左侧分组列表   -->
      <collection class="left-component"
                  ref="collectionRef"
                  :collection_list="collection_list"
                  :current_collection_index="current_collection_index"
                  :current_collection_item="current_collection_item"
                  @clickCollection="clickCollection"
                  @changeList="changeCollectionList"></collection>
      <div class="right-container rounded">
        <!--   右侧文本片段列表     -->
        <snippets :snippet_list="snippet_list"
                  :current_snippet_item="current_snippet_item"
                  :collection_list="collection_list"
                  :current_collection_item="current_collection_item"
                  @add-snippets="addSnippets"
                  @del-snippets="delSnippets"
                  @row-click="clickSnippet"
                  @row-dblclick="dbClickSnippet"></snippets>
      </div>
    </div>
    <!--  添加/修改文本片段  -->
    <snippetDialogForm
      ref="snippetDialogForm"
      :form="form"
      :dialog-form-visible="dialogFormVisible"
      :current_snippet_item="current_snippet_item"
      :collection_list="collection_list"
      :is_edit="is_edit"
      :current_collection_item="current_collection_item"
      @close-dialog="dialogFormVisible = false"
    ></snippetDialogForm>
  </div>
</template>

<script>
import collection from "@/components/collection.vue";
import snippets from "@/components/snippets.vue";
import snippetDialogForm from "@/components/snippetDialogForm.vue";
import {changeCollectionNum} from "@/entitys";
import {collection_prefix, snippet_prefix} from "@/utils";
import {mapState} from 'vuex'
import {autoSnippets} from "@/utils/snippets";

export default {
  components: {
    collection,
    snippets,
    snippetDialogForm
  },
  data() {
    return {
      current_collection_item: null,
      current_collection_index: 0,
      collection_list: [],
      snippet_list: [],
      dialogFormVisible: false,
      form: {
        name: '',
        keyword: '',
        snippet: '',
        is_reduction_clipboard: 1,
        is_enter: false,
      },
      current_snippet_item: null,
      is_edit: false,
    }
  },
  computed: {
    ...mapState(['sharedData'])
  },
  created() {
    window.utools.onPluginOut(() => {
      this.dialogFormVisible = false
      this.innerVisible = false;
      this.$refs.collectionRef._initDialog()
    })
    // 监听键盘事件
    document.addEventListener('keydown', this.handleEvent);
  },
  mounted() {
    this.getCollectionList()
  },
  methods: {

    /**
     * 键盘事件(手动输入时候会启用)
     * @param e
     * @returns {boolean}
     */
    handleEvent(e) {
      if (e.isTrusted && e.keyCode === 13) {
        const text = this.sharedData?.text || ''
        if (text.trim() === '') return false;
        autoSnippets(this.sharedData.snippets, this.sharedData.text)
        return true;
      }
    },

    /**
     * 单击文本片段
     * @param row
     */
    clickSnippet(row) {
      this.current_snippet_item = row
    },

    /**
     * 双击文本片段
     */
    dbClickSnippet() {
      const is_enter = this.current_snippet_item.data?.is_enter || 2
      this.$refs.snippetDialogForm.form = {
        name: this.current_snippet_item.data.name,
        keyword: this.current_snippet_item.data.keyword,
        snippet: this.current_snippet_item.data.snippet,
        is_reduction_clipboard: this.current_snippet_item.data?.is_reduction_clipboard || 1,
        is_enter: is_enter === 1,
      }

      this.$refs.snippetDialogForm.currentSelectCollection = this.current_collection_item
      this.dialogFormVisible = true
      this.is_edit = true
    },

    /**
     * 关闭添加文本片段弹窗
     */
    closeDialog() {
      this.is_edit = false
    },

    /**
     * 删除文本片段
     */
    delSnippets() {
      // 确认删除对话框
      this.$confirm('此操作将当前删除文本片段, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let remove_result = window.utools.removeFeature(`${snippet_prefix}/${this.current_collection_item.data.id}/${this.current_snippet_item.data.id}`)
        if (!remove_result) {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          return false;
        }
        let result = window.utools.db.remove(this.current_snippet_item)
        if (result.ok) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          changeCollectionNum(this.current_collection_item, 2)
          this.getCollectionList()
          this.current_snippet_item = null
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },

    /**
     * 获取分组列表
     */
    getCollectionList() {
      this.collection_list = window.utools.db.allDocs(collection_prefix)
      if (this.current_collection_index === 0 && this.collection_list.length > 0) {
        this.current_collection_item = this.collection_list[0]
      } else {
        this.current_collection_item = this.collection_list[this.current_collection_index]
      }

      this.$refs.snippetDialogForm.currentSelectCollection = this.current_collection_item
      this.getSnippetList()
    },

    /**
     * 获取文本片段
     */
    getSnippetList() {
      this.snippet_list = window.utools.db.allDocs(`${snippet_prefix}/${this.current_collection_item?.data?.id}`)
    },

    /**
     * 改变分组列表的事件
     */
    changeCollectionList() {
      this.getCollectionList()
    },

    /**
     * 添加文本片段事件
     * @returns {boolean}
     */
    addSnippets() {
      if (this.collection_list === 0) {
        this.$message({
          message: '请先创建一个分组',
          type: 'warning'
        })
        return false;
      }
      this.dialogFormVisible = true
    },

    /**
     * 点击分组列表的事件
     * @param item
     * @param index
     */
    clickCollection(item, index) {
      this.current_collection_item = item
      this.current_collection_index = index
      this.current_snippet_item = null
      this.getSnippetList()
    },


  },

  destroyed() {
    document.removeEventListener('keydown', this.handleEvent)
  }

}
</script>
<style lang="scss" scoped>
.top-content {
  width: 100%;
  background: #E0E0DE;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  padding: 7px 10px;
  display: flex;
  justify-content: left;
  user-select: none;

  .description_content {
    .title {
      font-size: 18px;
    }

    .desc {
      font-size: 12px;
      color: #888;
    }
  }
}

.setting-container {
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: space-between;
  // 禁止选中
  user-select: none;

  .left-component {
    width: 32%;
  }

  .right-container {
    width: 66%;
    margin-top: 1px;
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


::v-deep .el-table__body tr.current-row > td.el-table__cell {
  background-color: var(--table-cell-click) !important;
}

.placeholder-btn {
  width: 18px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
}

::v-deep .el-dialog__header {
  padding: 0 !important;
}

::v-deep .el-dialog__body {
  padding: 20px;
}
</style>
