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
 * @Description: main函数
 * @Author: 青稞
 * @QQ: 394684614@qq.com
 * @Date: 2020-12-10 19:33:21
 * @LastEditors: 青稞
 * @LastEditTime: 2020-12-21 08:48:21
 */



//=========================调试区开始====================================
// 设置日志窗口(false);
// exit();
//=========================调试区结束====================================





function sata() {
    初始化();
    设置日志窗口(false);

    sleep(2000)
    if (config.评测 === 'true') {
        评测();
        exit();
    }

    if (config.视频 === 'true') {
        // logi("该功能待完善");
        视频();
        exit();
    }

    if (config.打卡小程序 === 'true') {
        checkInApplet();
        exit();
    }

    if (config.影视小程序 === 'true') {
        videoApplet();
        exit();
    }

}

sata();
