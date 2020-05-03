<template>
	<el-container class="container">
		<el-aside :style="{width:'15%',minWidth:'200px'}">
			<el-menu
				router
				v-if="categories"
				:default-openeds="openeds"
				style="position: fixed; min-width:200px"
				:default-active="$route.fullPath"
			>
				<el-submenu index="1">
					<template slot="title">分类</template>
					<el-menu-item
						v-for="category in categories"
						:index="`/home/article?${getQuery({category:category.id,page:1})}`"
						:key="category.id"
					>{{category.name}}</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-main style="min-width: 800px;" ref="list">
			<el-carousel>
				<el-carousel-item v-for="(item,index) in carousel" :key="item.id">
					<router-link :to="`/home/article/${item.id}`">
						<div :style="`width:100%;height:100%;overflow:hidden;position:relative;`">
							<el-image style="width:100%;height:100%;" fit="cover" :src="item.img_src"></el-image>
							<span class="ctitle">{{item.title}}</span>
						</div>
					</router-link>
				</el-carousel-item>
			</el-carousel>
			<div style="height:50px;"></div>
			<el-row :gutter="30" v-if="items">
				<el-col style="margin-bottom: 20px;" v-for="item in items" :key="item.id">
					<Item
						:href="`/home/article/${item.id}`"
						:title="item.title"
						:summary="item.summary"
						:image_url="item.image_url"
						:like="item.like"
						:dislike="item.dislike"
						:like_count="item.like_count"
						:tags="item.tags"
						@handlerLike="handlerLike(item.id)"
						@handlerDislike="handlerDislike(item.id)"
						@handlerTag="handlerTag"
					/>
					<el-divider></el-divider>
				</el-col>
			</el-row>
			<div v-else style="min-height:300px;" v-loading="loading"></div>
			<el-pagination
				:page-size="page_size"
				:total="total"
				:current-page="page"
				@current-change="handlerChange"
			></el-pagination>
		</el-main>
		<el-aside :style="{width:'20%',minWidth:'200px'}">
			<el-menu :default-openeds="openeds">
				<el-submenu index="1" v-if="hots">
					<template slot="title">热门文章</template>
					<el-menu-item v-for="hot in hots" :index="hot.id+''" :key="hot.id">{{hot.name}}</el-menu-item>
				</el-submenu>
				<el-submenu index="2" v-if="ads">
					<template slot="title">广告</template>
					<el-menu-item v-for="ad in ads" :index="ad.id+''" :key="ad.id">{{ad.name}}</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>
	</el-container>
</template>

<script>
	import Item from "./Item";
	import qs from "querystring";
	export default {
		components: {
			Item
		},
		data() {
			return {
				openeds: ["1", "2"],
				carousel: null,
				page: 1,
				page_size: 10,
				loading: true,
				total: 0,
				items: null,
				categories: null,
				ads: null,
				hots: null,
				category: 0,
				qs
			};
		},
		created() {
			this.loadList(this.initRoute());
			this.initData();
		},
		watch: {
			$route(route) {
				// console.log(route);
				this.loadList(this.initRoute(route));
				this.initData();
			}
		},
		methods: {
			initRoute(route = this.$route) {
				let { page = 1, category = 0, page_size = 20 } = route.query;
				this.page = parseInt(page);
				this.page_size = parseInt(page_size);
				this.category = category;
				return { page, page_size, category };
			},
			initData(params = {}) {
				let baseURL = this.baseURL;
				return this.$axios
					.get(`${baseURL}/article/init?${qs.stringify(params)}`)
					.then(({ data: { data } }) => {
						const { categories, ads, hots, carousel } = data;
						this.categories = categories;
						this.ads = ads;
						this.hots = hots;
						this.carousel = carousel;
					});
			},
			loadList(opts) {
				let baseURL = this.baseURL;
				this.loading = true;
				this.items = null;

				return this.$axios
					.get(`${baseURL}/article?${this.getQuery(opts)}`)
					.then(({ data: { data } }) => {
						this.loading = false;
						this.total = data.total;
						this.items = data.list.map(item => ({
							...item,
							like_count: item.like,
							image_url: `${baseURL}/imgs/article_images/${item.img_name[0]}/${
								item.img_name[1]
							}/${item.img_name.substring(2)}`,
							like: false,
							dislike: false
						}));
					});
			},
			getQuery(opts={}) {
				opts = {
					page: this.page,
					page_size: this.page_size,
					category: this.category,
					...opts
				};
				return qs.stringify(opts);
			},
			warn() {
				if (!this.$store.state.user_store.isLogin) {
					let self = this;
					this.$confirm("该功能需要登陆!", "提示", {
						confirmButtonText: "前往登录",
						concelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							self.$router.push(
								`/user/login?redirect=/home/article?${this.getQuery()}`
							);
						})
						.catch(err => {
							console.log(err);
							this.$message({
								message: "取消操作",
								type: "warning"
							});
						});
					return true;
				}
				return false;
			},
			handlerLike(id) {
				!this.warn() &&
					(this.items = this.items.map(item => {
						return item.id === id
							? {
									...item,
									like: !item.like,
									dislike: item.like ? item.dislike : false,
									like_count: item.like_count + (item.like ? -1 : 1)
							  }
							: item;
					}));
			},
			handlerDislike(id) {
				!this.warn() &&
					(this.items = this.items.map(item =>
						item.id === id
							? {
									...item,
									dislike: !item.dislike,
									like: false,
									like_count: item.like_count + (item.like ? -1 : 0)
							  }
							: item
					));
			},
			handlerChange(page) {
				this.$refs.list.$el.scrollTo(0, 0);
				this.$router.push(
					`/home/article?${this.getQuery({ page })}`
				);
			},
			handlerTag(tag) {
				this.$message(tag);
			}
		}
	};
</script>

<style scoped>
	.container {
		position: relative;
	}
	.ctitle {
		position: absolute;
		left: 0;
		bottom: 10px;
		margin-left: 10px;
		color: white;
		text-shadow: 1px 1px 1px gray;
	}
</style>
