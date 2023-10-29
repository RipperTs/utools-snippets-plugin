<template>
  <div class="snippets-dialog-form">
    <el-dialog style="user-select: none;" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               :top="is_edit ? '3vh':'6vh'"
               :show-close="false" width="80%"
               @close="closeDialog">
      <el-form :model="form">
        <div class="flex justify-start">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input size="mini" style="width: 220px;" v-model="form.name"
                      placeholder="请输入名称, 为文本片段的说明"></el-input>
          </el-form-item>
          <el-form-item label="关键字" :label-width="formLabelWidth">
            <el-input size="mini" style="width: 230px;" v-model="form.keyword"
                      placeholder="请输入关键字, 为uTools输入的命令"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="所在分组" :label-width="formLabelWidth" v-if="is_edit">
          <el-select :value="currentSelectCollection?._id"
                     @change="selectCollection" size="mini">
            <el-option
              v-for="(item,index) in collection_list"
              :key="index"
              :label="item.data.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文本片段" :label-width="formLabelWidth">
          <el-input id="textarea" type="textarea" ref="snippetInput" :rows="7"
                    placeholder="在这里输入文本片段, 支持占位符"
                    v-model="form.snippet"></el-input>
          <div class="snippet-btn-box">
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

        <el-form-item label="后置动作" :label-width="formLabelWidth">
          <el-radio-group v-model="form.is_reduction_clipboard" size="mini">
            <el-radio :label=1 border>还原剪贴板内容</el-radio>
            <el-radio :label=2 border>保留剪贴板中文本片段 (方便手动粘贴)</el-radio>
          </el-radio-group>
          <el-checkbox label="敲击回车键" v-model="form.is_enter" size="mini" border
                       class="mt-2.5"></el-checkbox>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="$emit('close-dialog')">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmit()">
          {{ !is_edit ? '保 存' : '修 改' }}
        </el-button>
      </div>
      <el-dialog
        width="70%"
        style="user-select: none;"
        :show-close="false"
        :visible.sync="innerVisible"
        @close="closeInnerDialog"
        append-to-body>
        <placeholder @clickTag="clickTag"></placeholder>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import placeholder from "@/components/placeholder.vue";
import {changeCollectionNum, editSnippetsEntity, getSnippetsEntity} from "@/entitys";
import {checkKeywordIsExist, snippet_prefix} from "@/utils";

export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    is_edit: {
      type: Boolean,
      default: false
    },
    current_collection_item: {
      type: Object,
      default: () => null
    },
    current_snippet_item: {
      type: Object,
      default: () => null
    },
    collection_list: {
      type: Array,
      default: () => []
    },
  },
  components: {placeholder},
  data() {
    return {
      formLabelWidth: '72px',
      innerVisible: false,
      textareaPos: {
        startPos: 0,
        endPos: 0
      },
      form: {
        name: '',
        keyword: '',
        snippet: '',
        is_reduction_clipboard: 1,
        is_enter: false,
      },
      currentSelectCollection: null,
    }
  },

  methods: {

    // 选择分组
    selectCollection(id) {
      const collection = window.utools.db.get(id)
      if (!collection) return false;

      this.currentSelectCollection = collection
    },

    // 关闭文本片段弹窗
    closeDialog() {
      this.form = {
        name: '',
        keyword: '',
        snippet: '',
        is_reduction_clipboard: 1,
        is_enter: false,
      }
      this.currentSelectCollection = this.current_collection_item
      this.$parent.closeDialog()
    },

    // 打开光标占位符弹窗
    openInnerVisible() {
      const myField = document.querySelector('#textarea')
      if (myField.selectionStart || myField.selectionStart === 0) {
        this.textareaPos.startPos = myField.selectionStart
        this.textareaPos.endPos = myField.selectionEnd
      }
      this.innerVisible = true;
    },

    /**
     * 插入占位符
     * @param tag
     */
    async clickTag(tag) {
      if (this.form.snippet.indexOf('{cursor}') !== -1 && tag.value === '{cursor}') {
        this.$message({
          message: '只允许添加一个"光标位置"占位符',
          type: 'warning'
        })
        return false;
      }
      if (this.form.snippet.indexOf('{input:content}') !== -1 && tag.value === '{input:content}') {
        this.$message({
          message: '只允许添加一个"手动输入内容"占位符',
          type: 'warning'
        })
        return false;
      }

      const myField = document.querySelector('#textarea')
      this.form.snippet = this.form.snippet.substring(0, this.textareaPos.startPos) + tag.value + this.form.snippet.substring(this.textareaPos.endPos, this.form.snippet.length)
      await this.$nextTick() // 这句是重点, 圈起来
      myField.setSelectionRange(this.textareaPos.endPos + tag.value.length, this.textareaPos.endPos + tag.value.length)
      myField.focus()
      this.innerVisible = false;
    },

    // 关闭占位符弹窗
    closeInnerDialog() {
      this.textareaPos = {
        startPos: 0,
        endPos: 0
      }
    },

    redirectPlugin() {
      window.utools.redirect('一步到位')
    },

    // 提交表单内容
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
      let snippets = getSnippetsEntity(this.current_collection_item.data.id, this.form)
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
        this.$parent.getCollectionList()
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
        this.$emit('close-dialog')
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
      const collection_id = this.currentSelectCollection.data.id
      let result = editSnippetsEntity(collection_id, this.current_snippet_item, this.form)
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
          "code": `${snippet_prefix}/${collection_id}/${this.current_snippet_item.data.id}`,
          "explain": this.form.name,
          "cmds": [this.form.keyword]
        })
      }

      if (this.current_collection_item !== this.currentSelectCollection) {
        changeCollectionNum(this.current_collection_item, 2)
        changeCollectionNum(this.currentSelectCollection)
      }

      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.$emit('close-dialog')
      this.$parent.getCollectionList()
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
.remark {
  font-size: 12px;
  color: #999;
  line-height: 18px;
  margin-top: 5px;
}

.placeholder-btn {
  width: 18px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
}
</style>
