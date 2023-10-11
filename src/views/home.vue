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
        <div class="desc mt-0.5">仅需简单的几步设置，来帮助您随时随地使用最有用的文本片段。</div>
      </div>
    </div>

    <div class="setting-container p-5">
      <collection class="left-component" @clickCollection="clickCollection"></collection>
      <div class="right-container rounded">
        <div class="table-box">
          <el-table
            :data="tableData"
            height="100%"
            style="width: 100%;border-radius: 3px">
            <el-table-column
              prop="name"
              width="120"
              label="名称">
              <template slot-scope="scope">
                <div class="snippet-content">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              width="60"
              label="状态">
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.status === 1"
                  active-color="#13ce66"
                  @change="changeStatus(scope.row)"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              prop="keyword"
              width="120"
              label="关键字">
              <template slot-scope="scope">
                <div class="snippet-content">
                  {{ scope.row.keyword }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="snippet"
              label="文本片段">
              <template slot-scope="scope">
                <div class="snippet-content">
                  {{ scope.row.snippet }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="add-btn">
          <el-button-group>
            <el-button size="mini" icon="el-icon-plus" @click="addSnippets"></el-button>
            <el-button size="mini" icon="el-icon-minus"></el-button>
          </el-button-group>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="80%">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关键字" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form.keyword" placeholder="请输入关键字"></el-input>
          <div class="remark">如果此分组设置了前缀,那么实际使用的关键字为: 前缀+关键字.</div>
        </el-form-item>
        <el-form-item label="文本片段" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="6" placeholder="在这里输入文本片段" v-model="form.snippet"></el-input>
          <div class="remark">片段中可以包含占位符,例如: {time}, {clipboard}, {random}.
            如果需要更加高级的自动化扩展推荐使用uTools官方的"一步到位"插件
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
import collection from "@/components/collection.vue";
import {getSnippetsEntity} from "@/entitys";

export default {
  components: {
    collection
  },
  data() {
    return {
      current_collection_item: null,
      current_collection_index: 0,
      tableData: [{
        status: 1,
        name: '本地localhost',
        keyword: '-127',
        snippet: '127.0.0.1',
        collection: '1697005378732',
        id: '169700537982',
      },
        {
          status: 0,
          name: '转大写',
          keyword: '-upper',
          snippet: '{clipboard:uppercase}32132132133213',
          collection: '1697005378732',
          id: '169700537986',
        }],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '80px',
    }
  },
  mounted() {
  },
  methods: {

    addSnippets() {
      let collection_list = window.utools.db.allDocs("collection")
      if (collection_list === 0) {
        this.$message({
          message: '请先创建一个集合',
          type: 'warning'
        })
        return false;
      }
      if (this.current_collection_item === null) {
        this.current_collection_item = collection_list[0]
      }
      this.dialogFormVisible = true
    },

    onSubmit() {
      if (!this._verify()) return false;

      let snippets = getSnippetsEntity(this.current_collection_item.data.id, this.form.name, this.form.keyword, this.form.snippet)
      let result = window.utools.db.put({
        _id: `${this.current_collection_item.data.id}/${snippets.id}`,
        data: snippets
      })

      if (result.ok) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.dialogFormVisible = false
      } else {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }

    },

    changeStatus(e) {
      console.log('changeStatus', e)
    },

    clickCollection(item, index) {
      this.current_collection_item = item
    },
    addFunctionality() {
      utools.setFeature({
        "code": "ssh",
        "explain": "快速连接ssh",
        // "icon": "res/xxx.png",
        // "icon": "data:image/png;base64,xxx...",
        // "platform": ["win32", "darwin", "linux"]
        "cmds": ["ssh"]
      })
    },
    delFunc() {
      utools.removeFeature('ssh')
    },
    testButton() {
      const features = utools.getFeatures()
      console.log(features)
    },

    _verify() {
      if (this.form.name === '') {
        this.$message({
          message: '名称不能为空',
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

  .left-component {
    width: 32%;
  }

  .right-container {
    width: 66%;

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
</style>
