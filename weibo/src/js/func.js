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
 * @Version: EasyClick 5.15.5 js
 * @PROJECT_NAME: weibo
 * @Description: 功能模块
 * @Author: 青稞
 * @QQ: 394684614@qq.com
 * @Date: 2020-01-07 01:19:21
 * @LastEditors: 青稞
 * @LastEditTime: 2020-01-07 01:19:21
 */















function start(){
    let packageName = 'android.ext.system';
    launch(packageName);

}



/**
 @description 通过包名启动应用。如果该包名对应的应用不存在，则返回false；否则返回true。
 @version     20201125
 @author      飞云<283054503@qq.com>
 @param       packageName {string} :应用包名
 @param       delay {number} :启动后等待时长，单位毫秒。默认5000
 @param       startNum {number} :重试次数。默认3
 @return      {boolean}:返回是否成功
 */
function launch(packageName, delay, startNum) {
    let result = false;
    if (!delay) {
        delay = 5000;
    }
    if (!startNum) {
        startNum = 3;
    }
    if (utils.isAppExist(packageName)) {
        if (getRunningPkg() === packageName) {
            logd('应用已经在前台');
            result = true;
        } else {
            logd('启动应用...');

            let selectors = text('允许');
            let num = 0;
            while (num < startNum) {
                if (getRunningPkg() === packageName) {
                    logi('启动成功');
                    result = true;
                    break;
                } else if (has(selectors)) {
                    let node = selectors.getOneNodeInfo(1000);
                    if (node) {
                        node.click()
                    }
                } else {
                    utils.openApp(packageName);
                    sleep(delay);
                    num++;
                }
            }
        }
    } else {
        loge('应用未安装');
    }
    if (result) {
        logd('应用版本号：' + utils.getAppVersionName(packageName));
    }
    return result;
};









/***
 * 网络验证
 * @param verificationCode 字符串型，要验证的字符串
 */
function networkVerification(verificationCode) {
    let url = "https://tieba.baidu.com/p/1169648866";
    let header = {
        "Host": "tieba.baidu.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.60",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
    };

    let x = http.httpGetDefault(url, 10 * 1000, header);
    if (x != null) {
        if (x.indexOf(verificationCode) !== -1) {
            testMsg("123")
        } else {
            testMsg("000")
            exit();
        }
    } else {
        exit();
    }
}

function msg() {
    while (true) {
        setLogText("双押: " + doubleBet + " 模式: " + mode + " 连输: " + follow + " 局需 " + continuous + " 连" + " 累计: " + addUp + " 总计: " + total, "#FFCCCC", 12)
        setLogText("开局: " + stage + " 期 " + "连跟: " + continuousBetting + " 期 " + "上期: " + previousGame + " 下注: " + pawn + " 胜: " + winning + " 负: " + notWinning + " 和: " + tie, "#33FFFF", 12)
        setLogText("倍跟: " + singleDeposit, "#FFFF00", 12)
        setLogText("已跟: " + currentAmount, "#ffffff", 12)
        setLogText(Time() + " 运行中..", "#33FF33", 12)
        sleep(3000);
    }

}


/***
 * 调试模式显示信息
 * @param mg 要显示的信息
 */
function testMsg(mg) {
    // if (debugMode) {
    //     logd(mg);
    // }
}


/***
 * 范围找图
 * @param x 找图区域 x 起始坐标
 * @param y 找图区域 y 起始坐标
 * @param ex 终点X坐标
 * @param ey 终点Y坐标
 * @param fileName 小图片（模板）文件名
 * @returns {boolean} 找到：true, 未找到：false
 */
function findT(x, y, ex, ey, fileName) {
    let sms = readResAutoImage(fileName);
    let rest = image.findImageEx(sms, x, y, ex, ey, 0.9, 1);
    if (rest != null) {
        testMsg("找到：" + fileName)
        return true;
    } else {
        testMsg("未找到：" + fileName)
        return false;
    }
}


/***
 * 随机倒计时
 * @param timeMin 随机的最小值
 * @param timeMax 随机的最大值
 * @param msg 倒计时提示语 "剩余 " + xxx + " 秒后执行: " + msg
 */
function randomCountdown(timeMin, timeMax, msg) {
    msm ? msm : null
    const result = random(20, 60);
    // for (time; time >= 0; time--) {
    for (let i = result; i > 0; i--) {
        sleep(1000);
        logw(Time() + "剩余 " + i + " 秒后执行: " + msg);
    }
}


