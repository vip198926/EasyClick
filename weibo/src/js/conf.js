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
 * @Description: 初始化功能模块
 * @Author: 青稞
 * @QQ: 394684614@qq.com
 * @Date: 2020-01-07 01:19:21
 * @LastEditors: 青稞
 * @LastEditTime: 2020-01-07 01:19:21
 */


let w = device.getScreenWidth()
let h = device.getScreenHeight()

/**
 * 设置日志窗口
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 5.0 以上
 * @param 日志是否显示行号  ，布尔型 true 是 false 否
 */
function 设置日志窗口(日志是否显示行号) {

    const result = hasFloatViewPermission();
    if (!result) {
        requestFloatViewPermission(10000);
    }

    let m = {
        "x": 0,
        "y": 0,
        // "w": w / 5 * 2.7,
        // "h": h / 3.3,
        "w": 1037,
        "h": 328,
        "textSize": 12,
        // "backgroundColor":"#666699",  //颜色 url:https://www.cnblogs.com/liyuspace/p/8978139.html
        // "backgroundColor": "#00ffff",
        // "backgroundColor": "#00FFFFFF", //#00FFFFFF 透明色
        // "title": "wxJb1.0.1",//是否显示标题
        "showTitle": false
    }
    // clearLog(-1); //清除日志 要清除的行数，-1 代表全部清除
    setLogViewSizeEx(m); //设置浮窗
    showLogWindow(); //展示浮窗


    //打印日志是否展示行号true 代表显示， false 不显示
    if (日志是否显示行号 == true) {
        setFloatDisplayLineNumber(true);
    } else {
        setFloatDisplayLineNumber(false);
    }
}

function 初始化() {
    // toast("初始化运行环境..");

    let mf = {
        "auto_start_service": "否",//开机启动服务 值有 是，否 两种
        "node_service": "不需要",   //是否需要启动节点获取服务 值有 需要，不需要两种
        "proxy_service": "需要", //是否需要启动底层代理服务 值有 需要，不需要两种
        // "running_mode": '代理',   //代理或无障碍
        "log_float_window": "是", //日志悬浮窗展示 值有 是，否 两种
        "ctrl_float_window": "是",//启停控制悬浮窗展示 值有 是，否 两种
        "daemon_service": "是",  // 守护服务 值有 是，否 两种
        "volume_start_tc": "是",  //音量键启停 值有 是，否 两种

    };
    //设置EC的系统参数
    setECSystemConfig(mf);

    // 设置获取节点的模式
    // @param mode 1 是增强型， 2 是快速型，默认是增强型
    // @param fetchInvisibleNode 是否抓取隐藏的元素，默认不抓取
    // @param fetchNotImportantNode 是否抓取不重要的元素
    // @param algorithm 节点查找算法,默认是nsf，分别有 nsf = 节点静态算法，bsf= 广度优先， dsf=深度优先
    setFetchNodeMode(1, true, true, "dsf");
    setGestureActionMode(2);
    for (let i = 0; i < 3; i++) {
        //自动化服务是否正常
        if (isServiceOk()) {
            // logw(Time(),"自动化服务启动成功");
            // return;
        } else {
            let started = startEnv();
            ; //启动自动化服务环境
            logw(Time() + "第" + (i + 1) + "次启动自动化服务结果: " + started);
            toast("第" + (i + 1) + "次启动自动化服务结果: " + started);
            if (isServiceOk()) {
                // logw(Time(),"自动化服务启动成功");
                // return;
            }
        }
    }

    if (!isServiceOk()) {
        loge(Time() + "自动化服务启动失败，无法执行脚本")
        toast("自动化服务启动失败，无法执行脚本")
        exit();
    }
    请求截图权限(true, 0, 10000)
    // toast("初始化完成,开始执行任务..");
}

function Time() {
    //返回当前时间，格式：[07:49:57]
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    var clock = "";
    if (hh < 10) {
        clock += "0";
    }
    clock += '' + hh + ":";
    if (mm < 10) {
        clock += '0';
    }
    clock += mm + ":";

    if (ss < 10) {
        clock += '0';
    }
    clock += ss;
    return ("[" + clock + "]");
}

/**
 * 向系统申请屏幕截图权限，返回是否请求成功。
 * 运行环境: 无限制
 * <Br/>
 * 兼容版本: Android 5.0 以上
 * @param 截图权限 是否请求权限 ，布尔型 true 是 false 否
 * @param 超时 超时时间，单位是毫秒
 * @param 类型 截屏的类型，0 自动选择，1 代表授权模式，2 代表无需权限模式（该模式前提条件：运行模式为代理模式）
 */
function 请求截图权限(截图权限, 类型, 超时) {
    if (截图权限 === true) {
        let request = image.requestScreenCapture(超时, 类型);
        if (request) {
        } else {
            exit();
        }
    }
}

/**
 * 脚本停止事情
 */
setStopCallback(function () {
    // loge(Time() + "脚本已停止运行");
    // thread.cancelThread(tid);
    thread.stopAll()
    toast("停止运行");
    // closeLogWindow();
    // clearLog(-1);
})


/**
 * 节点快速开发函数
 * @param way 节点选择器 字符型
 * @param str 节点属性值 字符型
 * @param timeOut 超时单位 毫秒
 * @returns {boolean} 布尔值 true false
 */
function findNodeK(way, str, timeOut) {
    if (!timeOut) {
        timeOut = 1000
    }
    let result = false
    let object;
    if (way == "text") {
        object = text(str).getOneNodeInfo(timeOut);
    } else if (way == "desc") {
        object = desc(str).getOneNodeInfo(timeOut);
    } else if (way == "id") {
        object = id(str).getOneNodeInfo(timeOut);
    } else if (way == "clz") {
        object = clz(str).getOneNodeInfo(timeOut);
    } else if (way == "pkg") {
        object = pkg(str).getOneNodeInfo(timeOut);
    } else if (way == "textMatch") {
        object = textMatch(str).getOneNodeInfo(timeOut);
    } else if (way == "idMatch") {
        object = idMatch(str).getOneNodeInfo(timeOut);
    } else if (way == "clzMatch") {
        object = clzMatch(str).getOneNodeInfo(timeOut);
    } else if (way == "pkgMatch") {
        object = pkgMatch(str).getOneNodeInfo(timeOut);
    } else if (way == "descMatch") {
        object = descMatch(str).getOneNodeInfo(timeOut);
    } else {
        loge("Error:findNodek-way参数不正确")
    }
    if (object != null) {
        logd(object)
        result = object
    }
    return result;
}

/* 使用方法1 查找方式
if (findNodeK("textMatch",".*微信.*")){
    logd("111")
    //  判断是否查找到
}

// 使用方法2 点击方式
findNodeK("textMatch",".*微信.*").click()
*/

