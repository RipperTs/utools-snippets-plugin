<template>
  <div class="snippets-component">
    <div class="right-container">
      <VueDraggable target="tbody"
                    v-model="snippet_list"
                    :animation="150"
                    :disabled="!is_sort"
                    @update="onUpdate"
      >
        <div class="table-box">
          <el-table
            :data="snippet_list"
            height="100%"
            highlight-current-row
            header-row-class-name="snippet-header-row"
            header-cell-class-name="snippet-header-cell"
            cell-class-name="snippet-cell"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
            @row-dblclick="onRowDbClick"
            style="width: 100%;border-radius: 3px">
            <el-table-column
              width="120"
              label="片段说明">
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
                  @change="changeStatus(scope.row,scope.$index)"
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
                <el-popover
                  placement="left-start"
                  width="300"
                  :ref="`popover-${scope.$index}`"
                  trigger="hover">
                  <div class="previews-content">{{ scope.row.data.snippet }}</div>
                  <span slot="reference" class="snippet-content">
                    {{ scope.row.data.snippet }}
                  </span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </VueDraggable>
      <div class="add-btn">
        <el-button-group>
          <el-button size="mini" icon="el-icon-plus" :disabled="collection_list.length <=0"
                     @click="$emit('add-snippets', $event)"></el-button>
          <el-button size="mini" icon="el-icon-minus" :disabled="current_snippet_item === null"
                     @click="$emit('del-snippets', $event)"></el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import {changeSnippetsStatus} from "@/entitys";
import {snippet_prefix} from "@/utils";
import {VueDraggable} from "vue-draggable-plus";
import {reorderSnippet} from "@/db/snippet";

export default {
  components: {
    VueDraggable
  },
  props: {
    collection_list: {
      type: Array,
      default: () => []
    },
    snippet_list: {
      type: Array,
      default: () => []
    },
    current_snippet_item: {
      type: Object,
      default: () => null
    },
    current_collection_item: {
      type: Object,
      default: () => null
    },
    is_sort: {
      type: Boolean,
      default: true
    }
  },

  methods: {

    /**
     * 点击行事件
     * @param row
     * @param event
     * @param column
     */
    onRowClick(row, event, column) {
      this.$emit('row-click', {row, event, column})
    },

    /**
     * 双击行事件
     * @param row
     * @param event
     * @param column
     */
    onRowDbClick(row, event, column) {
      this.$emit('row-dblclick', {row, event, column})
    },

    /**
     * 拖拽行排序更新事件
     */
    onUpdate() {
      const snippet_list = reorderSnippet(this.snippet_list)
      window.utools.db.bulkDocs(snippet_list)
      this.$parent.getCollectionList()
    },

    /**
     * 未每一行添加排序字段
     * @param row
     * @param rowIndex
     */
    tableRowClassName({row, rowIndex}) {
      const old_sort = row.data?.sort || 0
      if (old_sort === 0) {
        row.data.sort = rowIndex + 1
      }
    },

    // 改变文本片段状态
    changeStatus(row, index) {
      let status = row.data.status === 1 ? 0 : 1
      let result = changeSnippetsStatus(row, status, index + 1)
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
      this.$parent.getCollectionList()
    },

  }

}
</script>
<style lang="scss" scoped>
.table-box {
  height: 80vh;
  // y超出部分滚动
  overflow-y: auto;
}

.snippet-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

.previews-content{
  max-height: 65vh;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 12px;
  padding: 5px;
  background: #f5f5f5;
  border-radius: 3px;
  color: #606266;
  // 超出部分滚动
  overflow-y: auto;
}
</style>
