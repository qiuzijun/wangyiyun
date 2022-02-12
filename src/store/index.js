import Vue from 'vue'
import Vuex from 'vuex'
import{detail,soaringList,newDiscInformation,firstMusic} from '@/api/http.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName:'',
    userImg:'',
    login:'',
    // 歌曲id
    addId:'',
    // 歌单
    songSheetList:[],
    // 榜单
    list:[],
    // 清除歌单
    clear:null,
    rankingId:19723756 //默认值
  },
  mutations: {
    loginShow(state,config){
      state.login = config
    },
    // 歌曲id
    addId(state,config){
      state.addId = config
    },
    // 歌单
    songSheet(state,config){
       if(state.list.length==0){
        state.songSheetList.push(config)
        state.clear = false
      }
      
    },
    // 榜单
    list(state,config){
      state.list = config
    },
    // 清除歌单
    delete(state,config){
      state.clear = config
      state.list = []
      state.songSheetList = []
    },
    // 榜单id
    rankingId(state,config){
      state.rankingId = config
      console.log(state.rankingId);
    }

  },
  actions: {
    setUser(state,config){
      state.userName = config
      state.userImg  = config.data.profile.avatarUrl
      console.log(config.data.profile.avatarUrl);
      console.log(state.userImg);
    },
    // 歌曲id值
    playId({  commit },config){
      // console.log(state);
      commit("addId", config);
      const id = config
      return new Promise((resole,reject)=>{
        detail(
          {
            ids:id
          }
        ).then((result) => {
          // console.log(result);
          // 存储歌曲
          commit('songSheet',result.data.songs[0])
          resole(result)
        }).catch((err) => {
          reject(err)
        });
      })
    },
    // 榜单
    listId({commit},config){
      // console.log(commit);
      const id = config
      return new Promise((resolve,reject)=>{
        soaringList({
          id
        }).then((result) => {
          resolve(result)
          // 存储歌单
          commit('list',result.data.playlist.tracks)
        }).catch((err) => {
          reject(err)
        });
      })
    },
    // 新碟
    discId({commit},config){
      console.log(commit);
      const id = config
      return new Promise((resolve,reject)=>{
        newDiscInformation({
          id
        }).then((result) => {
          resolve(result)
          console.log(result);
          // 存储歌单
          commit('list',result.data.songs)
        }).catch((err) => {
          reject(err)
        });
      })
    },
    // 新碟上架
    newDiscId({commit},config){
      const id = config
      return new Promise((resolve,reject)=>{
        newDiscInformation({
          id
        }).then((result) => {
          resolve(result)
          console.log(result.data.songs);
          // 存储歌单
          commit('list',result.data.songs)
        }).catch((err) => {
          reject(err)
        });
      })
    },
    // 歌手前50首歌
    singerMusic({commit},config){
      const id = config
      return new Promise((resolve,reject)=>{
        firstMusic({
          id
        }).then((result) => {
          resolve(result)
          // console.log(result.data.songs);
          // 存储歌单
          commit('list',result.data.songs)
        }).catch((err) => {
          reject(err)
        });
      })
    },
    // 清除歌单
    delete({commit},config){
      commit('delete',config)
    },
    // 榜单id
    rankingId({commit},config){
      commit('rankingId',config)
      console.log(config);
    }
    
  },
  modules: {
  },
  getters:{
    
  }
})
