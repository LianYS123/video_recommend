<template>
  <div class="search_form">
    <form class="media_search search_xl" @submit.prevent="search()">
      <div>
        <input type="submit" value=" " class="loupe" />
        <span>
          <input
            class="q"
            type="text"
            name="q"
            value
            placeholder="输入片名/分类/标签"
            data-autofocus
            autocomplete="off"
            v-model="keyword"
            @keydown.enter.prevent="search()"
          />
        </span>
      </div>
    </form>
    <div class="popular_searches">
      热门搜索：
      <a href="javascript:" v-for="(keyword,index) in hot" :key="index" @click="search(keyword)">{{keyword}}, </a>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      keyword:null,
      hot:['某科学的超电磁炮','紫罗兰永恒花园','从零开始的异世界生活','小林家的龙女仆']
    }
  },
  methods:{
    async search(keyword){
      keyword = keyword || this.keyword;
      if(keyword){
        await this.loadResult({keyword,page:1});
        this.$router.push(`/home/result/1/${keyword.trim()}`);
      }
    },
    ...mapActions(['loadResult'])
  }
};
</script>

<style>
.popular_searches{
    color:black;
}
.popular_searches a{
    color:black;
}
.search_form{
    margin: 0 50px;
}
.media_search {
    background: #fff;
    border-radius: 5px;
    border: 1px solid #eee;
}
.media_search .loupe {
    float: left;
    width: 50px;
    height: 55px;
    border: 0;
    background: url(~@/assets/sprites.svg), no-repeat;
    background-position: 15px -83px;
    opacity: .75;
    transition: opacity .3s;
}
.media_search .q {
    width: 100%;
    margin: 0;
    padding: 18px 0;
    border: 0;
    font: normal 16px 'Open Sans', sans-serif;
}
.popular_searches {
    margin: 10px;
    font-size: 14px;
    opacity: .5;
}
.media_search>div>span {
    display: block;
    overflow: hidden;
}
</style>