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
 * @PROJECT_NAME: fyyl
 * @Description: 功能模块
 * @Author: 青稞
 * @QQ: 394684614@qq.com
 * @Date: 2020-12-15 19:33:21
 * @LastEditors: 青稞
 * @LastEditTime: 2020-12-21 07:52:21
 */

let doubleBet = readConfigString("doubleBet"); //双押
let singleDeposit = readConfigString("singleDeposit") //单押
let follow = Number(readConfigString("follow")) //连跟几局
let continuous = Number(readConfigString("continuous")) //几连中
let losingStreak = 0; //连输累加
let demo = readConfigString("demoMode");    //演示模式，不下注
let combat = readConfigString("combatMode"); // 实战模式，下注
// let demoMode = readConfigString("demoMode");//演示模式，不下注
let tid; //线程ID
let combatMode; //下注模式
let debugMode = false; //调试模式打开后，打印调试日志


let stage = 0; // 开局期数
let continuousBetting = 0; //连跟期数
let previousGame = "null"  //上一局出的什么
let pawn = "null"          //下注什么
let winning = 0;           //中奖次数
let notWinning = 0;        //未中奖次数
let tie = 0;               //和的次数
let addUp = 0;             //倍跟累计金额
let total = 0;              //总计金额
let currentAmount = "";     //当前下注金额
let beingExecuted = "开始执行"         //正在执行
let beingExecuted1 = "";         // 正在执行..
let mode                        //演示或实战模式


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
        //开局期数：1，连跟期数：0 ，上局出：虎，本局押：虎
        //双押：20-20
        //单押：1-3-7-16-34-73-153-318-668-1398-2830-5690-11410
        //当前：1-3-7-16-34-73-153-318-668-1398-2830-5690-11410

        // clearLog(-1); //清除日志 要清除的行数，-1 代表全部清除
        // logi("双押:",doubleBet,"运行模式:",mode)
        // sleep(5)
        // logi("开局:",stage,"期","连跟:",continuousBetting,"期","上期:",previousGame,"下注:",pawn,"胜:",winning,"负:",notWinning,"和:",tie);
        // sleep(5)
        // logi("倍跟:",singleDeposit);
        // sleep(5)
        // loge("已跟:",currentAmount);
        // sleep(5)
        // // logw(Time(),beingExecuted,beingExecuted1);
        // logw(Time(),"运行中..");

        setLogText("双押: " + doubleBet + " 模式: " + mode + " 连输: " + follow + " 局需 " + continuous + " 连" + " 累计: " + addUp + " 总计: " + total, "#FFCCCC", 12)
        setLogText("开局: " + stage + " 期 " + "连跟: " + continuousBetting + " 期 " + "上期: " + previousGame + " 下注: " + pawn + " 胜: " + winning + " 负: " + notWinning + " 和: " + tie, "#33FFFF", 12)
        setLogText("倍跟: " + singleDeposit, "#FFFF00", 12)
        setLogText("已跟: " + currentAmount, "#ffffff", 12)
        setLogText(Time() + " 运行中..", "#33FF33", 12)
        sleep(3000);
    }

}

/***
 * 连跟不中后等待 num 连后再下注
 * @param num 数字几连
 * @returns {boolean} num次连中后返回true
 */
function threeConsecutive(num) {
    let threeTimes = 1;
    while (true) {
        let res = trend();
        if (res > 0) {
            testMsg("上局：" + res);
            canIBetAgain();
            let ress = trend();
            testMsg("这局：" + ress);
            if (ress == res) {
                ++threeTimes;
                testMsg("一样累加到 " + threeTimes)
                // }else if(ress == 0){
                //     threeTimes = 0;
                //     testMsg("出和归" + threeTimes)
            } else {
                threeTimes = 1;
                testMsg("不一样归 " + threeTimes)
            }
            // logd(threeTimes + "连")
            if (threeTimes >= num) {
                testMsg("返回时 " + threeTimes)
                // logd(threeTimes + "连 >=" + num + "返回去下注了")
                return true;
            }
            // bettingTime();
            // canIBetAgain();

        } else {
            threeTimes = 1;
            canIBetAgain();
        }

        sleep(100);
    }
}


