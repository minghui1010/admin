<template>
  <div class="tab">
    <div class="tab-title">
      <el-button type="primary" icon="el-icon-delete" @click="delAllSelection"
        >批量删除</el-button
      >
      <el-select v-model="query.region" placeholder="地址">
        <el-option label="上海" value="shanghai"></el-option>
        <el-option label="北京" value="beijing"></el-option>
      </el-select>
      <el-input
        v-model="query.name"
        placeholder="用户名"
        class="handle-input"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch"
        >搜索</el-button
      >
    </div>

    <el-table
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column label="账户余额" align="center">
        <template slot-scope="scope">￥{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="头像(查看大图)" align="center">
        <template slot-scope="scope">
          <el-image
            class="table-td-thumb"
            :src="scope.row.thumb"
            :preview-src-list="[scope.row.thumb]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.state === '成功'
                ? 'success'
                : scope.row.state === '失败'
                ? 'danger'
                : ''
            "
            >{{ scope.row.state }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column
        prop="date"
        label="注册时间"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            icon="el-icon-delete"
            class="red"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="query.pageIndex"
        :page-size="query.pageSize"
        :total="pageTotal"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input> 
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"> 
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchData } from "../../api/http.js";
export default {
  name: "",
  data() {
    return {
      editVisible: false,
      pageTotal: 3,

     form:[],
      query: {
        region: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [
        {
          id: 1,
          name: "张三",
          money: 123,
          address: "广东省广州市天河区",
          state: "成功",
          date: "2021-01-10",
          thumb: "https://lin-xin.gitee.io/images/post/wms.png",
        },
        {
          id: 2,
          name: "你好哇",
          money: 123456,
          address: "广东省佛山市顺德区",
          state: "成功",
          date: "2021-01-10",
          thumb: "https://lin-xin.gitee.io/images/post/wms.png",
        },
        {
          id: 3,
          name: "李四",
          money: 123456789,
          address: "广东省惠州",
          state: "失败",
          date: "2021-01-10",
          thumb: "https://lin-xin.gitee.io/images/post/wms.png",
        },
      ],
    };
  },
  components: {},
  created() {
    // this.getData();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取 easy-mock 的模拟数据
    // getData() {
    //   fetchData(this.query).then((res) => {
    //     console.log(res);
    //     this.tableData = res.list;
    //     this.pageTotal = res.pageTotal || 50;
    //   });
    // },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      console.log(length);
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
  },
};
</script>

<style scoped>
.tab-title {
  margin-bottom: 10px;
}
.handle-input {
  width: 300px;
}

.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.pagination {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: right;
}
</style>
