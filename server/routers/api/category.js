/*
1	番剧 2电影 3纪录片 4国创 5电视剧

地区 全部 中国大陆 中国港台 美国 日本 韩国 其他国家
状态 全部 完结 连载
剧情 喜剧 爱情 动作 恐怖 科幻 犯罪 惊悚 悬疑 奇幻 战争 动画传记家庭歌舞历史冒险纪实灾难漫画改小说改
*/
const category =
    [
        {
            name: "风格",
            value: "style",
            isShow: true,
            children: [
                {
                    name: "全部",
                    cate: "style",
                    value: ""
                },
                {
                    name: "剧情",
                    cate: "style",
                    value: "剧情"
                },

                {
                    name: "喜剧",
                    cate: "style",
                    value: "喜剧"
                },

                {
                    name: "动作",
                    cate: "style",
                    value: "动作"
                },
                {
                    name: "爱情",
                    cate: "style",
                    value: "爱情"
                },
                {
                    name: "恐怖",
                    cate: "style",
                    value: "恐怖"
                },
                {
                    name: "动画",
                    cate: "style",
                    value: "动画"
                }
            ]
        },
        {
            name: "类型",
            value: "type",
            isShow: false,
            children: [
                {
                    name: "全部",
                    cate: "type",
                    value: ""
                },
                {
                    name: "番剧",
                    cate: "type",
                    value: 1
                },

                {
                    name: "电影",
                    cate: "type",
                    value: 2
                },

                {
                    name: "纪录",
                    cate: "type",
                    value: 3
                },

                {
                    name: "国创",
                    cate: "type",
                    value: 4
                },
                {
                    name: "电视",
                    cate: "type",
                    value: 5
                }
            ]
        },

        {
            name: "地区",
            value: "area",
            isShow: false,
            children: [
                {
                    name: "全部",
                    cate: "area",
                    value: ""
                },

                {
                    name: "大陆",
                    cate: "area",
                    value: "大陆"
                },

                {
                    name: "香港",
                    cate: "area",
                    value: "香港"
                },

                {
                    name: "台湾",
                    cate: "area",
                    value: "台湾"
                },

                {
                    name: "美国",
                    cate: "area",
                    value: "美国"
                },

                {
                    name: "日本",
                    cate: "area",
                    value: "日本"
                },

                {
                    name: "韩国",
                    cate: "area",
                    value: "韩国"
                }
            ]
        }
    ]

const cateValues = category.map(item => item.value);

module.exports = {
    category, cateValues
}