/**
 * 今日金价行情 - 历史数据精准提取 (增强版)
 * 匹配链接: ^https?:\/\/api\.weimili\.com\/api\/v1\/goods\/get_history
 */

if (typeof $response !== "undefined") {
    let body = $response.body;
    
    // 如果响应体是 Uint8Array (二进制/压缩)，尝试转换为字符串
    if (body instanceof Uint8Array) {
        body = new TextDecoder("utf-8").decode(body);
    }

    if (body && body.length > 0) {
        try {
            let obj = JSON.parse(body);
            if (obj.data && obj.data.list) {
                // 只取最近 7 天，方便通知显示
                let list = obj.data.list.slice(0, 7).map(i => 
                    `📅 ${i.date}\n收盘: ${i.close} | 高: ${i.high} | 低: ${i.low} | 额: ${i.change_amount}`
                ).join('\n' + '-'.repeat(15) + '\n');
                
                $notify("💰 金价历史行情提取", "近7日数据明细", list);
                console.log("数据提取成功，共 " + obj.data.list.length + " 条记录");
            } else {
                console.log("JSON 结构不符合预期，请检查抓包内容");
            }
        } catch (e) {
            console.log("解析失败，数据可能仍被加密或压缩: " + e);
        }
    } else {
        console.log("⚠️ 响应体确实为空。建议：彻底杀掉微信进程后重试。");
    }
}
$done({});
