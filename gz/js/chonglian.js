/**
 * Quantumult X 假死重连脚本
 * 逻辑：发起一个轻量级请求测试网络，若失败则触发策略重置
 */

const testUrl = "http://www.apple.com/generate_204";
const timeout = 3000; // 3秒超时判定为假死

$task.fetch({ url: testUrl, timeout: timeout }).then(
    response => {
        // 网络正常
        console.log("网络连接正常 (HTTP 204)");
        $done({});
    },
    reason => {
        // 网络假死或无法连接
        $notify("网络重连预警", "检测到连接假死", "正在执行打断并强制重置...");
        console.log("网络探测失败: " + reason.error);
        
        // 执行“假关停”：通过返回错误强迫 QX 重新握手
        // 配合 event-network 触发时效果更佳
        $done({ error: "Force reconnecting due to hang..." });
    }
);
