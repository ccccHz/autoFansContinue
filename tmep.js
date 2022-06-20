//超级小桀直播间送一个赞
fetch("https://www.douyu.com/japi/gift/donate/mainsite/v3", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.douyu.com/6437338",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "giftId=20006&giftCount=1&roomId=6437338&bizExt=%7B%22isMainGift%22%3A1%7D&skinId=12",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
}).then(response=>{console.log("success :",response.json())}).catch(err=>{console.log("request error:",err)})


fetch("https://dotcounter.douyucdn.cn/deliver/fish2", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
    },
    "referrer": "https://www.douyu.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "multi=%5B%7B%22d%22%3A%22ba790912326be5f90e7ddb8b00081601%22%2C%22i%22%3A%2223889556%22%2C%22rid%22%3A74751%2C%22u%22%3A%22%2Ftopic%2Fzjxcfl%22%2C%22ru%22%3A%22%2Ftopic%2Fxcdzz%22%2C%22ac%22%3A%22show_gift_sendsucc%22%2C%22rpc%22%3A%22page_studio_normal%22%2C%22pc%22%3A%22page_studio_webm%22%2C%22pt%22%3A1643521571542%2C%22oct%22%3A1643523676816%2C%22dur%22%3A0%2C%22pro%22%3A%22host_site%22%2C%22ct%22%3A%22web%22%2C%22e%22%3A%7B%22gfid%22%3A20006%2C%22yc%22%3A10%2C%22src_type%22%3A2%2C%22rac%22%3A%22click_gift_send%22%2C%22fps%22%3A-1%2C%22ver%22%3A%223b378b19fc1467c871bc20a5d41e43447a91f2ee%22%2C%22dzh_type%22%3A2%2C%22zhtname%22%3A%22zjxcfl%22%2C%22zt_id%22%3A28529%2C%22dv%22%3A2%7D%2C%22av%22%3A%22%22%2C%22up%22%3A%22%22%7D%5D&v=1.5",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
});