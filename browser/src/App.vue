<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
// import '../static/css/pixabay.css'
// import '../static/css/search_result.css'
export default {
  name: "App",
  created() {
    this.$store.dispatch('init');
    this.$store.dispatch('initUser');
  }
};
</script>

<style>
</style>
