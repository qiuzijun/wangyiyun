// import copy from './copy'
// import longpress from './longpress'
import Vue from 'vue'
import {copy} from './prototype'
// 自定义指令
const directives = {
  copy
}
Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
})
