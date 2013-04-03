
中国70多个城市的aqi数据。数据来自[http://pm25.in]

## Installation

```
npm install chineseaqi 
```

## usage

```
var AqiApi = require('chineseaqi');
var token = 'YOU_TOKEN'; // pm25.in上申请的appkey
var api = new AqiApi(token);
api.getAvgPm25ForCity('beijing',
  function(data) { // success callback
    console.log(data);    
  },
  function(data) { // error callback
  }
);
```
