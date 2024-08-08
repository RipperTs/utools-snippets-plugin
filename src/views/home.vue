<template>
  <div class="container-main">
    <!--  顶部  -->
    <Headers/>

    <!--  主体页面布局  -->
    <div class="setting-container p-5">
      <!--   左侧分组列表   -->
      <collection class="left-component"
                  ref="collectionRef"
                  :collection_list="collection_list"
                  :current_collection_index="current_collection_index"
                  :current_collection_item="current_collection_item"
                  @clickCollection="clickCollection"
                  @updateCollectionList="updateCollectionList"
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
      :dialog-form-visible="dialogFormVisible"
      :current_snippet_item="current_snippet_item"
      :collection_list="all_category_list"
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
import Headers from "@/components/headers.vue";
import store from "@/store";
import _ from 'lodash';
import {getAllCollectionList} from "@/db/collection";
import {getAllSnippetList, getSnippetListByCollectionId} from "@/db/snippet";

export default {
  components: {
    collection,
    snippets,
    snippetDialogForm,
    Headers
  },
  data() {
    return {
      current_collection_item: null,
      current_collection_index: 0,
      collection_list: [],
      snippet_list: [],
      dialogFormVisible: false,
      current_snippet_item: null,
      is_edit: false,
    }
  },
  computed: {
    ...mapState(['sharedData', 'inputContent']),
    all_category_list() {
      return getAllCollectionList() || []
    }
  },
  created() {
    let that = this;
    this.$store.watch(
      state => state.inputContent, // 监听的状态值
      () => {
        that.doSearchSnippets()
      }
    );
    window.utools.onPluginOut(() => {
      store.state.inputContent = ""
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
     * 子组件更新的事件
     * @param new_collection_index
     */
    updateCollectionList({new_collection_index}) {
      this.collection_list = getAllCollectionList()
      this.current_collection_index = new_collection_index
      this.current_collection_item = this.collection_list[new_collection_index]
      this.$refs.snippetDialogForm.currentSelectCollection = this.current_collection_item
      this.getSnippetList()
    },

    /**
     * 键盘事件(手动输入时候会启用)
     * @param e
     * @returns {boolean}
     */
    handleEvent(e) {
      if (e.isTrusted && e.keyCode === 13) {
        const text = this.sharedData?.text || ''
        if (text.trim() !== '') {
          autoSnippets(this.sharedData.snippets, this.sharedData.text)
          return true;
        }
      }

      let ctrl = null;
      if (window.utools.isMacOS()) {
        ctrl = e.metaKey;
      } else {
        ctrl = e.ctrlKey;
      }

      if (ctrl && e.keyCode === 70) {
        //   如果是ctrl+f
        window.utools.subInputSelect();
      }

    },

    /**
     * 搜索文本片段
     * @returns {boolean}
     */
    doSearchSnippets() {
      if (this.inputContent.trim() === '') {
        this.getCollectionList()
        return false;
      }
      // 获取所有的文本片段列表
      const snippet_list = getAllSnippetList()
      if (snippet_list.length === 0) {
        this.snippet_list = []
        return false;
      }
      let search_snippet = []
      snippet_list.forEach(item => {
        if ((_.toLower(item.data.snippet).indexOf(_.toLower(this.inputContent)) !== -1) ||
          (_.toLower(item.data.keyword).indexOf(_.toLower(this.inputContent)) !== -1) ||
          (_.toLower(item.data.name).indexOf(_.toLower(this.inputContent)) !== -1)) {
          search_snippet.push(item)
        }
      })
      let filter_search_snippet = Array.from(
        search_snippet.reduce((map, obj) => map.set(obj.data.collection_id, obj), new Map()).values()
      );

      // 筛选出分组列表
      let collection_list = []
      filter_search_snippet.forEach(item => {
        collection_list.push(window.utools.db.get(`${collection_prefix}/${item.data.collection_id}`))
      })

      this.collection_list = collection_list
      this.current_collection_index = 0
      this.current_collection_item = collection_list[this.current_collection_index]
      this.current_snippet_item = null
      this.getSnippetList()
    },

    /**
     * 单击文本片段
     */
    clickSnippet({row}) {
      this.current_snippet_item = row
    },

    /**
     * 双击文本片段
     */
    dbClickSnippet({row}) {
      const is_enter = row.data?.is_enter || 2
      this.$refs.snippetDialogForm.form = {
        name: row.data.name,
        keyword: row.data.keyword,
        snippet: row.data.snippet,
        is_reduction_clipboard: row.data?.is_reduction_clipboard || 1,
        is_enter: is_enter === 1,
        paste_method: row.data?.paste_method || 1,
        sort: row.data.sort
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
        const code = `${snippet_prefix}/${this.current_collection_item.data.id}/${this.current_snippet_item.data.id}`
        const feature = window.utools.getFeatures([code])
        if (feature.length > 0) {
          window.utools.removeFeature(code)
        }

        let result = window.utools.db.remove(this.current_snippet_item)
        if (result.ok) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          changeCollectionNum(this.current_collection_item, 2)
          this.doSearchSnippets()
          if (this.inputContent.trim() !== '') {
            window.utools.subInputSelect()
          }
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
      this.collection_list = getAllCollectionList()
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
      const snippet_list = getSnippetListByCollectionId(this.current_collection_item?.data?.id || 0)
      if (this.inputContent.trim() === '') {
        this.snippet_list = snippet_list
        return false;
      }

      // 搜索文本片段
      let search_snippet = []
      snippet_list.forEach(item => {
        if ((_.toLower(item.data.snippet).indexOf(_.toLower(this.inputContent)) !== -1) ||
          (_.toLower(item.data.keyword).indexOf(_.toLower(this.inputContent)) !== -1) ||
          (_.toLower(item.data.name).indexOf(_.toLower(this.inputContent)) !== -1)) {
          search_snippet.push(item)
        }
      })
      this.snippet_list = search_snippet
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
