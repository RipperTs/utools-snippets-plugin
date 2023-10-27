<template>
  <div class="more-main">
    <div class="chunk-box">
      <div class="label">数据备份</div>
      <div class="desc mt-3">
        <p>如果您是 uTools 会员直接可享受自动多端数据同步,无需再进行手动操作!</p>
        <p><span class="text-red-600 font-bold">请注意,如果导入的数据中存在与本地相同的关键字, 那么本地的数据将会被覆盖.</span>
        </p>
        <p>为了避免造成原数据丢失,请在导入之前先进行一遍导出操作!</p>
      </div>
      <div class="action-button mt-3">
        <el-tabs v-model="activeName">
          <el-tab-pane label="数据导出" name="export">
            <div class="desc mt-3">
              <p>导出的数据将会保存在 <span class="font-bold text-blue-600">{{
                  downloadPath
                }}</span>, 文件名为 <span class="text-blue-600 font-bold">{{ fileName }}_xxx.json</span></p>
              <p>注意: 因导出的文件未经过加密处理, 公开分享此文件可能会导致个人隐私泄露.</p>
            </div>
            <div class="action-button mt-3">
              <el-button type="primary" size="mini" @click="exportData">开始导出数据</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据导入" name="import">数据导入</el-tab-pane>
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
    }
  },

  created() {
    this.downloadPath = window.utools.getPath('downloads')
  },

  methods: {

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
