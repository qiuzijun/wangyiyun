import axios from 'axios'
// import { getCookie } from './cookies';
const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
  });
  instance.interceptors.request.use((config)=>{
    //   console.log(config);
    // if(getCookie('MUSIC_U')){
    //   config.params.cookie = `MUSIC_U=${getCookie('MUSIC_U')};`;
    // }
    // console.log(getCookie('MUSIC_U'));
return config
  },(error)=>{
      console.log(error);
  })
instance.interceptors.response.use((response)=>{
    // console.log(response);
    return response
},(error)=>{
    console.log(error);
})

export default instance