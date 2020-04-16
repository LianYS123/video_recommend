<template>
	<div class="post-module">
		<div class="thumbnail">
			<div class="date">
				<div class="day">27</div>
				<div class="month">Mar</div>
			</div>
			<img
				src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"
			/>
		</div>
		<div class="post-content">
			<div class="category">Photos</div>
			<h1 class="title">City Lights in New York</h1>
			<h2 class="sub_title">The city that never sleeps.</h2>
			<p
				class="description"
			>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
			<div class="post-meta">
				<span class="timestamp">
					<i class="fa fa-clock-">o</i> 6 mins ago
				</span>
				<span class="comments">
					<i class="fa fa-comments"></i>
					<a href="#">39 comments</a>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
        props:['id']
    };
</script>
<style scoped lang='less'>
	@white: #ffffff;
	@black: #000000;
	@dark_gray: lighten(@black, 20%);
	@gray: lighten(@black, 40%);
	@light_gray: lighten(@black, 60%);
	.background-cover() {
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
	}

	.border-radius( @radius: 3px; ) {
		-webkit-border-radius: @radius;
		-moz-border-radius: @radius;
		border-radius: @radius;
	}

	.border-radius-specific( @tl-radius: 3px; @tr-radius: 3px; @bl-radius: 3px; @br-radius: 3px; ) {
		-webkit-border-radius: @arguments;
		-moz-border-radius: @arguments;
		border-radius: @arguments;
	}

	.box-shadow( @h-shadow: 0px; @v-shadow: 1px; @blur: 2px; @spread: 0px; @color: fade(@black, 15%); ) {
		-webkit-box-shadow: @arguments;
		-moz-box-shadow: @arguments;
		box-shadow: @arguments;
	}

	.inner-box-shadow( @h-shadow: 0px; @v-shadow: 1px; @blur: 2px; @spread: 0px; @color: fade(@black, 15%); ) {
		-webkit-box-shadow: inset @arguments;
		-moz-box-shadow: inset @arguments;
		box-shadow: inset @arguments;
	}

	.box-shadow-none() {
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}

	.transitions( @property: all; @duration: 0.3s; @timing: linear; @delay: 0s; ) {
		-webkit-transition: @arguments;
		-moz-transition: @arguments;
		-ms-transition: @arguments;
		-o-transition: @arguments;
		transition: @arguments;
	}

	.animation( @animation_name; @duration: 1s; @timing_function: ease ) {
		-webkit-animation: @animation_name @duration @timing_function;
		-moz-animation: @animation_name @duration @timing_function;
		-o-animation: @animation_name @duration @timing_function;
		animation: @animation_name @duration @timing_function;
	}

	.box-size( @property: border-box; ) {
		-webkti-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.font-smoothing() {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	@accent: #e74c3c;

	.post-module {
		margin: 20px;
		float: left;
		position: relative;
		z-index: 1;
		// display: block;
		background: @white;
		width: 300px;
		height: 400px;
		.box-shadow;
		.transitions;
		&:hover {
			cursor: pointer;
			.box-shadow(@blur: 35px; @color: fade(@black, 30%) ;);
			.thumbnail {
				img {
					-webkit-transform: scale(1.1);
					-moz-transform: scale(1.1);
					transform: scale(1.1);
					opacity: 0.6;
				}
			}
		}
		.thumbnail {
			background: @black;
			height: 400px;
			overflow: hidden;
			.date {
				position: absolute;
				top: 20px;
				right: 20px;
				z-index: 1;
				background: @accent;
				width: 55px;
				height: 55px;
				padding: 12.5px 0;
				.border-radius(100%);
				color: @white;
				font-weight: 700;
				text-align: center;
				.box-size;
				.day {
					font-size: 18px;
				}
				.month {
					font-size: 12px;
					text-transform: uppercase;
				}
			}
			img {
				display: block;
				width: 120%;
				.transitions;
			}
		}
		.post-content {
			position: absolute;
			bottom: 0;
			background: @white;
			width: 100%;
			padding: 15px;
			.box-size;
			.transitions(@timing: cubic-bezier(0.37, 0.75, 0.61, 1.05));
			.category {
				position: absolute;
				top: -34px;
				left: 0;
				background: @accent;
				padding: 10px 15px;
				color: @white;
				font-size: 14px;
				font-weight: 600;
				text-transform: uppercase;
			}
			.title {
				margin: 0;
				padding: 0 0 10px;
				color: @dark_gray;
				font-size: 20px;
				font-weight: 700;
			}
			.sub_title {
				margin: 0;
				padding: 0 0 20px;
				color: @accent;
				font-size: 17px;
				font-weight: 400;
			}
			.description {
				// display: none;
				color: @gray;
                font-size: 14px;
                max-height: 70px;
                overflow: hidden;
                text-overflow: ellipsis;
				line-height: 1.8em;
			}
			.post-meta {
				margin: 30px 0 0;
				color: @light_gray;
				.timestamp {
					margin: 0 16px 0 0;
				}
				a {
					color: @light_gray;
					text-decoration: none;
				}
			}
		}
	}

	.hover {
		&:extend(.post-module:hover all);
		.post-content {
			.description {
				display: block !important;
				height: auto !important;
				opacity: 1 !important;
			}
		}
	}
</style>
