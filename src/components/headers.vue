<template>
  <div class="header-component">
    <div class="top-content flex justify-between">
      <div class="left-top flex justify-start">
        <el-image
          class="ml-3 mt-1.5"
          style="width: 45px; height: 45px;border-radius: 3px;"
          src="data:image/png;base64,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"
          fit="contain"></el-image>
        <div class="description_content ml-3">
          <div class="title">Automatic snippets</div>
          <div class="desc mt-0.5">仅需简单的几步设置，就可以帮助您随时随地使用最有用的文本片段。
          </div>
        </div>
      </div>
      <div class="right-top">
        <el-button icon="el-icon-menu" size="mini" circle @click="toMore"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toMore(){
      this.$router.push({path: '/more'})
    },
  },

}
</script>
<style lang="scss" scoped>
.top-content {
  width: 100%;
  background: #E0E0DE;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  padding: 7px 8px;
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

  .right-top {
    padding: 8px 10px;
  }
}
</style>
