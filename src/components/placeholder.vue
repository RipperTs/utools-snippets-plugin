<template>
  <div class="placeholder-component">
    <div class="list-box" v-for="(item,index) in placeholder_tags" :key="index">
      <div class="label">{{ item.label }}</div>
      <div class="tags-box mt-3">
        <div class="placeholder-tags mb-1.5">
          <el-tag v-for="(itm,idx) in item.value"
                  :key="idx" size="small"
                  class="cursor-pointer mt-3 tags-item"
                  @click="clickTag(itm)"
          >{{ itm.name }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import placeholder_tags from "@/utils/placeholder";

export default {
  data() {
    return {
      placeholder_tags: placeholder_tags
    }
  },
  created() {

  },
  methods: {
    clickTag(item) {
      this.$emit('clickTag', item)
    },
  },

  //切记页面销毁需要销毁
  destroyed() {
    let _this = this
  },
}
</script>
<style lang="scss" scoped>
.list-box {
  margin-top: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;

  &:first-child {
    margin-top: 0px;
  }

  .label {
    font-size: 16px;
  }

  .tags-box {
    width: 100%;
  }
}

.placeholder-tags {
  display: flex;
  flex-wrap: wrap;

  .tags-item {
    // 每行首个元素左边距为0
    margin-left: 10px;

    &:nth-child(4) {
      margin-left: 0px;
    }

  }
}

</style>
