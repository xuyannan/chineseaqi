中国70多个城市的aqi(空气污染指数)数据以及天气数据。

关于PM2.5数据：

国内监测站数据来自[pm25.in](http://pm25.in)，美国使领馆数据来自[beijingaqifeed](http://www.beijingaqifeed.com/)。

目前只有北京，广州，上海，成都有美国使领馆数据。

返回的数据中，各字段含义参考[API文档](http://pm25.in/api_doc)。

关于天气数据：

数据来自[中国天气](http://www.weather.com.cn)

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

// 获取北京市天气数据
aqi.getWeatherForCity({
  city: 'beijing',
  level: 'week', // or 'current' or 'today'
  callback: function(data) {
    console.log(data.weatherinfo);
  }
});

```
