<template>
  <div id="index">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

import IndexPage from "@/components/index/";
import ListPage from "@/components/list/";
import Result from "@/components/result";
import Ranking from "@/components/ranking";
import User from '@/components/user';
import Space from '@/components/space';
import Acticle from '@/components/article';
import Detail from '@/components/article/detail';
export default {
  name: "Home",
  components: { Header, Footer }
};
export const router = [
  {
    path: "result/:page/:keyword",
    component: Result,
    props:true
  },
  {
    path: "ranking",
    component:Ranking
  },
  {
    path: "article/:id",
    component: Detail
  },
  {
    path: "article",
    component: Acticle
  },
  {
    path:'space',
    component:Space,
    meta:{auth: true}
  },
  {
    path:"user/:type",
    component: User
  },
  {
    path: ":page", //不要加/(斜杠)
    component: ListPage
  },
  
  {
    path: "", //不要加/(斜杠)
    component: IndexPage
  },
  
];
</script>

<style>
</style>
