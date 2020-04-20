<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch('initUser');
  },
};
</script>

<style>
</style>