/***
 * 开局
 */
function start() {
    let resArr = numberOfBets(singleDeposit);
    while (true) {
        beingExecuted = "等待开局"
        let res1 = trend();
        // 等到走势出现并且结果不为和时执行
        if (res1 > 0) {
            for (let s = 0, len = resArr.length; s < len; s++) {
                pawn = "-";
                bettingTime();
                // logd("连负：",losingStreak,"连跟：",follow,"要几连中：",continuous)
                if (losingStreak <= follow) {
                    //losingStreak 连负的计次数
                    //假设 连负3把了，第4把下一次双再没中就不下了
                    betOnBothSides(doubleBet); //双押
                }
                beingExecuted = "双押等待开奖"
                beingExecuted1 = "";
                canIBetAgain(); //可以再次下注可以获取到上局出的什么
                if (losingStreak >= follow) {  //连跟几局不中后等continuous连
                    threeConsecutive(continuous)
                }
                pawn = "-";
                let betAmount = resArr[s];  //下注的金额
                let res = trend(); // 看上局出的什么
                let result; //用于保存中的结果
                switch (res) {  //根据双押结果下注
                    case 0:     //出和，根据上把双押结果下单
                        if (losingStreak >= follow) {
                            result = whetherToWin(resArr[s - 1], res) //三连后出现和金额不加
                        } else {
                            result = whetherToWin(betAmount, res1)
                        }
                        break;
                    case 1:     //出龙下龙 并判断结果
                        result = whetherToWin(betAmount, 1);
                        break;
                    case 2:     //出虎下虎 并判断结果
                        result = whetherToWin(betAmount, 2);
                        break;
                    default:
                        break
                }

                if (result) {    //如果中了，退出for 循环
                    beingExecuted1 = "上期单押胜"
                    currentAmount = "";
                    continuousBetting = 0;
                    addUp = 0;
                    losingStreak = 0;
                    break;
                } else {
                    ++losingStreak;
                }
            }
        }
    }
}

/***
 * 调试模式显示信息
 * @param mg 要显示的信息
 */
function testMsg(mg) {
    if (debugMode) {
        logd(mg);
    }
}

/***
 * 下注看是否中
 * @param sum 下多少金额
 * @param whatSNext 下什么，1:龙， 2虎
 * @returns {boolean} 中：true， 没中：false
 */
function whetherToWin(sum, whatSNext) {
    ++stage;    //开局期数累加
    ++continuousBetting; //连跟期数
    currentAmount = currentAmount + sum + "-";
    addUp = addUp + Number(sum); //倍跟累计金额
    bettingTime();  //是否可以下注
    beingExecuted = "单押下注"
    betAside(sum, whatSNext);   //开始下注
    beingExecuted1 = "等待开奖"
    canIBetAgain();     //调用可以再次下注此时可以获取到上次出的什么
    beingExecuted = "单押开奖结果："
    let p = trend();
    if (p !== -1) { //已经出结果
        if (p === whatSNext) { // 中
            testMsg("中")
            beingExecuted1 = "胜"
            ++winning; //胜累加
            return true;
        } else if (p === 0) { // 和
            testMsg("和")
            beingExecuted1 = "和"
            ++tie;  //和累加
            if (losingStreak >= follow) {
                //如果连负>=设置的连负最大值
                //此时出现和也返回没中
                threeConsecutive(continuous)
                // canIBetAgain();
                let res = trend();
                whetherToWin(sum, res);
            } else {
                whetherToWin(sum, whatSNext);
            }
        } else {
            testMsg("没中")
            beingExecuted1 = "负"
            ++notWinning;   //负累加
            return false;   //没中
        }
    }
}

/***
 * 可以下注后退出，并返回 true
 * @returns {boolean} true
 */
