[rewrite_local]
^https:\/\/edu\.51itzl\.com\/frontend\/get_data url script-response-body https://raw.githubusercontent.com/lxs1976/Rewriteqqq/main/charge_to_zero.js
                                                    

[mitm]
hostname = edu.51itzl.com
// charge_to_zero_log.js

// 1. 打印原始请求信息
console.log("========== 请求信息 ==========");
console.log("请求URL: " + $request.url);
console.log("请求方法: " + $request.method);
console.log("请求头: " + JSON.stringify($request.headers, null, 2));
console.log("请求体: " + $request.body);

// 2. 打印原始响应信息
console.log("\n========== 原始响应信息 ==========");
console.log("响应状态码: " + $response.statusCode);
console.log("响应头: " + JSON.stringify($response.headers, null, 2));
console.log("原始响应体: " + $response.body);

// 3. 解析并处理数据
var bodyData;
try {
    bodyData = JSON.parse($response.body);
    
    console.log("\n========== 解析后的数据结构 ==========");
    console.log("数据类型: " + (Array.isArray(bodyData) ? "数组" : "对象"));
    console.log("数据内容: " + JSON.stringify(bodyData, null, 2));
    
    // 修改charge字段
    if (Array.isArray(bodyData)) {
        console.log("\n正在处理数组数据...");
        bodyData.forEach((item, index) => {
            if (item && typeof item === 'object') {
                console.log(`修改前 [${index}]: charge=${item.charge}`);
                item.charge = 0;
                console.log(`修改后 [${index}]: charge=${item.charge}`);
            }
        });
    } else if (bodyData && typeof bodyData === 'object') {
        console.log("\n正在处理对象数据...");
        console.log(`修改前: charge=${bodyData.charge}`);
        bodyData.charge = 0;
        console.log(`修改后: charge=${bodyData.charge}`);
    }
    
    console.log("\n========== 最终返回数据 ==========");
    console.log(JSON.stringify(bodyData, null, 2));
    
} catch (e) {
    console.log("\n!!! JSON解析错误: " + e);
    $done({}); // 出错时返回空响应
    return;
}

// 4. 返回修改后的数据
$done({body: JSON.stringify(bodyData)});
