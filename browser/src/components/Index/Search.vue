<template>
<div id='search' style="padding:0 50px;">
  <el-input placeholder="输入...">
      <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
</template>

<script>
export default {

}
</script>

<style>
    #search .el-input__inner{
        height: 50px;
        border: none;
        font-size: 18px;
    }
</style>