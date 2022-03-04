import Cookies from "js-cookie";


export const setCookie = (string)=>{
    const cookies = string.split(';;');
  cookies.map(cookie => {
    document.cookie = cookie;
    const cookieKeyValue = cookie.split(';')[0].split('=');
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1]);
  });
}
export const getCookie = (key)=>{
    return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`);
}