import axios from '@/libs/datalib';
export default {
    state: {
        isLogin: !!localStorage.getItem('token'),
        userInfo: null
    },
    mutations: {
        login(state, userInfo) {
            state.isLogin = true;
            state.userInfo = userInfo;
        },
        logout(state) {
            state.isLogin = false;
            state.userInfo = null;
        }
    },
    actions: {
        login({ commit }, user) {
            return axios.post('user/login', user).then(({ data }) => {
                const { userInfo, token } = data;
                if (token) {
                    localStorage.setItem('token', token);
                    commit('login', userInfo);
                }
                return data;
            }).catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                throw err;
            });
        },
        register({ commit }, user) {
            return axios.post('user/reg', user).then(({ data }) => {
                const { userInfo, token } = data;
                if (token) {
                    localStorage.setItem('token', token);
                    commit('login', userInfo);
                }
                return data;
            }).catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                throw err;
            })
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            commit('logout');
        },
        initUser({ commit, state, dispatch }) {
            let info = state.userInfo;
            if (!info) {
                return axios.get('user/info').then(({ data }) => {
                    const { userInfo } = data;
                    commit('login', userInfo);
                }).catch(err => {
                    console.error(err);
                    // dispatch('logout')
                })
            } else {
                return Promise.resolve(info)
            }
        }
    }
}