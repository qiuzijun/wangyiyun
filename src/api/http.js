import axios from "axios"
import instance from "../util/request"



// 退出登录
export function outLogin(){
    return axios.post('/api/logout?realIP=116.25.146.177')
}
// 获取登录状态
export function getStatus(){
    return axios.post('/api/login/status?realIP=116.25.146.177')
}
// 获取账号信息
export function getAccount(){
    return axios.post('/api/user/account?realIP=116.25.146.177')
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getSubcount(){
    return axios.post('/api/user/subcount?realIP=116.25.146.177')
}
// 获取用户信息
export function getInfo(data={}){
    return axios.post('/api/user/detail?uid='+data.uid+'&realIP=116.25.146.177')
}
// 获取用户绑定信息
export function getBinding(data={}){
    return axios.post('/api/user/binding?uid='+data.uid+'&realIP=116.25.146.177')
}
// 获取二维码登录key值
export function getRqCodeKey(data={}){
    return axios.post('/api/login/qr/key?t='+data.t+'&realIP=116.25.146.177')
    // return instance({
    //     method:'post',
    //     url:'/login/qr/key',
    //     data:{
    //         operationType: 'qRCode',
    //         t:data.t
    //     }
    // })
}
// 获取二维码登录图片
export function getRqCodeImg(data={}){
    return axios.post('/api/login/qr/create?key='+data.key+'&qrimg='+data.qrimg+'&t='+data.t+'&realIP=116.25.146.177')
    // return instance({
    //     method:'post',
    //     url:'/login/qr/create',
    //     data:{
    //         operationType: 'getRqCodeImg',
    //         key:data.key,
    //         qrimg:data.qrimg,
    //         t:data.t
    //     }
    // })
}
// 获取二维码状态
export function getRqCodeState(data={}){
    return axios.post('/api/login/qr/check?key='+data.key+'&t='+data.t+'&realIP=116.25.146.177')
    // return instance({
    //     method:'post',
    //     url:'/login/qr/check',
    //     data:{
    //         operationType: 'getRqCodeState',
    //         key:data.key,
    //         t:data.t
    //     }
    // })
}
// 获取验证码
export function getCode(data={}){
    return instance({
        method:'post',
        url:'/captcha/sent'+'?realIP=116.25.146.177',
        data:{
            operationType: 'getCode',
            phone:data.phone,
            ctcode:data.ctcode
        }
    })
}
// 验证验证码
export function verificationCode(data={}){
    return instance({
        method:'post',
        url:'/captcha/verify'+'?realIP=116.25.146.177',
        data:{
            operationType: 'verificationCode',
            phone:data.phone,
            captcha:data.captcha
        }
    })
}
// 验证码登录
export function verificationLogin(data={}){
    return instance({
        method:'post',
        url:'/login/cellphone'+'?realIP=116.25.146.177',
        data:{
            operationType: 'verificationLogin',
            phone:data.phone,
            password:data.password,
            md5_password:data.md5_password,
            captcha:data.captcha
        }
    })
}
// banner轮播
export function banner(data={}){
    return instance({
        method:'post',
        url:'/banner'+'?realIP=116.25.146.177',
        data:{
            operationType: 'banner',
            type:data.type
        }
    })
}
// 热门推荐
export function popularRecommendation(data={}){
    return instance({
        method:'post',
        url:'/personalized'+'?realIP=116.25.146.177',
        data:{
            operationType: 'popularRecommendation',
            limit:data.limit,
        }
    })
}
// 新碟上架
export function newDisc(data={}){
    return instance({
        method:'post',
        url:'/top/album'+'?realIP=116.25.146.177',   
        data:{
            operationType: 'newDisc',
            limit:data.limit,
            offset:data.offset
        }
    })
}
// 获取榜单信息
export function soaring(data={}){
    return instance({
        method:'post',
        url:'/toplist'+'?realIP=116.25.146.177',   
        data:{
            operationType: 'soaring',
            data
        }
    })
}
// 获取新碟上架信息
export function newDiscInformation(data={}){
    return axios.post('/api/album?id='+data.id+'&realIP=116.25.146.177')
    
}
// 获取新碟详情
export function newDiscDynamic(data={}){
    return axios.post('/api/album/detail/dynamic?id='+data.id+'&realIP=116.25.146.177')
    
}
// 获取所有榜单
export function topList(data={}){
    return instance({
        method:'post',
        url:'/toplist'+'?realIP=116.25.146.177',   
        data:{
            operationType: 'topList',
            data
        }
    })
}
// 获取歌单详情动态部分,如评论数,是否收藏,播放数
export function dynamic(data={}){
    return axios.post('/api/playlist/detail/dynamic?id='+data.id+'&realIP=116.25.146.177')
    // return instance({
    //     method:'post',
    //     url:'/playlist/detail/dynamic',   
    //     data:{
    //         operationType: 'dynamic',
    //         id:data.id
    //     }
    // })
}
// 获取歌单评论
export function comment(data={}){
    return axios.post('/api/comment/new?id='+data.id+'&type='+data.type+"&pageNo="+data.pageNo+"&pageSize="+data.pageSize+"&cursor="+data.cursor+"&sortType=3"+'&realIP=116.25.146.177')
    // return instance({
    //     method:'post',
    //     url:'/comment/new',   
    //     data:{
    //         operationType: 'comment',
    //         id:data.id,
    //         type:data.type
    //     }
    // })
}
// 获取榜单歌曲信息
export function soaringList(data={}){
    return axios.post('/api/playlist/detail?id='+data.id+'&s=8'+'&realIP=116.25.146.177')
  
}
// 获取歌单分类
export function catlist(data={}){
    // return axios.post('/api/playlist/catlist')
    return instance({
        method:'post',
        url:'/playlist/catlist'+'?realIP=116.25.146.177',   
        data:{
            operationType: 'catlist',
            data
        }
    })
  
}
// 获取歌曲mv信息
export function Mv(data={}){
    return axios.post('/api/mv/url?id='+data.id+'&realIP=116.25.146.177')
  
}
// 获取热门歌手
export function hotSinger(data={}){
    // return axios.post('/api/top/artists?limit='+data.limit+'&offset='+data.offset)
    return instance({
        method:'post',
        url:'/top/artists'+'?realIP=116.25.146.177',   
        data:{
            operationType: 'hotSinger',
            offset:data.offset,
            limit:data.limit
        }
    })
}
// 获取热门主播
export function hotPopular(data={}){
    return instance({
        method:'post',
        url:'/dj/toplist/popular'+'?realIP=116.25.146.177',   
        data:{
            operationType: 'hotPopular',
            
            limit:data.limit
        }
    })
}
// 获取歌曲地址
export function songUrl(data={}){
    return axios.post('/api/song/url?id='+data.id+'&realIP=116.25.146.177')
}
// 获取歌曲详情
export function detail(data={}){
    return axios.post('/api/song/detail?ids='+data.ids+'&realIP=116.25.146.177')
}
// 获取歌词
export function lyric(data={}){
return    axios.post('/api/lyric?id='+data.id+'&realIP=116.25.146.177')
    
}
// 获取歌单
export function playList(data={}){
    return axios.post('/api/top/playlist?order='+data.order+'&cat='+data.cat+'&limit='+data.limit+'&offset='+data.offset+'&realIP=116.25.146.177')
    // return axios({
    //     method:'post',
    //     url:'/api/top/playlist',   
    //     data:{
    //         operationType: 'playList',
    //         order:data.order,
    //         cat:data.cat,
    //         limit:data.limit,
    //         offset:data.offset
    //     }
    // })
    
}
// 获取新碟
export function disc(data={}){
//     limit : 返回数量 , 默认为 30

// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

// area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
return axios.post('/api/album/new?limit='+data.limit+"&offset="+data.offset+"&area="+data.area+'&realIP=116.25.146.177')
    // return instance({
    //     method:'post',
    //     url:'/album/new',
    //     data:{
    //         limit:data.limit,
    //         offset:data.offset,
    //         area:data.area
    //     }
    // })
}
// 获取歌手
export function  artist(data={}){
    return axios.post('/api/artist/list?limit='+data.limit+"&offset="+data.offset+"&type="+data.type+"&area="+data.area+"&initial="+data.initial+'&realIP=116.25.146.177')
}
// 获取歌手前50歌曲
export function firstMusic(data={}){
    return axios.post('/api/artist/top/song?id='+data.id+'&realIP=116.25.146.177')
}
// 获取歌手专辑
export function singerAlbum(data={}){
    return axios.post('/api/artist/album?id='+data.id+'&limit=12'+"&offset="+data.offset+'&realIP=116.25.146.177')
}
// 获取歌手mv
export function singerMv(data={}){
    return axios.post('/api/artist/mv?id='+data.id+'&realIP=116.25.146.177')
}
// 获取歌手信息
export function singerInformation(data={}){
    return axios.post('/api/artist/desc?id='+data.id+'&realIP=116.25.146.177')
}

// 获取歌手详情
export function singerDetail(data={}){
    return axios.post('/api/artist/detail?id='+data.id+'&realIP=116.25.146.177')
}
// 获取mv评论
export function mvComment(data={}){
    return axios.post('/api/comment/mv?id='+data.id+'&limit='+data.limit+'&offset='+data.offset+'&before='+data.before+'&realIP=116.25.146.177')
}
// 获取mv数据
export function mvData(data={}){
    return axios.post('/api/mv/detail?mvid='+data.id+'&realIP=116.25.146.177')
}
// 获取mv地址
export function mvAddress(data={}){
    return axios.post('/api/mv/url?id='+data.id+'&realIP=116.25.146.177')
}
// 获取搜索
export function search(data={}){
    return axios.post('/api/search?keywords='+data.keywords+'&type=1018'+'&realIP=116.25.146.177')
}
// 获取相似音乐
export function beSimilar(data={}){
    return axios.post('/api/simi/song?id='+data.id+'&realIP=116.25.146.177')
}
