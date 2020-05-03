<template>
	<div class="login">
		<div class="login-container">
			<form action class="form-login">
				<ul class="login-nav">
					<li :class="$route.params.type === 'login' ? 'login-nav__item active' : 'login-nav__item'">
						<router-link to="/home/user/login">登录</router-link>
					</li>
					<li :class="$route.params.type === 'register' ? 'login-nav__item active' : 'login-nav__item'">
						<router-link to="/home/user/register">注册</router-link>
					</li>
				</ul>
				<label for="login-input-user" class="login__label">用户名</label>
				<input id="login-input-user" v-model="username" class="login__input" type="text" />
				<label for="login-input-password" class="login__label">密码</label>
				<input id="login-input-password" v-model="password" class="login__input" type="password" />
				<button v-if="!isLoading" class="login__submit" @click.prevent="submit">{{submitMessage}}</button>
				<button v-else class="login__submit loading" @click.prevent>loading...</button>
			</form>
			<a href="#" class="login__forgot">忘记密码?</a>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	let timer = null;
	export default {
		data() {
			return {
				username: "",
				password: "",
				submitMessage: "",
				isLoading: false
			};
		},
		mounted() {
			this.setMessage();
		},
		updated() {
			this.setMessage();
		},
		methods: {
			...mapActions(["login", "register"]),
			setMessage() {
				this.submitMessage =
					this.$route.params.type === "login" ? "登录" : "注册";
			},
			loading() {
				this.isLoading = true;
				let timer = setTimeout(() => {
					this.isLoading = false;
				}, 1000 * 60);
				return () => {
					this.isLoading = false;
					clearTimeout(timer);
				}
			},
			request(username,password) {
				const done = this.loading();
				let req =
					this.$route.params.type === "login" ? this.login : this.register;
				req({ username, password })
					.then(data => {
						done();
						let { redirect } = this.$route.query;
						console.log(redirect);
						if (redirect) {
							this.$router.push(redirect);
						} else {
							this.$router.push("/home/space");
						}
					})
					.catch(err => {
						done();
						console.log(err);
						alert("网络出错了，请稍后重试");
					});
			},
			submit() {
				clearTimeout(timer);
				timer = setTimeout(() => {
					let { username, password } = this;
					if (!username || !password) {
						alert("用户名或密码无效");
					} else {
						this.request(username,password);
					}
				}, 100);
			}
		}
	};
</script>

<style scoped>
	.loading {
		background-color: #ccc !important;
		cursor: not-allowed !important;
	}
	.login {
		background-color: #e9e9e9;
		font-family: "Montserrat", sans-serif;
		font-size: 16px;
		line-height: 1.25;
		letter-spacing: 1px;
	}

	* {
		box-sizing: border-box;
		transition: 0.25s all ease;
	}

	.login-container {
		display: block;
		position: relative;
		z-index: 0;
		margin: 4rem auto 0;
		padding: 5rem 4rem 0 4rem;
		width: 100%;
		max-width: 525px;
		min-height: 680px;
		background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/283591/login-background.jpg);
		box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.85);
	}

	.login-container:after {
		content: "";
		display: inline-block;
		position: absolute;
		z-index: 0;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-image: radial-gradient(
			ellipse at left bottom,
			rgba(22, 24, 47, 1) 0%,
			rgba(38, 20, 72, 0.9) 59%,
			rgba(17, 27, 75, 0.9) 100%
		);
		box-shadow: 0 -20px 150px -20px rgba(0, 0, 0, 0.5);
	}

	.form-login {
		position: relative;
		z-index: 1;
		padding-bottom: 4.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.25);
	}

	.login-nav {
		position: relative;
		padding: 0;
		margin: 0 0 6em 1rem;
	}

	.login-nav__item {
		list-style: none;
		display: inline-block;
	}

	.login-nav__item + .login-nav__item {
		margin-left: 2.25rem;
	}

	.login-nav__item a {
		position: relative;
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		text-transform: uppercase;
		font-weight: 500;
		font-size: 1.25rem;
		padding-bottom: 0.5rem;
		transition: 0.2s all ease;
	}

	.login-nav__item.active a,
	.login-nav__item a:hover {
		color: #ffffff;
		transition: 0.15s all ease;
	}

	.login-nav__item a:after {
		content: "";
		display: inline-block;
		height: 10px;
		background-color: rgb(255, 255, 255);
		position: absolute;
		right: 100%;
		bottom: -1px;
		left: 0;
		border-radius: 50%;
		transition: 0.15s all ease;
	}

	.login-nav__item a:hover:after,
	.login-nav__item.active a:after {
		background-color: rgb(17, 97, 237);
		height: 2px;
		right: 0;
		bottom: 2px;
		border-radius: 0;
		transition: 0.2s all ease;
	}
	.login__label {
		display: block;
		padding-left: 1rem;
	}

	.login__label,
	.login__label--checkbox {
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		font-size: 0.75rem;
		margin-bottom: 1rem;
	}

	.login__label--checkbox {
		display: inline-block;
		position: relative;
		padding-left: 1.5rem;
		margin-top: 2rem;
		margin-left: 1rem;
		color: #ffffff;
		font-size: 0.75rem;
		text-transform: inherit;
	}

	.login__input {
		color: white;
		font-size: 1.15rem;
		width: 100%;
		padding: 0.5rem 1rem;
		border: 2px solid transparent;
		outline: none;
		border-radius: 1.5rem;
		background-color: rgba(255, 255, 255, 0.25);
		letter-spacing: 1px;
	}

	.login__input:hover,
	.login__input:focus {
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.5);
		background-color: transparent;
	}

	.login__input + .login__label {
		margin-top: 1.5rem;
	}

	.login__input--checkbox {
		position: absolute;
		top: 0.1rem;
		left: 0;
		margin: 0;
	}

	.login__submit {
		color: #ffffff;
		font-size: 1rem;
		font-family: "Montserrat", sans-serif;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-top: 1rem;
		padding: 0.75rem;
		border-radius: 2rem;
		display: block;
		width: 100%;
		background-color: rgba(17, 97, 237, 0.75);
		border: none;
		cursor: pointer;
	}

	.login__submit:hover {
		background-color: rgba(17, 97, 237, 1);
	}

	.login__forgot {
		display: block;
		margin-top: 3rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.75);
		font-size: 0.75rem;
		text-decoration: none;
		position: relative;
		z-index: 1;
	}

	.login__forgot:hover {
		color: rgb(17, 97, 237);
	}
</style>