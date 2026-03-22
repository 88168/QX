// 在开头增加判断，确保 $response 和 $response.body 存在
if (typeof $response !== "undefined" && $response.body) {
    try {
        let obj = JSON.parse($response.body);
        // ... 你的逻辑 ...
    } catch (e) {
        console.log("JSON解析失败: " + e);
    }
} else {
    console.log("响应体为空，跳过处理");
}
$done({}); // 务必保留 $done
