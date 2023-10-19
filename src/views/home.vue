<template>
  <div class="container-main">
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

    <div class="setting-container p-5">
      <collection class="left-component"
                  ref="collectionRef"
                  :collection_list="collection_list"
                  :current_collection_index="current_collection_index"
                  :current_collection_item="current_collection_item"
                  @clickCollection="clickCollection"
                  @changeList="changeCollectionList"
      ></collection>
      <div class="right-container rounded">
        <div class="table-box">
          <el-table
            :data="snippet_list"
            height="100%"
            highlight-current-row
            header-row-class-name="snippet-header-row"
            header-cell-class-name="snippet-header-cell"
            cell-class-name="snippet-cell"
            @row-click="clickSnippet"
            @row-dblclick="dbClickSnippet"
            style="width: 100%;border-radius: 3px">
            <el-table-column
              width="120"
              label="名称">
              <template slot-scope="scope">
                <div class="snippet-content">
                  {{ scope.row.data.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="60"
              align="center"
              label="状态">
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.data.status === 1"
                  active-color="#13ce66"
                  @change="changeStatus(scope.row)"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="关键字">
              <template slot-scope="scope">
                <div class="snippet-content">
                  {{ scope.row.data.keyword }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="文本片段">
              <template slot-scope="scope">
                <div class="snippet-content">
                  {{ scope.row.data.snippet }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="add-btn">
          <el-button-group>
            <el-button size="mini" icon="el-icon-plus" :disabled="collection_list.length <=0"
                       @click="addSnippets"></el-button>
            <el-button size="mini" icon="el-icon-minus" :disabled="current_snippet_item === null"
                       @click="delSnippets"></el-button>
          </el-button-group>
        </div>
      </div>
    </div>

    <el-dialog style="user-select: none;" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               top="10vh"
               :show-close="false" width="80%"
               @close="closeDialog">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.name" autofocus
                    placeholder="请输入名称, 此名称为文本片段的说明"></el-input>
        </el-form-item>
        <el-form-item label="关键字" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.keyword"
                    placeholder="请输入关键字, 此关键字为uTools输入的命令"></el-input>
          <div class="remark mt-1.5">此关键字全局唯一, 所以需要注意不要重复定义!</div>
        </el-form-item>
        <el-form-item label="文本片段" :label-width="formLabelWidth">
          <el-input id="textarea" type="textarea" ref="snippetInput" :rows="7"
                    placeholder="在这里输入文本片段, 支持占位符"
                    v-model="form.snippet"></el-input>
          <div>
            <el-button class="placeholder-btn" size="mini" @click="openInnerVisible()">{ }
            </el-button>
          </div>
          <div class="remark" style="line-height: 20px;">
            <p>您可以在文本片段中添加占位符, 可以更加灵活的对片段内容进行动态处理.</p>
            <p>点击上方 { } 按钮选择要插入占位符, 即可在当前光标位置插入占位符.</p>
            <p>如果需要更加高级的自动化扩展推荐使用 <span
              class="text-blue-600 font-medium cursor-pointer"
              @click="redirectPlugin">一步到位</span> 插件.</p>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmit()">
          {{ !is_edit ? '保 存' : '修 改' }}
        </el-button>
      </div>
      <el-dialog
        width="70%"
        style="user-select: none;"
        :show-close="false"
        :visible.sync="innerVisible"
        append-to-body>
        <placeholder @clickTag="clickTag"></placeholder>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import collection from "@/components/collection.vue";
import placeholder from "@/components/placeholder.vue";
import {
  changeCollectionNum,
  changeSnippetsStatus,
  editSnippetsEntity,
  getSnippetsEntity
} from "@/entitys";
import {checkKeywordIsExist, collection_prefix, snippet_prefix} from "@/utils";
import {mapState} from 'vuex'
import {autoSnippets} from "@/utils/snippets";

export default {
  components: {
    collection,
    placeholder
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
        snippet: ''
      },
      formLabelWidth: '72px',
      current_snippet_item: null,
      is_edit: false,
      innerVisible: false,
      textareaPos: {
        startPos: 0,
        endPos: 0
      }
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
     * 打开光标占位符弹窗
     */
    openInnerVisible() {
      const myField = document.querySelector('#textarea')
      if (myField.selectionStart || myField.selectionStart === 0) {
        this.textareaPos.startPos = myField.selectionStart
        this.textareaPos.endPos = myField.selectionEnd
      }
      this.innerVisible = true;
    },

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
     * 插入占位符
     * @param tag
     */
    async clickTag(tag) {
      const myField = document.querySelector('#textarea')
      if (this.textareaPos.startPos === 0 && this.textareaPos.endPos === 0) {
        this.form.snippet += tag.value;
      } else {
        this.form.snippet = this.form.snippet.substring(0, this.textareaPos.startPos) + tag.value + this.form.snippet.substring(this.textareaPos.endPos, this.form.snippet.length)
        await this.$nextTick() // 这句是重点, 圈起来
        myField.setSelectionRange(this.textareaPos.endPos + tag.value.length, this.textareaPos.endPos + tag.value.length)
        myField.focus()
      }
      this.innerVisible = false;
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
      this.form = {
        name: this.current_snippet_item.data.name,
        keyword: this.current_snippet_item.data.keyword,
        snippet: this.current_snippet_item.data.snippet
      }
      this.dialogFormVisible = true
      this.is_edit = true
    },

    closeDialog() {
      this.form = {
        name: '',
        keyword: '',
        snippet: ''
      }
      this.textareaPos = {
        startPos: 0,
        endPos: 0
      }
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
     * 提交保存文本片段
     * @returns {boolean}
     */
    onSubmit() {
      if (!this._verify()) return false;

      if (!this.is_edit) {
        this.createSnippet()
        return false;
      }

      this.editSnippet()
    },

    /**
     * 创建文本片段
     * @returns {boolean}
     */
    createSnippet() {
      const keyword_exist = checkKeywordIsExist(this.form.keyword)
      if (keyword_exist) {
        this.$message({
          message: '关键字已被占用',
          type: 'warning'
        })
        return false;
      }
      let snippets = getSnippetsEntity(this.current_collection_item.data.id, this.form.name, this.form.keyword, this.form.snippet)
      let result = window.utools.db.put({
        _id: `${snippet_prefix}/${this.current_collection_item.data.id}/${snippets.id}`,
        data: snippets
      })

      if (result.ok) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        changeCollectionNum(this.current_collection_item)
        this.getCollectionList()
        let feature_result = window.utools.setFeature({
          "code": `${snippet_prefix}/${this.current_collection_item.data.id}/${snippets.id}`,
          "explain": this.form.name,
          "cmds": [this.form.keyword]
        })
        if (!feature_result) {
          window.utools.db.remove(`${snippet_prefix}/${snippets.id}`)
          this.$message({
            message: '保存失败了',
            type: 'error'
          })
          return false;
        }
        this.dialogFormVisible = false
      } else {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    },

    /**
     * 编辑文本片段
     */
    editSnippet() {
      let result = editSnippetsEntity(this.current_snippet_item, this.form.name, this.form.keyword, this.form.snippet)
      if (!result.ok) {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
        return false;
      }
      if (this.current_snippet_item.data.status === 1) {
        window.utools.removeFeature(`${snippet_prefix}/${this.current_collection_item.data.id}/${this.current_snippet_item.data.id}`)
        window.utools.setFeature({
          "code": `${snippet_prefix}/${this.current_collection_item.data.id}/${this.current_snippet_item.data.id}`,
          "explain": this.form.name,
          "cmds": [this.form.keyword]
        })
      }
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.dialogFormVisible = false
      this.getCollectionList()
    },

    /**
     * 改变文本片段的状态
     * @param row
     * @returns {boolean}
     */
    changeStatus(row) {
      let status = row.data.status === 1 ? 0 : 1
      let result = changeSnippetsStatus(row, status)
      if (!result.ok) return false;

      if (status === 0) {
        window.utools.removeFeature(`${snippet_prefix}/${this.current_collection_item.data.id}/${row.data.id}`)
      } else {
        window.utools.setFeature({
          "code": `${snippet_prefix}/${this.current_collection_item.data.id}/${row.data.id}`,
          "explain": row.data.name,
          "cmds": [row.data.keyword]
        })
      }
      this.getCollectionList()
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

    redirectPlugin() {
      window.utools.redirect('一步到位')
    },

    _verify() {
      if (this.form.name === '') {
        this.$message({
          message: '名称不能为空',
          type: 'warning'
        })
        return false;
      }

      if (this.form.keyword.length > 30) {
        this.$message({
          message: '关键字不能超过30个字符',
          type: 'warning'
        })
        return false;
      }

      if (this.form.keyword === '') {
        this.$message({
          message: '关键字不能为空',
          type: 'warning'
        })
        return false;
      }

      if (this.form.snippet === '') {
        this.$message({
          message: '文本片段不能为空',
          type: 'warning'
        })
        return false;
      }

      let cursor_count = this.form.snippet.split('{cursor}').length - 1
      if (cursor_count > 1) {
        this.$message({
          message: '只允许添加一个{cursor}占位符',
          type: 'warning'
        })
        return false;
      }

      return true;
    },
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEvent)
  },
  // vue页面卸载事件
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

    .table-box {
      height: 80vh;
      // y超出部分滚动
      overflow-y: auto;
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

.el-switch {
  transform: scale(0.6);
}

.snippet-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.remark {
  font-size: 12px;
  color: #999;
  line-height: 18px;
  margin-top: 5px;
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
</style>
