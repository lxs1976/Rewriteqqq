[rewrite_local]
^https:\/\/edu\.51itzl\.com\/frontend\/get_data url script-response-body https://raw.githubusercontent.com/lxs1976/Rewriteqqq/main/charge_to_zero.js
                                                    

[mitm]
hostname = edu.51itzl.com
// charge_to_zero.js
var bodyData = JSON.parse($response.body);
var requestBody = JSON.parse($request.body);

// 只有当请求体包含 type=JavaScript 时才修改
if (requestBody.type === "JavaScript") {
    if (Array.isArray(bodyData)) {
        bodyData.forEach(item => { item.charge = 0; });
    } else if (bodyData && typeof bodyData === 'object') {
        bodyData.charge = 0;
    }
}

$done({body: JSON.stringify(bodyData)});
