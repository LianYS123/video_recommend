import qs from 'querystring'
import axios from '@/libs/datalib';
let lastUrl = '';
export default {
    state: {
        menu: null,
        cates: {},
        page: 1,
        pageSize: 20,
        sort: 'favorites',
        desc: 'desc',
        initCates: null,
        category: null,
        cateValues: ["style", "type", "area"]
    },
    mutations: {
        setMenu(state, menu) {
            state.menu = menu;
        },
        initCate(state, { category, initCates, cateValues }) {
            state.initCates = initCates;
            state.category = category;
            state.cateValues = cateValues;
        },
        setParams(state, { cates, page, sort = 'favorites', desc = 'desc' }) { //commit只能接受一个参数
            state.cates = {
                ...state.cates,
                ...cates
            }
            if (page) {
                state.page = page;
            }
            state.sort = sort;
            state.desc = desc;
        }
    },
    actions: {
        //啥都不传加载原分类数据, cates不传重置分类,cates传空对象加载原分类数据, 传空对象{}加载第一页无分类数据
        async loadMenu({ commit, state }, { page = 1, cates={}, sort = 'favorites', desc = 'desc' } = {}) {
            commit("setParams", { cates, page, sort, desc });
            let pageSize;
            ({ sort, desc, page, pageSize } = state);
            let url = `/video?${qs.stringify({ ...cates, sort, desc, page, pageSize })}`;
            if (lastUrl !== url) {
                console.log(url);
                commit('setMenu', null);
                let res = (await axios.get(url)).data;
                if (res.ok) {
                    commit('setMenu', res.data);
                }
                lastUrl = url;
            }
        },
        init({ commit }) {
            axios.get('/video/category').then(({ data: { data } }) => {
                const { cateValues, category } = data;
                const initCates = {};
                cateValues.forEach(cate => initCates[cate] = '');
                commit('initCate', { initCates, category, cateValues });
            })
        }
    },
    getters: {
        total(state) {
            return state.menu ? state.menu.total : 0;
        },
        totalPages(state) {
            let total = state.menu ? state.menu.total : 0;
            return total % 20 == 0 ? parseInt(total / 20) : parseInt(total / 20) + 1;
        }
    }
};