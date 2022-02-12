import moment from "moment";

// 分钟
export function minute(data){
    moment(data).format('mm:ss');
}