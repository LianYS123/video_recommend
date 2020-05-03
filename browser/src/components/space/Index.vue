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
    }).catch(err => {
      if(err.response.status === 401){
        this.$router.push('/user/login')
      }
    })
  },
  components:{
    UserInfo
  }
}
</script>

<style>

</style>