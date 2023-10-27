<template>
  <div class="more-main">
    <div class="chunk-box">
      <div class="label">数据备份</div>
      <div class="desc mt-3">
        <p>如果您是 uTools 会员直接可享受自动多端数据同步,无需再进行手动操作!</p>
        <p>为了避免造成原数据丢失,请在导入之前先进行一遍导出操作!</p>
      </div>
      <div class="action-button mt-3">

        <el-tabs v-model="activeName">

          <el-tab-pane label="数据导出" name="export">
            <div class="desc mt-1.5">
              <p>导出的数据将会保存在 <span class="font-bold text-blue-600">{{
                  downloadPath
                }}</span>, 文件名为 <span class="text-blue-600 font-bold">{{
                  fileName
                }}_xxx.json</span></p>
              <p>注意: 因导出的文件未经过加密处理, 公开分享此文件可能会导致个人隐私泄露.</p>
            </div>
            <div class="action-button mt-10">
              <el-button type="primary" size="mini" @click="exportData">开始导出数据</el-button>
            </div>
          </el-tab-pane>


          <el-tab-pane label="数据导入" name="import">
            <div class="desc mt-1.5">
              <el-radio-group v-model="importType">
                <el-radio :label="1">全量导入 (删除所有原数据后导入新数据)</el-radio>
                <el-radio :label="2">增量导入 (仅导入有差异的数据)</el-radio>
              </el-radio-group>
              <p class="mt-3"><span class="text-red-600 font-bold" v-if="importType === 2">注意: 如果导入的数据中存在与本地相同的关键字, 那么本地的数据将会被覆盖.</span>
              </p>
            </div>
            <div class="action-button mt-10">
              <el-button type="primary" size="mini" @click="importData">执行导入数据</el-button>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {collection_prefix, snippet_prefix} from "@/utils";

export default {
  components: {},
  data() {
    return {
      activeName: 'export',
      downloadPath: '',
      fileName: 'snippets_data',
      importType: 1,
    }
  },

  created() {
    this.downloadPath = window.utools.getPath('downloads')
  },

  methods: {

    // 导入数据
    importData() {
      const importData = window.utools.showOpenDialog({
        title: '选择要导入的数据文件',
        filters: [{extensions: ['json']}],
        defaultPath: this.downloadPath,
        buttonLabel: '导入',
        properties: ['openFile']
      })
      // 检查文件是否符合要求
      if (importData === undefined || importData.length === 0) {
        return false;
      }
      if (importData.length > 1) {
        this.$message.error('只能选择一个文件')
        return false;
      }
      // 检查文件是否是json文件
      const file = importData[0]
      const fileSuffix = file.substring(file.lastIndexOf('.') + 1)
      if (fileSuffix !== 'json') {
        this.$message.error('文件格式不正确')
        return false;
      }
      // 读取文件内容
      const fileContent = window.readFile(importData[0])
      // 检查文件内容是否是json格式
      try {
        const fileContentJson = JSON.parse(fileContent)
        this.doImportData(fileContentJson)
      } catch (e) {
        this.$message.error('文件内容不是标准的JSON格式')
      }
    },

    /**
     * 执行数据导入
     * @param fileContentJson
     */
    doImportData(fileContentJson) {
      const import_collection_list = fileContentJson.collection_list
      const import_snippet_list = fileContentJson.snippet_list
      if (this.importType === 1) {
        // 删除全部数据
        this.removeAllData();
        // 导入分组数据
        import_collection_list.forEach((item) => {
          window.utools.db.put({
            _id: item._id,
            data: item.data
          })
        })
        // 导入文本片段数据
        import_snippet_list.forEach((item) => {
          let result = window.utools.db.put({
            _id: item._id,
            data: item.data
          })
          if (result.ok) {
            window.utools.setFeature({
              "code": item._id,
              "explain": item.data.name,
              "cmds": [item.data.keyword]
            })
          }
        })
        return false;
      }
    },

    /**
     * 删除全部文档数据
     */
    removeAllData() {
      try {
        const collection_list = window.utools.db.allDocs(collection_prefix)
        collection_list.forEach((item) => {
          window.utools.db.remove(item)
        })
        const snippet_list = window.utools.db.allDocs(snippet_prefix)
        snippet_list.forEach((item) => {
          window.utools.removeFeature(item._id)
          window.utools.db.remove(item)
        })
      } catch (err) {
        this.$message.error(err)
      }
    },

    // 导出数据
    exportData() {
      // 整理数据
      const collection_list = window.utools.db.allDocs(collection_prefix)
      const snippet_list = window.utools.db.allDocs(snippet_prefix)
      const data = {
        collection_list: collection_list,
        snippet_list: snippet_list
      }
      // 将data转json字符串
      const dataStr = JSON.stringify(data)
      const fileName = `${this.fileName}_${new Date().getTime()}.json`
      const path = `${this.downloadPath}/${fileName}`
      window.saveFile(path, dataStr, () => {
        window.utools.showNotification('导出成功, 文件已保存至下载目录')
        window.utools.shellShowItemInFolder(path)
      }, (err) => {
        this.$message.error(err)
      })

    },

  },

}
</script>
<style lang="scss" scoped>
.more-main {
  padding: 20px;
}

.chunk-box {
  background: #fff;
  border-radius: 4px;
  padding: 10px;

  .label {
    font-size: 16px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }

  .desc {
    font-size: 13px;
  }

  .action-button {

  }
}
</style>
