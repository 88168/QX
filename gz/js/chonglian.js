/**
 * 提取金价历史数据脚本
 * 匹配链接: ^https?:\/\/api\.weimili\.com\/api\/v1\/goods\/get_history
 */

if ($response.body) {
    let obj = JSON.parse($response.body);
    if (obj.data && obj.data.list) {
        let history = obj.data.list.slice(0, 5); // 取最近5天
        let message = history.map(item => {
            return `📅 ${item.date}\n💰 收盘: ${item.close} | 涨跌: ${item.change_amount}\n📈 高: ${item.high} | 低: ${item.low}`;
        }).join('\n' + '-'.repeat(20) + '\n');
        
        $notify("今日金价历史数据", "最新行情提取成功", message);
    }
}
$done({});
