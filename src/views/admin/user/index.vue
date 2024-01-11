<template>
  <div class="box">
    <div class="top">
      <div class="tLeft"></div>
      <div class="tRight">
        <el-button type="primary" @click="toAdd">添加</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column align="center" type="index" label="序号" min-width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="account" label="账号"></el-table-column>
        <el-table-column align="center" prop="role_name" label="角色"></el-table-column>
        <el-table-column align="center" prop="create_time" label="创建时间" min-width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" min-width="165">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="toEditUserBox(scope.row)">编辑</el-button>
            <el-button type="primary" link size="small" @click="handleClick(scope.row)">重置密码</el-button>
            <el-button type="danger" link size="small" @click="toDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import {
  getUserList,
  toAddUser,
  toDelUser,
  toResetUserPassword
} from "@/api/module/user";
const tableData = ref([]);
onMounted(() => {
  getList()
})
const getList = () => {
  getUserList().then(res => {
    if (res.code == 200) {
      tableData.value = res.data
    }
  })
}
const handleClick = (row) => {
  console.log(row);
};
const toEditUserBox = (row) => {
  console.log(row);
};
const toDel = (row) => {
  console.log(row);
};
const toAdd = () => {
  console.log();
};
</script>
<style scoped lang="scss">
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);

  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .table {
    border-top: 1px solid #ddd;
  }
}
</style>
