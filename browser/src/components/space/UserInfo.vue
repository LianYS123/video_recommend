<template>
	<header v-if="userInfo">
		<div class="navWrapper" id="home">
			<div class="clearfix">
				<h2 class="companyName">{{userInfo.username}}的个人主页</h2>
				<nav class="mainNav clearfix">
					<ul>
						<li>
							<a href="#">主页</a>
						</li>
						<li>
							<a href="#" class="smoothScroll">动态</a>
						</li>
						<li>
							<a href="#" class="smoothScroll">收藏</a>
						</li>
						<li>
							<a href="#" class="smoothScroll">设置</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>

		<section class="hero">
			<div class="innerWrapper">
				<h1>欢迎来到{{userInfo.username}}的个人空间</h1>
				<h3>{{msg}}</h3>
			</div>
		</section>
	</header>
</template>

<script>
import {mapState} from 'vuex';
	export default {
        data(){
            return {
				msg: ''
            }
        },
        mounted() {
            if(!this.userInfo){
                this.$router.push('/home/user/login');
            } else {
				document.title = this.userInfo.username + "的个人主页";
				this.$axios.get('space/test').then(({data}) => {
					if(data.ok){
						this.msg = data.msg;
					} else {
						alert(data.msg);
					}
				})
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.user_store.userInfo
            })
        },
    };
</script>

<style scoped>
	.clearfix:after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: " ";
		clear: both;
		height: 0;
	}

	* {
		box-sizing: border-box;
	}

	.innerWrapper {
		max-width: 920px;
		margin: 0 auto;
	}

	h2,
	h4 {
		font-family: "Abril Fatface", serif;
	}

	h2 {
		font-size: 3rem;
		text-align: center;
		padding-top: 100px;
		margin: 0 0 30px 0;
	}

	/* NAV SECTION */

	.companyName {
		padding: 18px 17px 18px 15%;
		margin: 0;
		float: left;
		color: #fff;
		width: 45%;
		background: rgba(0, 0, 0, 0.7);
		font-family: "Josefin Sans", sans-serif;
		font-weight: 400;
		font-size: 1.8rem;
		text-align: left;
		font-variant: small-caps;
	}

	nav {
		padding: 0;
		margin: 0;
		width: 55%;
		float: right;
	}

	header nav ul {
		display: inline-block;
		padding: 0;
		margin: 0;
		width: 100%;
		border-right: 20px solid rgba(0, 0, 0, 0.7);
	}

	header nav ul li {
		float: left;
		margin: 0;
		display: inline;
		width: 25%;
		text-align: center;
		background: rgba(0, 0, 0, 0.7);
	}

	header nav ul li:hover {
		background: none;
		font-style: bold;
		transform: scale(1.2);
	}

	header nav ul li a {
		text-decoration: none;
		padding: 25px 20px;
		color: #fff;
		margin: 0;
		display: inline-block;
		text-transform: uppercase;
		font-family: "Quicksand", sans-serif;
		font-size: 1rem;
	}

	header nav ul li a:focus {
		outline: none;
	}

	/* HEAD SECTION */

	header {
		background: url(https://cdn.pixabay.com/photo/2016/09/14/08/18/film-1668918_1280.jpg);
		background-size: cover;
		background-attachment: fixed;
	}

	.hero {
		text-align: center;
		text-shadow: 1px 0 2px #595859;
	}

	.hero h1 {
		font-size: 5.5rem;
		margin: 0;
		padding-top: 200px;
		font-family: "Abril Fatface", serif;
		color: #fff;
	}

	.hero h3 {
		padding-bottom: 250px;
		font-family: "Quicksand", sans-serif;
		font-style: italic;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 700;
		margin: 0;
	}

	@media (max-width: 900px) {
		.companyName {
			width: 100%;
			text-align: center;
			padding: 4% 4%;
		}

		.mainNav {
			width: 100%;
		}

		header nav ul {
			border: none;
		}

		header nav ul li a {
			padding: 25px 2%;
		}
	}
</style>