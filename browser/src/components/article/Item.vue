<template>
	<router-link :to="href">
		<el-container style="min-height:100px;">
			<el-main>
				<el-container>
					<el-header height="auto">
						<div class="title">{{title}}</div>
					</el-header>
					<el-main>
						<div class="desc">{{summary}}</div>
					</el-main>
					<el-footer height="auto">
						<div class="bar" @click.stop.prevent="">
							<el-tag
								class="icon"
								size="mini"
								type="info"
								v-for="(tag,index) in tags"
								:key="index"
								@click.prevent.stop='$emit("handlerTag", tag)'
							>{{tag}}</el-tag>
							<span class="icons">
								<span @click.stop.prevent="$emit('handlerLike')" :class="{'icon-active':like}">
									<el-font :icon="['far','thumbs-up']" size="lg"></el-font>
									<i class="icon">{{like_count}}</i>
								</span>
								<span :class="dislike ? 'icon icon-active' : 'icon'" @click.stop.prevent="$emit('handlerDislike')">
									<el-font :icon="['far','thumbs-down']" size="lg"></el-font>
								</span>
							</span>
						</div>
					</el-footer>
				</el-container>
			</el-main>

			<el-aside width="100px">
				<el-image fit='contain' :src="image_url" style="height:95%"></el-image>
			</el-aside>
		</el-container>
	</router-link>
</template>
<script>
	export default {
		props: [
			"href",
			"title",
			"summary",
			"image_url",
			"like",
			"dislike",
			"like_count",
			"tags"
		]
	};
</script>
<style scoped>
	.title {
		max-width: 100%;
		font-size: 20px;
		color: #212121;
		line-height: 26px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.title:hover{
		color: #4fc4eb;
	}
	.desc {
		margin-top: 4px;
		font-size: 12px;
		color: #99a2aa;
		letter-spacing: 0;
		line-height: 22px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.icons {
		color: #99a2aa;
		margin: 0 10px;
	}
	.icon {
		margin: 5px;
	}
	.icon:hover {
		color: #4fc4eb;
	}
	.icon-active {
		color: #00a1d6;
	}
</style>
