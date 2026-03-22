// 修改后的 gold_data.js
if (typeof $response !== "undefined" && $response.body) {
    let body = $response.body;
    try {
        // 如果数据是加密或压缩的，尝试解析
        let obj = JSON.parse(body);
        if (obj.data && obj.data.list) {
            let list = obj.data.list.map(i => 
                `📅 ${i.date} | 收盘:${i.close} | 高:${i.high} | 低:${i.low}`
            ).join('\n');
            $notify("金价历史数据", "提取成功", list);
        }
    } catch (e) {
        console.log("解析失败，可能是数据未解密或格式不符: " + e);
    }
} else {
    console.log("响应体为空，请检查 MITM 是否包含 api.weimili.com");
}
$done({});
