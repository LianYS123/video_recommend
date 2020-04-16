<template>
	<div class="container">
		<div v-for="i in 9" @click="handlerClick(i)">
			<item />
		</div>
	</div>
</template>

<script>
	import Item from "./Item";
	export default {
		components: {
			Item
		},
		methods: {
			handlerClick(i) {
				console.log(i);
				this.$router.push("/home/article/" + i);
			}
		}
	};
</script>

<style scoped>
	.container {
		width: 100%;
	}
</style>
