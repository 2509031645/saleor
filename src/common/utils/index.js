import moment from 'moment';

export const getUrlParams = (name, str) => {
    let pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
    str = str || window.location.search;
    let arr, match = "";
    while ((arr = pattern.exec(str)) !== null) {
        match = arr[1];
    }
    return match;
};

/**
 * 往剪切板添加内容
 * @param value
 * @returns {boolean}
 */
export const clipboard = (value) => {
    if (document.execCommand) {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', value);
        input.select();

        document.execCommand('copy');
        document.body.removeChild(input);

        return true;
    }

    return false;
};


//将base64转换为文件
export const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
};

//从session中取json数据
export const getCacheList = (key,initVal) => {
    let list = initVal;
    if(sessionStorage.getItem(key)){
        try {
            list = JSON.parse(sessionStorage.getItem(key));
        }
        catch (e) {
            console.error('sessionStorage ' + key + ' 不是json');
        }
    }
    return list;
};

//获取apiKey
export const getApiByKey = (apiObj,apiKey) => {
    try {
        return apiObj[apiKey[0]][apiKey[1]];
    }
    catch (e) {
        console.error(e);
    }
};


//接收blob数据 下载文件
export const downloadFile = (res) => {
    if(!res.headers){
        return ;
    }
    let disposition = res.headers['content-disposition'];
    let contentType = res.headers['content-type'];
    let filename = disposition && disposition.match(/filename="(.+)"/) && disposition.match(/filename="(.+)"/)[1];
    let blob = new Blob([res.data], { 'contentType': contentType });
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
};

/*
* @params option{
*   searchType:['today','yesterday','toWeek','toMonth','toQuarter']  必传
*   formatType:'YYYY-MM-DD HH:mm:ss' 返回时间格式
*   returnArray:布尔 非必传 是否返回开始时间和结束时间数组 默认为true
* }
* */
export const dateCaculator = ({searchType, formatType = 'YYYY-MM-DD', returnArray = true}) => {
    let date;
    let year = moment().year();
    let month = moment().month();
    let quarter = moment().quarter();
    switch (searchType) {
        case 'today':
            date = [moment().format(formatType), moment().format(formatType)];
            break;
        case 'yesterday':
            date = [moment().day() === 1 ? moment().subtract(3, 'days').format(formatType) : moment().subtract(1, 'days').format(formatType), moment().format(formatType)];
            break;
        case 'toWeek' :
            date = [moment().day('monday').format(formatType), moment().day('saturday').add(1, 'days').format(formatType)];
            break;
        case 'lastWeek' :
            date = [moment().day('monday').subtract(7, 'days').format(formatType), moment().day('saturday').subtract(6, 'days').format(formatType)];
            break;
        case 'toMonth' :
            date = [moment([year, 0, 1]).month(month).format(formatType), moment([year, 0, 31]).month(month).format(formatType)];
            break;
        case 'toYear' :
            date = [moment([year,0,1]).format(formatType), moment([year,11,31]).format(formatType)];
            break;
        case 'lastMonth' :
            date = [moment([year, 0, 1]).month(month).subtract(1, 'month').format(formatType), moment([year, 0, 31]).month(month).subtract(1, 'month').format(formatType)];
            break;
        case 'toQuarter' :
            date = [moment([year, 0, 1]).quarter(quarter).format(formatType), moment([year, 11, 31]).quarter(quarter).format(formatType)];
            break;
        case 'lastQuarter' :
            date = [moment([year, 0, 1]).quarter(quarter).subtract(1, 'quarter').format(formatType), moment([year, 11, 31]).quarter(quarter).subtract(1, 'quarter').format(formatType)];
            break;
        case 'monthCalendar' :
            date = [moment([year, month - 1, 1]).day(0).format(formatType), moment([year, month + 1, 1]).day(0).format(formatType)];
            break;
        default:break;
    }
    return returnArray ? date : date[0];
};

// 获取base64数据
export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};