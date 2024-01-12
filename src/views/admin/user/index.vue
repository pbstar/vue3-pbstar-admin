<template>
  <div class="box">
    <div class="top">
      <div class="tLeft"></div>
      <div class="tRight">
        <el-button type="primary" @click="toAddBox()">添加</el-button>
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
            <el-button type="primary" link size="small" @click="toReset(scope.row)">重置密码</el-button>
            <el-button type="danger" link size="small" @click="toDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="userInfo.id ? '编辑管理员' : '添加管理员'" v-model="isShowUserInfoBox" width="500px">
      <el-form label-width="52px">
        <el-form-item label="姓名" required>
          <el-input v-model="userInfo.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号" required>
          <el-input v-model="userInfo.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" required v-show="!userInfo.id">
          <el-input v-model="userInfo.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" required>
          <el-select v-model="userInfo.role" style="width: 100%;" placeholder="请选择角色">
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isShowUserInfoBox = false">取 消</el-button>
        <el-button type="primary" @click="toUser()">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import {
  getUserList,
  getRoleList,
  toAddUser,
  toDelUser,
  toResetUserPassword,
  toEditUser
} from "@/api/module/user";
import units from "@/units";
const tableData = ref([]);
const roleList = ref([]);
const isShowUserInfoBox = ref(false);
const userInfo = ref({
  id: '',
  name: '',
  password: '',
  account: '',
  role: ''
});


onMounted(() => {
  getList()
  getRole()
})
const getList = () => {
  getUserList().then(res => {
    if (res.code == 200) {
      tableData.value = res.data
    }
  })
}
const getRole = () => {
  getRoleList().then(res => {
    if (res.code == 200) {
      roleList.value = res.data
    }
  })
}
const toAddBox = () => {
  isShowUserInfoBox.value = true;
  userInfo.value = {
    id: '',
    name: '',
    password: '',
    account: '',
    role: ''
  }
};
const toEditUserBox = (row) => {
  isShowUserInfoBox.value = true;
  userInfo.value.id = row.id
  userInfo.value.name = row.name
  userInfo.value.account = row.account
  userInfo.value.role = row.role
};
const toUser = () => {
  if (!userInfo.value.name) {
    ElMessage.error('请输入姓名')
    return
  }
  if (!userInfo.value.account) { // 账号
    ElMessage.error('请输入账号')
    return
  }
  if (!userInfo.value.role) { // 角色
    ElMessage.error('请选择角色')
    return
  }

  if (userInfo.value.id) {
    toEditUser({
      id: userInfo.value.id,
      name: userInfo.value.name,
      account: userInfo.value.account,
      role: userInfo.value.role
    }).then(res => {
      if (res.code == 200) {
        ElMessage.success('修改成功')
        isShowUserInfoBox.value = false;
        getList()
      } else {
        ElMessage.error(res.msg)
      }
    })
  } else {
    if (!userInfo.value.password) { // 密码
      ElMessage.error('请输入密码')
      return
    }
    toAddUser({
      name: userInfo.value.name,
      password: userInfo.value.password,
      account: userInfo.value.account,
      role: userInfo.value.role,
      create_time: units.formatDate(null, "YY-MM-DD hh:mm:ss")
    }).then(res => {
      if (res.code == 200) {
        ElMessage.success('修改成功')
        isShowUserInfoBox.value = false;
        getList()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }
}
const toReset = (row) => {
  ElMessageBox.confirm(
    "确认为" + row.name + "重置密码吗？重置后的初始密码为12345678",
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  ).then(() => {
    toResetUserPassword({ id: row.id }).then((res) => {
      if (res.code == 200) {
        ElMessage.success("重置密码成功");
      } else {
        ElMessage.error(res.msg);
      }
    });
  })
    .catch(() => { });
};

const toDel = (row) => {
  ElMessageBox.confirm(
    "确认删除吗？",
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }
  ).then(() => {
    toDelUser({ id: row.id }).then((res) => {
      if (res.code == 200) {
        ElMessage.success("删除成功");
        getList()
      } else {
        ElMessage.error(res.msg);
      }
    });
  })
    .catch(() => { });
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
