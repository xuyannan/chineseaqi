
中国70多个城市的aqi(空气污染指数)数据。国内监测站数据来自[http://pm25.in]，美国使领馆数据来自[http://www.beijingaqifeed.com/]。

目前只有北京，广州，上海，成都有美国使领馆数据。

返回的数据中，各字段含义参考：[http://pm25.in/api_doc]。

## Installation

```
npm install chineseaqi 
```

## usage

```
var AqiApi = require('chineseaqi');
var token = 'YOUR_TOKEN'; // pm25.in上申请的appkey
var api = new AqiApi(token);

// 获取北京的pm2.5数据
api.getAvgPm25ForCity({
  city: 'beijing',
  callback: function(data) { // success callback
    console.log(data);    
  },
  errorCallback: function(data) { // error callback
  }
});

// 获取北京市美国大使馆的pm2.5数据
api.getLatestUsemPm25ForCity({
  city: 'beijing',
  callback: function(data) {
    console.log(data);
  }
});
```
