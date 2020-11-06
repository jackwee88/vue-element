<template>
  <div class="table-container index">
    <p style="padding-left:10px">
      <span class="title-one">学员中心</span>
      <span class="title-sec">参考方案</span>
    </p>
    <div class="box-big">
        <el-table
      :data="data"
      border
      style="width: 100%">
      <el-table-column
        prop="province"
        label="省份"
        width="180">
      </el-table-column>
      <el-table-column
        prop="issueno"
        label="期号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="programme"
        label="方案">
      </el-table-column>
      <el-table-column
        prop="result"
        label="结果">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "program",

  data() {
    return {
        data:[],
    };
  },
  mounted() {},
  created() {
    this.getPrograme();
  },

  methods: {
      getPrograme(){
      let pramp = { token: localStorage.getItem("token") };
        this.$axios({
        method: "post",
        url: this.url+"Expert/index",
        params: {token: localStorage.getItem("token")},
      }).then((res) => {
          console.log((res.data.data))
          this.data=res.data.data
      });
      }
  }
};
</script>

<style lang="less" scoped>
//label复选框
.el-table tr{
    height: 40px;
}
</style>