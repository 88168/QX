/**
 * Quantumult X 自动重连/网络打断脚本
 * 触发条件：网络环境切换 (event-network)
 */

const network = $network;
const ipv4 = network.v4;
const ssid = ipv4 ? ipv4.ssid : null;

if (!ipv4 || (!ssid && !ipv4.primaryInterface)) {
    // 此时完全没有网络（既无Wi-Fi也无蜂窝）
    $notify("网络异常", "检测到连接已断开", "请检查路由器或移动数据信号");
    $done({error: "Disconnected"});
} else {
    // 网络存在但可能假死，执行静默打断
    const status = ssid ? `Wi-Fi: ${ssid}` : "蜂窝移动数据";
    console.log(`[网络重连] 当前环境: ${status}，正在优化连接...`);
    
    // 核心逻辑：通过返回空结果或错误码强制 QX 重新建立握手
    $done({});
}