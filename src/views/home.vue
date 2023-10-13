<template>
  <div class="container-main">
    <div class="top-content">
      <el-image
        class="ml-3 mt-1.5"
        style="width: 40px; height: 40px"
        src="data:image/png;base64,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"
        fit="contain"></el-image>
      <div class="description_content ml-5">
        <div class="title">Automatic snippets</div>
        <div class="desc mt-0.5">仅需简单的几步设置，就可以帮助您随时随地使用最有用的文本片段。</div>
      </div>
    </div>

    <div class="setting-container p-5">
      <collection class="left-component"
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
            <el-button size="mini" icon="el-icon-plus" @click="addSnippets"></el-button>
            <el-button size="mini" icon="el-icon-minus" :disabled="current_snippet_item === null"
                       @click="delSnippets"></el-button>
          </el-button-group>
        </div>
      </div>
    </div>

    <el-dialog style="user-select: none;" :visible.sync="dialogFormVisible"
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
          <el-input type="textarea" ref="snippetInput" :rows="7"
                    placeholder="在这里输入文本片段, 支持占位符"
                    v-model="form.snippet"></el-input>
          <div>
            <el-button class="placeholder-btn" size="mini" @click="innerVisible = true">{ }
            </el-button>
          </div>
          <div class="remark" style="line-height: 20px;">
            <p>您可以在文本片段中添加占位符, 可以更加灵活的对片段内容进行动态处理.</p>
            <p>点击上方 { } 按钮选择要插入占位符, 即可在文本片段后面追加插入占位符.</p>
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
    }
  },
  mounted() {
    this.getCollectionList()
  },
  methods: {

    clickTag(tag) {
      this.form.snippet += tag.value;
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
      this.snippet_list = window.utools.db.allDocs(`${snippet_prefix}/${this.current_collection_item.data.id}`)
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

      return true;
    },
  },

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
