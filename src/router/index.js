import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
  
  {
    path: '/',
    redirect:"/discoverMusic",
    // component: () => import('../views/MainPage.vue'),
    meta: {
      title: '网易云音乐'
  },
  },
  {
    path:'/download',
    component:()=>import('../views/download/download.vue'),
    meta: {
      title: '客户端下载'
  }
  },
  {
    path:'/follow',
    component:()=>import('../views/follow/follow.vue'),
    meta: {
      title: '关注'
  }
  },
  {
    path:'/discoverMusic',
    component: () => import('../views/MainPage.vue'),
    meta: {
      title: '网易云音乐'
  },
  children:[
    {
      path:'/',
      name: 'Recommend',
      component:()=>import('../views/recommend/recommend.vue')
    },
    {
      path:'recommend',
      component:()=>import('../views/recommend/recommend.vue'),
      meta:{
        title:'网易云音乐'
      }
    },
    {
      path:'rankingList',
      name: 'rankingList',
      component:()=>import('../views/rankingList/rankingList.vue'),
      meta:{
        title:'排行榜'
      }
    },
    {
      path:'songSheet',
      name:'songSheet',
      component:()=>import('../views/songSheet/songSheet.vue'),
      meta:{
        title:'歌单'
      }
    },
    {
      path:'anchorStation',
      component:()=>import('../views/anchorStation/anchorStation.vue'),
      meta:{
        title:'主播电台'
      }
    },
    {
      path:'singer',
      component:()=>import('../views/singer/singer.vue'),
      meta:{
        title:'歌手'
      }
    },
    {
      path:'newDiscOnTheShelf',
      name:"newDiscOnTheShelf",
      component:()=>import('../views/newDiscOnTheShelf/newDiscOnTheShelf.vue'),
      meta:{
        title:'新碟上架'
      }
    },
    {
      path:'singerInformation',
      name:"singerInformation",
      component:()=>import('../views/singerInformation/singerInformation.vue'),
      meta:{
        title:'歌手信息'
      }
    },
    {
      path:'mv',
      name:"mv",
      component:()=>import('../views/mv.vue'),
      meta:{
        title:'mv'
      }
    },
    {
      path:'lyric',
      name:"lyric",
      component:()=>import('../views/lyric.vue'),
      meta:{
        title:'歌词'
      }
    },
    {
      path:'songListInformation',
      name:"songListInformation",
      component:()=>import('../views/songListInformation.vue'),
      meta:{
        title:'歌单内容'
      }
    },
    {
      path:'disc',
      name:"disc",
      component:()=>import('../views/disc.vue'),
      meta:{
        title:'新碟内容'
      }
    },
  ]
  },
  {
    path:'/myMusic',
    component:()=>import('../views/myMusic/myMusic.vue'),
    meta: {
      title: '我的音乐'
  }
  },
  {
    path:'/shoppingMall',
    component:()=>import('../views/shoppingMall/shoppingMall.vue'),
    meta: {
      title: '商城'
  }
  },
  {
    path:'/musician',
    component:()=>import('../views/musician/musician.vue'),
    meta: {
      title: '音乐人'
  }
  },
]

const router = new VueRouter({
  // mode:'history',
  routes
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  // console.log(to);
  if (to.meta.title) {
      document.title = to.meta.title
  }else{
    document.title = '网易云音乐'
  }
  next()
})

export default router
