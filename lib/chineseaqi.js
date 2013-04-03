var jquery = require('jquery');

var AqiApi = function(token) {
  this.token = token;
  this.cities = undefined; 
  /*
  this.getSupportCities(function(data) {
    this.cities = data.cities;
    console.log(this.cities);
  });
  */
};

// 通用请求方法
var commonReqest = function(params) {
  jquery.getJSON(params.url,
    params.data,
    function(obj) {
      if (obj.error) {
        console.log(obj.error);
        if (params.errorCallback && typeof(params.errorCallback) == 'function') {
            params.errorCallback(obj);
        }
      }else if (params.callback && typeof(params.callback) == 'function') {
        params.callback(obj);
      };
    }
  );
};

AqiApi.prototype.init = function(token) {
  this.token = token;
};

AqiApi.prototype.isSupported = function(city) {
  var self = this;
  console.log(self.cities);
  return jquery.inArray(city, self.cities) >= 0;
}

// 得到所有有数据的城市
AqiApi.prototype.getSupportCities = function(callback) {
  var self = this;
  var url = 'http://pm25.in/api/querys.json';
  var data = {token: self.token};
  commonReqest({
    url: url,
    data: data,
    callback: callback
  });
};

// 获取某个城市的pm2.5数据
AqiApi.prototype.getPm25ForCity = function(city, callback, errorCallback) {
  if (!city) {
    return;
  }
  var self = this;
  var url = 'http://pm25.in/api/querys/pm2_5.json';
  var data = {token: self.token, city: city};
  commonReqest({
    url: url,
    data: data,
    callback: callback,
    errorCallback: errorCallback
  });

};

// 获取一个城市最新的pm2.5平均值
AqiApi.prototype.getAvgPm25ForCity = function(city, callback, errorCallback) {
  if (!city) {
    return;
  }
  var self = this;
  self.getPm25ForCity(city, 
    function(data){
      if (data && data.constructor.name == 'Array') {
        callback(data[data.length - 1]);
      } else {
        console.log('getAvgPm25ForCity error');
      }
    },
    function(data) {
      errorCallback(data);
    }
  );
};

// 获取一个城市所有监测点的PM10数据
AqiApi.prototype.getPm10ForCity = function(city, callback) {
  if (!city) {
    return;
  }
  var self = this;
  var url = 'http://pm25.in/api/querys/pm10.json';
  var data = {token: self.token, city: city};
  commonReqest({
    url: url,
    data: data,
    callback: callback
  });
};

// 获取一个城市最新的pm10平均值
AqiApi.prototype.getAvgPm10ForCity = function(city, callback) {
  if (!city) {
    return;
  }
  var self = this;
  self.getPm10ForCity(city, function(data){
    if (data && data.constructor.name == 'Array') {
      callback(data[data.length - 1]);
    } else {
      console.log('getAvgPm10ForCity error');
    }
  });
};

module.exports = AqiApi;
