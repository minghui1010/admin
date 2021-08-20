<template>
  <div class="tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="`未读消息（${tableData.length}）`" name="1">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <span class="message-title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="180"> </el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRead(scope.$index)"
                >标为已读</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="primary" @click="allPush()">全部标为已读</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`已读消息（${read.length}）`" name="2">
        <el-table :data="read" style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <span class="message-title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="180"> </el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="primary" @click="delData">全部删除</el-button>
        </div> 
      </el-tab-pane>
      <el-tab-pane :label="`回收站（${del.length}）`" name="3">
        <el-table :data="del" style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <span class="message-title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="180"> </el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="small"
                @click="handleRes(scope.$index)"
                >还原
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="danger" @click="clear">清空回收站</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      
      activeName: "1",
      tableData: [
        {
          date: "2021-01-20",
          title: "笨蛋，猪头，干活啦！啊哈哈哈哈",
        },
        {
          date: "2021-01-21",
          title: "魔界人天下第一",
        },
      ],
      read: [
        {
          date: "2021-01-22",
          title: "野猪套天下第一",
        },
      ],
      del: [
        {
          date: "2021-01-23",
          title: "肥宗天下第一",
        },
      ],
    };
  },
  methods: {
    handleRead(index) {
      let item = this.tableData.splice(index, 1);
      console.log(item);
      this.read = item.concat(this.read);
    },
    handleDelete(index) {
      let item = this.read.splice(index, 1);
      this.del = item.concat(this.del);
      this.$message.success("删除成功");
    },
    handleRes(index) {
      let item = this.del.splice(index, 1);
      this.read = item.concat(this.read);
      this.$message.success("还原成功");
    },
    allPush(index) {
      let all = this.tableData.splice(index);
      this.read = all.concat(this.read);
      this.$message.success("全部已读");
    },
    delData(index) {
      let all = this.read.splice(index);
      this.del = all.concat(this.del);
      this.$message.success("全部删除");
    },
    clear(index) {
      let item = this.del.splice(index);
      this.read = item.concat(this.read);
      this.$message.success("还原成功");
    },
  },
  components: {},
};
</script>

<style scoped>
.tabs {
  padding: 30px;
  background-color: #fff;
}
.message-title {
  color: violet;
  cursor: pointer;
}
.handle-row {
  margin-top: 20px;
}
</style>
