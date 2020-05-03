<template>
	<div>
		<ECharts :options="option" @click="fnClick" autoresize />
	</div>
</template>

<script>
	import ECharts from "vue-echarts";
	import "echarts/lib/chart/tree";
	import "echarts/lib/component/polar";
	import { mapActions, mapState } from "vuex";
	import qs from "querystring";
	const serie = {
		type: "tree",
		data: null,

		itemStyle: {
			//设置属性
			normal: {
				color: "#333333" || "#333333",
				borderWidth: 0
			}
		},
		label: {
			//内容位置等属性
			normal: {
				verticalAlign: "middle",
				align: "center",
				fontSize: 14,
				color: "#ffffff"
			}
		},
		lineStyle: {
			//连线颜色
			normal: {
				color: "#333333" || "rgba(0,0,0,0.25)",
				width: 0.5,
				curveness: 0.75
			}
		},
		leaves: {
			label: {
				show: true
			}
		},
		top: "-15%",
		left: "2%",
		bottom: 100,
		right: "2%",
		symbolSize: 40,
		animationDuration: 0,
		animationDurationUpdate: 0,
		orient: "vertical",
		symbol: "circle",
		expandAndCollapse: true,
		initialTreeDepth: 2
	};
	const option = {
		series: []
	};
	export default {
		components: {
			ECharts
		},
		computed: {
			...mapState({
				category: state => state.menu_store.category
			}),
			option() {
        console.log(this.category);
				let data = [
					{
						name: "",
						children: this.category
					}
				];
				serie.data = data;
        const option =  { series: [serie] };
        return option;
			}
		},
		methods: {
			...mapActions(["loadMenu"]),
			async fnClick(params) {
				let { cate, value } = params.data;
				if (cate) {
					let cates = {[cate]: value };
					await this.loadMenu({ cates });
					this.$router.push(`/home/1?${qs.stringify(cates)}`);
				}
			}
		}
	};
</script>

<style>
	.echarts {
		width: 100% !important;
		height: 600px !important;
	}
</style>