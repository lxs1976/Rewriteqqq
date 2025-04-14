/**
 * @fileoverview 通用HTTP请求模板，强制设置返回JSON中的charge=0
 */

const url = `https://edu.51itzl.com/frontend/get_data`;
const method = `POST`;
const headers = {
    'Accept': `*/*`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Connection': `keep-alive`,
    'Content-Type': `application/json`,
    'Host': `edu.51itzl.com`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 15_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0 (Immersed/44) uni-app`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`
};

// 保持原始请求体不变（不硬编码，直接透传）
const body = $request.body || `{}`;  // 如果$request不存在，默认空对象

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    try {
        let data = JSON.parse(response.body);
        
        // 递归遍历对象/数组，将所有charge字段设为0
        const setChargeToZero = (obj) => {
            if (Array.isArray(obj)) {
                return obj.map(item => setChargeToZero(item));
            } else if (obj && typeof obj === 'object') {
                const newObj = {};
                for (const key in obj) {
                    if (key === 'charge') {
                        newObj[key] = 0; // 强制charge=0
                    } else {
                        newObj[key] = setChargeToZero(obj[key]); // 递归处理嵌套对象
                    }
                }
                return newObj;
            }
            return obj;
        };
        
        const modifiedData = setChargeToZero(data);
        
        // 返回修改后的数据
        console.log(`Status: ${response.statusCode}\nModified Body:\n${JSON.stringify(modifiedData, null, 2)}`);
        $done({
            status: response.statusCode,
            headers: response.headers,
            body: JSON.stringify(modifiedData)
        });
    } catch (e) {
        console.log(`JSON解析失败: ${e}\n原始响应:\n${response.body}`);
        $done(response); // 解析失败时返回原始响应
    }
}, reason => {
    console.log(`请求失败: ${reason.error}`);
    $done();
});
