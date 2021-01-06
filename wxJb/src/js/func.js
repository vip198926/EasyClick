/**
 *                     .::::.
 *                   .::::::::.
 *                  :::::::::::    佛主保佑、永无Bug
 *              ..:::::::::::'
 *            '::::::::::::'
 *              .::::::::::
 *         '::::::::::::::..
 *              ..::::::::::::.
 *            ``::::::::::::::::
 *             ::::``:::::::::'        .:::.
 *            ::::'   ':::::'       .::::::::.
 *          .::::'      ::::     .:::::::'::::.
 *         .:::'       :::::  .:::::::::' ':::::.
 *        .::'        :::::.:::::::::'      ':::::.
 *       .::'         ::::::::::::::'         ``::::.
 *   ...:::           ::::::::::::'              ``::.
 *  ```` ':.          ':::::::::'                  ::::..
 *                     '.:::::'                    ':'````..
 **************************************************************************
 * Created with IntelliJ IDEA.
 * @Version: EasyClick 5.13.0 js
 * @PROJECT_NAME: wxJb
 * @Description: 初始化功能模块
 * @Author: 青稞
 * @QQ: 394684614@qq.com
 * @Date: 2020-12-10 19:33:21
 * @LastEditors: 青稞
 * @LastEditTime: 2020-12-21 08:49:21
 */



/**
 * 视一视评测
 */
function 评测() {

    logi(Time() + "执行评测,请前往评测页");
    let n = 0;
    let i = 0;
    let m = 0;

    while(true) {
        m++;
        if (m > 50){
            back();
            m = 0;
        }

        sleep(1000);
        if (click(id("com.tencent.mm:id/fkw"))){
            sleep(1000);
        }

        const djzl = text("点击这里,开始评测").getOneNodeInfo(100);
        if (djzl) {
            if (djzl.bounds) {
                clickBds(djzl.bounds)
                logi(Time() + "打开评测");
                sleep(2000);
            }
        }

        // if (clickBounds(text,"点击这里,开始评测")){
        //     logi(Time() + "打开评测");
        //     sleep(5000);
        // }

        if(longClick(text("开始测试"))) {
            logi(Time() + "开始评测..");
            sleep(5000);
        }

        const 评测选项 = clz("android.widget.Button").index(2).depth(20);
        if (has(评测选项)){
            while(true) {

                if (i > 9){
                    swipeToPoint(888,1288,888,1088,200);
                    sleep(1000);
                    swipeToPoint(888,1088,888,1288,200);
                    i = 6;
                }else {
                    const result = click(评测选项);
                    if (result){
                        logi(Time() + "Click选项");
                        i++
                        // logd("i: "+i);
                    }
                }

                sleep(1000);
                const 评测结果 = text("获取测评结果");
                // const 评测结果 =text("获取测评结果1").getOneNodeInfo(1000)
                if (has(评测结果)){
                    click(评测选项);
                    sleep(1000);
                    // clickText("获取测评结果");
                    click(评测结果);
                    sleep(2000);
                    if(看广告()){
                        n ++;
                        logi(Time() + "完成评测","已完成：" + n + " 次");
                        sleep(random(3000,5000));
                        back();
                        // back();
                        i = 0;
                        随机倒计时(20,60,"评测");
                        break;
                    }
                }
            }
        }

    }
}
/**
 * 视一视视频
 */
function 视频() {
    logi(Time() + "执行视频,请前往视频页");
    let n = 0;
    let m = 0;

    while(true){

        m++;
        if (m > 50){
            back();
            m = 0;
        }
        sleep(1000);
        let x = clz("android.widget.ImageView").depth(16).index(0); //弹窗广告X

        if (click(x)){
            sleep(1000);
            // back();
        }

        let s = textMatch(".*点击播放.*");
        if (click(s)){
            logi(Time()+"播放视频");
            sleep("5000");
        }else if(text("点这里看一段广告查看完整视频")) {
            if(clickText("点这里看一段广告查看完整视频")){
                sleep(2000);
                if(看广告()){
                    n ++;
                    logi(Time() + "完成视频","已完成：" + n + " 次");
                    sleep(random(2000,5000));
                    m = 0;
                    back();
                    随机倒计时(20,60,"视频");
                }
            }

        }

    }


}
/**
 * 打卡小程序
 */
function checkInApplet() {
    logi(Time() + "执行打卡，请前往小程序主页");
    let n = 0;
    let m = 0;
    while (true){

        m++;
        if (m > 50){
            back();
            m = 0;
        }

        sleep(1000);

        if(clickText("确定")){
            sleep(1000);
            n++;
            logi(Time() + "完成打卡","已完成：" + n + " 次");
            随机倒计时(20,60,"视频");
        }

        const clickToCheckIn = text("点击打卡").getOneNodeInfo(1000);
        if (clickToCheckIn){
            if(clickToCheckIn.parent().bounds){
                clickBds(clickToCheckIn.bounds)
                sleep(2000);
                if(看广告()){
                    sleep(random(2000,5000));
                    m = 0;
                    // back();
                }
            }
        }

        // if (clickText("点击打卡")) {
        //     sleep(2000);
        //     if(看广告()){
        //         sleep(random(2000,5000));
        //         m = 0;
        //         // back();
        //     }
        // }

        const sx = textMatch(".*打卡已达到上限.*");
        if (has(sx)){
            logi(Time() + "今日打卡已达到上限,明日再来!");
            sleep(5000);
            back();
            home();
        }
    }



}

