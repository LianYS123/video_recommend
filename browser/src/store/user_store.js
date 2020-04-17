import axios from 'axios';
export default {
    state: {
        isLogin: false,
        userInfo: null
    },
    mutations:{
        login(state,userInfo){
            state.isLogin = true;
            state.userInfo = userInfo;
        },
        logout(state){
            state.isLogin = false;
            state.userInfo = null;
        }
    },
    actions:{
        login({commit}, user){
            return axios.post('user/login',user).then(({data}) => {
                const {userInfo, token} = data;
                if(token){
                    localStorage.setItem('token',token);
                    commit('login', userInfo);
                }
                return data;
            }).catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                throw err;
            });
        },
        register({commit},user){
            return axios.post('user/reg',user).then(({data}) => {
                console.log(data);
                const {userInfo, token} = data;
                if(token){
                    localStorage.setItem('token',token);
                    commit('login', userInfo);
                }
                return data;
            }).catch(err => {
                console.log(err);
                localStorage.removeItem('token');
                throw err;
            })
        },
        logout({commit}){
            localStorage.removeItem('token');
            commit('logout');
        }
    }
}