[rewrite_local]
^https:\/\/edu\.51itzl\.com\/frontend\/get_data url script-response-body charge_to_zero.js

[mitm]
hostname = edu.51itzl.com
// charge_to_zero.js
var bodyData = JSON.parse($response.body);

// 如果是数组，遍历每个对象并设置 charge=0
if (Array.isArray(bodyData)) {
    bodyData.forEach(item => {
        if (item && typeof item === 'object') {
            item.charge = 0;
        }
    });
} 
// 如果是单个对象，直接设置 charge=0
else if (bodyData && typeof bodyData === 'object') {
    bodyData.charge = 0;
}

$done({body: JSON.stringify(bodyData)});
