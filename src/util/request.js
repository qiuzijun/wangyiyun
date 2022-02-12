import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
  });
  instance.interceptors.request.use((config)=>{
    //   console.log(config);
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