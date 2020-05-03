<template>
	<el-container id="index">
		<el-header>
			<Header2></Header2>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
		<el-footer>
			<!-- <Footer></Footer> -->
		</el-footer>
	</el-container>
</template>

<script>
	import Header2 from "./Header2";
	import Footer from "./Footer";

	import IndexPage from "@/components/index/";
	import ListPage from "@/components/list/";
	import Result from "@/components/result";
	import Ranking from "@/components/ranking";
	import User from "@/components/user";
	import Space from "@/components/space";
	import Acticle from "@/components/article";
	import Detail from "@/components/article/detail";
	export default {
		name: "Home",
		components: { Header2, Footer }
	};
	export const router = [
		{
			path: "result/:page/:keyword",
			component: Result,
			props: true
		},
		{
			path: "ranking",
			component: Ranking
		},
		{
			path: "article/:id",
			component: Detail
		},
		{
			path: "article",
			component: Acticle
		},
		{
			path: "space",
			component: Space,
			meta: { auth: true }
		},
		{
			path: "user/:type",
			component: User
		},
		{
			path: ":page", //不要加/(斜杠)
			component: ListPage
		},

		{
			path: "", //不要加/(斜杠)
			component: IndexPage
		}
	];
</script>

<style>
</style>
