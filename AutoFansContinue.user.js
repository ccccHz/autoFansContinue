// ==UserScript==
// @name         斗鱼每日自动保底续荧光棒
// @namespace    https://github.com/ccccHz/autoFansContinue
// @version      0.123
// @description  斗鱼荧光棒每日保底赠送。每个直播间每天送一个荧光棒
// @supportURL   https://github.com/ccccHz/autoFansContinue/issues
// @author       czh
// @match        https://*.douyu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        GM_notification
// ==/UserScript==

(function () {
    "use strict";
    // ref: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/FansContinue/FansContinue.js

    // 策略
    // 每个直播间送1个保底
    // 12306 送全部剩余
    var sendNum = 1;
    var allRid = 12306;
    // 12306 送剩余全部荧光棒

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function FansContinue() {
        fetch("https://www.douyu.com/member/cp/getFansBadgeList", {
            method: "GET",
            mode: "no-cors",
            cache: "default",
            credentials: "include",
        })
            .then((res) => {
                return res.text();
            })
            .then(async (doc) => {
                doc = new DOMParser().parseFromString(doc, "text/html");
                let a =
                    doc.getElementsByClassName("fans-badge-list")[0].lastElementChild;
                let n = a.children.length;
                for (let i = 0; i < n; i++) {
                    let rid = a.children[i].getAttribute("data-fans-room"); // 获取房间号
                    await sleep(250).then(() => {
                        sendGift_bag(268, Number(sendNum), rid)
                            .then((data) => {
                                if (data.msg === "success") {
                                    // showMessage("【续牌】" + rid + "赠送荧光棒成功", "success");
                                    console.log("chz_sript", rid + "赠送一根荧光棒成功");
                                } else {
                                    // showMessage("【续牌】" + rid + "赠送失败 " + data.msg, "error");
                                    console.log("chz_sript", rid + "赠送失败");
                                    console.log("chz_sript", rid, data);
                                }
                            })
                            .catch((err) => {
                                //   showMessage("【续牌】" + rid + "赠送失败", "error");
                                console.log("chz_sript", rid, err);
                            });
                    });
                }
                await sleep(250).then(()=>{
                    sendAllToOne(allRid);
                })
            })
            .catch((err) => {
                console.log("chz_sript", "请求失败!", err);
            });
    }

    function sendGift_bag(gid, count, rid) {
        // 送背包里的东西
        // gid: 268是荧光棒
        // count: 数量
        // rid: 房间号
        return fetch("https://www.douyu.com/japi/prop/donate/mainsite/v1", {
            method: "POST",
            mode: "no-cors",
            credentials: "include",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body:
                "propId=" +
                gid +
                "&propCount=" +
                count +
                "&roomId=" +
                rid +
                "&bizExt=%7B%22yzxq%22%3A%7B%7D%7D",
        }).then((res) => {
            return res.json();
        });
    }

    // 获取背包礼物信息
    function getBagGifts() {
        return fetch(
            "https://www.douyu.com/japi/prop/backpack/web/v1?rid=9373171"
        ).then((res) => res.json());
    }
    // 剩余荧光棒全送给某个直播间
    function sendAllToOne(rid) {
        getBagGifts()
            .then((data) => {
                let giftsList = data.data.list;
                for(let k=0;k<giftsList.length;k++){
                    if ((giftsList[k].id = 268)) {
                        sendGift_bag(giftsList[k].id, giftsList[k].count, rid)
                            .then((data) => {
                                if (data.msg === "success") {
                                    console.log("chz_sript", rid + "赠送剩余全部荧光棒成功");
                                } else {
                                    console.log("chz_sript", rid + "赠送剩余全部失败");
                                    console.log("chz_sript", rid, data);
                                }
                            })
                            .catch((err) => {
                                console.log("chz_sript", rid, err);
                            });
                    }}
                console.log("chz_sript", "背包内没有荧光棒，执行赠送全部剩余失败")
            })
            .catch((err) => {
                console.log("chz_sript", "查询背包礼物失败", err);
            });
    }

    // date 年月日相同
    function checkDateEquals(a, b) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    function main(ifdebug) {
        const CHECKED_DATE = "checkedDate";
        console.log("测试环境");
        console.log("chz_sript", "start!");
        var today = new Date();
        // 默认 2006-1-1
        var lastCheckedDay = new Date(
            GM_getValue(CHECKED_DATE, new Date("2000-1-1"))
        );
        // 上次执行方法日期不是今天，则执行
        if (!checkDateEquals(lastCheckedDay, today)) {
            FansContinue();
            // 执行完毕，修改最后一次执行脚本的时间
            GM_setValue(CHECKED_DATE, new Date());
        } else {
            console.log("chz_sript", "今天已经执行过");
        }
        // 测试使用
        if (ifdebug === true) {
            unsafeWindow.GM_setValue = GM_setValue;
            unsafeWindow.GM_getValue = GM_getValue;
            unsafeWindow.GM_notification = GM_notification;
        }
    }
    main(true);
})();
