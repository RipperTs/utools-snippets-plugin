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