function bettingTime() {
    testMsg("等待可以下注");
    while (true) {
        let p4 = findT(1030, 190, 1170, 240, "qxz.png"); //请下注出现才后执行
        sleep(100)
        if (p4) {
            testMsg("可以下注");
            sleep(1000);
            return true;
        }
        sleep(100);
    }
}

/***
 * 可以再次下注时退出，并返回true
 * @returns {boolean} true
 */
function canIBetAgain() {
    testMsg("等待可以再次下注");
    while (true) {
        let ks = findT(996, 187, 1200, 255, "jjks.png");
        if (ks) {
            let res = bettingTime()
            sleep(100)
            if (res) {
                testMsg("可以再次下注");
                return true;
            }
        }
        sleep(100);
    }
}


/***
 * 处理单押组据 把字符串型检验过滤处理
 * @param nums 单押字符串
 * @returns {*|string[]} 返回处理后的组数
 */
function numberOfBets(nums) {
    //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
    let i = nums.indexOf("-");
    let j = nums.indexOf("—")
    if ((i !== -1) && (j === -1)) {
        let resArr = nums.split("-");
        return resArr;
    } else {
        beingExecuted("单押数据错误[" + nums + "]请重新设置 格式：1-2-3(减号相隔)")
        exit();
    }
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
 * 上局的结果出的是龙、虎、和
 * @returns {number} 0：和，1：龙，2：虎,  -1：没结算
 */
function trend() {
    //查找龙
    let p1 = findT(1410, 790, 1450, 850, "dragon.png");
    if (p1) {
        testMsg("上局出：龙");
        previousGame = "龙"
        return 1;
    }
    //查找虎
    let p2 = findT(1410, 790, 1450, 850, "tiger.png");
    if (p2) {
        testMsg("上局出：虎");
        previousGame = "虎"
        return 2;
    }
    //查找和
    let p3 = findT(1410, 790, 1450, 850, "peace.png");
    if (p3) {
        testMsg("上局出：和");
        previousGame = "和"
        return 0;
    }
    // return -1;
}

/***
 * 根据金额多少下注龙或虎
 * @param num 下多少
 * @param whatToBet 下什么，龙：dragon，虎：tiger
 */
function amountCombination(num, whatToBet) {
    let coin = new MinCoinChange([1, 5, 10, 50, 100, 500]); //可以选择的下注数
    let nums = coin.makeChange(num); // 要下注的数 组合，数组
    testMsg(num + " 下注的最优组全：" + nums);
    total = total + Number(num);
    let dx; //保存龙虎的X坐标
    let dy;//保存龙虎的Y坐标
    if (whatToBet === "dragon") {
        testMsg("下注：龙");
        pawn = "龙"
        dx = 466;
        dy = 520;
    } else if (whatToBet === "tiger") {
        testMsg("下注：虎");
        pawn = "虎"
        dx = 1466;
        dy = 520;
    }

    if (nums) {
        let amountClickedSuccessfully; //金额点击结果
        for (let j = 0, len = nums.length; j < len; j++) {
            let resnum = nums[j]
            // testMsg(resnum);
            switch (resnum) {
                case 1:
                    amountClickedSuccessfully = clickPoint(600, 970);
                    sleep(100)
                    // testMsg("下注：1元");
                    break;
                case 5:
                    amountClickedSuccessfully = clickPoint(800, 970);
                    sleep(100)
                    // testMsg("下注：5元")
                    break;
                case 10:
                    amountClickedSuccessfully = clickPoint(1000, 970);
                    sleep(100)
                    // testMsg("下注：10元")
                    break;
                case 50:
                    amountClickedSuccessfully = clickPoint(1160, 970);
                    sleep(100)
                    // testMsg("下注：50元")
                    break;
                case 100:
                    amountClickedSuccessfully = clickPoint(1350, 970);
                    sleep(100)
                    // testMsg("下注：100元")
                    break;
                case 500:
                    amountClickedSuccessfully = clickPoint(1550, 970);
                    sleep(100)
                    // testMsg("下注：500元")
                    break;
            }

            sleep(100);

            if (amountClickedSuccessfully) {
                testMsg("下注坐标：" + dx + "  " + dy);
                if (combatMode) {
                    let res = clickPoint(dx, dy);
                    sleep(100);
                    // if (res) {
                    //     break;
                    // }
                } else {
                    sleep(100);
                    // break;
                }
            }
        }
    }
}

/***
 * 龙虎双押指定的金额
 * @param sum 龙要押的金额-虎要押的金额 用”-“号相隔 格式20-20
 */
function betOnBothSides(sum) {
    //20-20 分割传进来的值sum
    ++stage;    //开局期数累加
    let sparr = sum.split("-");
    let dragonSum = sparr[0]; //龙押的金额
    let tigerSum = sparr[1];  //虎押的金额
    testMsg("双押龙：" + dragonSum + " 虎：" + tigerSum)
    beingExecuted = "双押龙：" + dragonSum + " 虎：" + tigerSum;
    if (dragonSum != null) {
        betAside(dragonSum, 1)
    } else {
        beingExecuted = "未设置双押的龙";
    }

    if (tigerSum != null) {
        betAside(tigerSum, 2)
    } else {
        beingExecuted = "未设置双押的虎"
    }
    pawn = "龙虎";
}

/***
 * 押龙或者虎
 * @param sum 押多少
 * @param dragonTiger 1代表龙，2代表虎
 */
function betAside(sum, dragonTiger) {
    if (dragonTiger == 1) {
        amountCombination(sum, "dragon");
    } else if (dragonTiger == 2) {
        amountCombination(sum, "tiger");
    }
}

/**
 *  最优下注方案
 * @param array 下注有的数组合
 * @return {arry} 返回最优组合
 */
function MinCoinChange(coins) {

    coins = coins.sort(function (a, b) {
        return b - a;
    });
    this.makeChange = function (amount) {
        let change = [],
            total = 0;
        for (let i = 0; i < coins.length; i++) {
            let coin = coins[i];
            while (total + coin <= amount) {
                change.push(coin);
                total += coin;
            }
        }
        return change;
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


/**
 *
 * 下注龙虎
 * <Br/>
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 4.4 以上
 * @param whatToBet 下什么，int 龙=1，虎=2
 * @return {bool} true 成功 false 失败
 */
function _placeABet(whatToBet) {


    if (whatToBet === 1) {
        while (true) {
            testMsg("下注：龙")
            let res = clickPoint(466, 520);
            if (res) {
                return true;
            }
        }

    } else if (whatToBet === 2) {
        testMsg("下注：虎")
        // clickPoint(1466,520)
        while (true) {
            testMsg("下注：虎")
            let res = clickPoint(1466, 520);
            if (res) {
                return true;
            }
        }
    }


}

/***
 *  押多少金额的排列组合
 * <Br/>
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 4.4 以上
 * @param num 押多少
 * @return {array} 返回金额的组合数组
 ***/
function _amountCombination(num) {


    // 2,5,12,27,57,120,252,490,1040,2100

    let cars = []

    switch (num) {
        case 1:
            cars = [1];
            break;
        case 2:
            cars = [1, 1];
            break;
        case 5:
            cars = [5];
            break;
        case 12:
            cars = [5, 5, 1, 1];
            break;
        case 57:
            cars = [50, 5, 1, 1];
            break;
        case 120:
            cars = [100, 10, 10];
            break;
        case 252:
            cars = [100, 100, 50, 1, 1];
            break;
        case 490:
            cars = [100, 100, 100, 100, 50, 10, 10, 10, 10];
            break;
        case 1040:
            cars = [500, 500, 10, 10, 10, 10];
            break;
        case 2100:
            cars = [500, 500, 500, 500, 100];
            break;
        default:
            testMsg("不存在")
            return;
    }


    return cars;

}