/**
 * 影视小程序
 */
function videoApplet() {

    // loge("该功能待完善");
    // sleep(10000);
    // return;

    logi(Time()+"执行影视","请前往小程序主页");
    let 是否点击 = true;
    let n = 0;
    while(true) {
        //关闭弹窗广告
        let tcx = clz("android.widget.ImageView").depth(16).index(0).getOneNodeInfo(100);
        if (tcx) {
            if (tcx.bounds) {
                clickBds(tcx.bounds)
                sleep(1000);
                logd("0")
            }
        }

        // 点击连续剧节点的坐标
        let lxj = text("连续剧").getOneNodeInfo(100);
        if (是否点击){
            if (lxj) {
                if (lxj.bounds) {
                    clickBds(lxj.bounds);
                    logi(Time() + "选择连续-剧");
                    sleep(2000);
                    clickPoint(566,888);
                    logi(Time() + "开始追集");
                    sleep(20000);
                    是否点击 = false;
                }
            }
        }

        // 获取影片数量数组随机取一个打开
        // let yparr = clz("android.view.View").depth(27).index(0).getNodeInfo(100);
        // if(yparr.length > 0){
        //     let ypsl =random(0,yparr.length); //随机选一个影片
        //     logd(yparr)
        //     if (yparr) {
        //         if (yparr.bounds) {
        //             clickBds(yparr.bounds);
        //             logi(Time() + "开始追集");
        //             sleep(5000);
        //         }
        //     }
        // let res = yparr[ypsl].click();
        // if (res){
        //     logi(Time()+"开始追集");
        //     sleep(5000);

        if (clickText("确定")) {
            sleep(2000);
            if (看广告()) {
                n++;
                logi(Time() + "完成广告", "已完成：" + n + " 次");
                sleep(random(3000, 5000));
                随机倒计时(120, 300, "追集");
            }
        }

        // 获取连接剧集数数组随机打开一个
        let jsarr = clz("android.widget.Button").depth(19).index(0).getNodeInfo(100);
        if (jsarr.length > 0) {
            let sz = random(0, jsarr.length); //随机选一集
            jsarr[sz].click();
            sleep(10000);
            // for(let j = 0,len=jsarr.length; j < len; j++) {
            //     sleep(2000);
            //     jsarr[j].click();
            // }
        }
    }
}



function 看广告() {
    logi(Time() + "观看广告");



    while(true){
        sleep(5000);
        logi(Time() + "等待广告结束");
        if (has(text("已获得奖励"))){
            sleep(1000);
            if (clickBounds(text,"关闭")){
                logi(Time() + "广告结束");
                sleep(1000);
                return true;
            }
        }else if (has(text("已完成浏览"))){
            swipeToPoint(888,1188,888,688,200);
            sleep(1000)
            click(id("com.tencent.mm:id/fkw"));
            logi(Time() + "广告结束");
            sleep(1000);
            return true;
        }

    }
}


/**
 * 随机点击选择器节点
 * @param 选择器 节点选择器
 * @param 属性值 字符串 对应节点的值
 * @return 布尔值 成功点击返回 true , 点击失败或节点不存在返回 false
 */

function clickBounds(选择器,属性值) {
    let node = 选择器(属性值);
    if (has(node)){
        let result = getNodeAttrs(node, "bounds");
        // logi(Time() + result);
        result =JSON.parse(result);
        const leftX = result["left"];
        const rightX = result["right"];
        const resultY = result["top"];
        const bottomY = result["bottom"];
        // logi(Time() + leftX);
        // logi(Time() + rightX);
        // logi(Time() + resultY);
        // logi(Time() + bottomY);
        const x = ((rightX - leftX ) / 2 + leftX);
        const y = ((bottomY - resultY ) / 2 + resultY);
        // logi(Time() + "x:" + x,"y:" + y);
        const res = clickPoint(x, y);
        if (res){
            logd(Time() + "Click True",x,y);
            return true;
        } else {
            logw(Time() + "Click False",x,y);
            logw(Time() + "请以代理模式运行");
            return false;
        }
    }

    return false;
}

function clickBds(/* arr */ arr) {
    let x = random(arr.left, arr.right);
    let y = random(arr.top, arr.bottom);
    const res = clickPoint(x, y);
    if (res){
        logd(Time() + "Click True",x,y);
        return true;
    } else {
        logw(Time() + "Click False",x,y);
        logw(Time() + "请以代理模式运行");
        return false;
    }
}

function 随机倒计时(timeMin,timeMax,msm) {
    msm ? msm : null
    const result = random(20, 60);
    // for (time; time >= 0; time--) {
    for (let i = result;i > 0 ;i--){
        sleep(1000);
        logw(Time() + "剩余 " + i + " 秒后执行: " + msm);
    }
}