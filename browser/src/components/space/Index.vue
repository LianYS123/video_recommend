<template>
  <div>
      <user-info></user-info>
  </div>
</template>

<script>
import UserInfo from './UserInfo'
export default {
  mounted() {
    this.$axios.get('space/test').then(({data}) => {
      console.log(data);
    }).catch(console.log)
  },
  components:{
    UserInfo
  }
}
</script>

<style>

</style>