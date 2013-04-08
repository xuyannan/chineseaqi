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

// 1.0、得到所有有数据的城市
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

// 1.1、获取某个城市的pm2.5数据
AqiApi.prototype.getPm25ForCity = function(params) {
  if (!params.city) {
    return;
  }
  var self = this;
  var url = 'http://pm25.in/api/querys/pm2_5.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback,
    errorCallback: params.errorCallback
  });

};

// 1.1.1获取一个城市最新的pm2.5平均值
AqiApi.prototype.getAvgPm25ForCity = function(params) {
  if (!params.city) {
    return;
  }
  var self = this;
  self.getPm25ForCity({
    city: params.city, 
    callback: function(data){
      if (data && data.constructor.name == 'Array') {
        params.callback(data[data.length - 1]);
      } else {
        console.log('getAvgPm25ForCity error');
      }
    },
    errorCallback: function(data) {
      params.errorCallback(data);
    }
  });
};

// 1.2、获取一个城市所有监测点的PM10数据
AqiApi.prototype.getPm10ForCity = function(params) {
  if (!params.city) {
    return;
  }
  var self = this;
  var url = 'http://pm25.in/api/querys/pm10.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.2.1、获取一个城市最新的pm10平均值
AqiApi.prototype.getAvgPm10ForCity = function(params) {
  if (!params.city) {
    return;
  }
  var self = this;
  self.getPm10ForCity(
    {
      city:params.city, 
      callback: function(data){
        if (data && data.constructor.name == 'Array') {
          params.callback(data[data.length - 1]);
        }
      },
      errorCallback: function(data) {
        console.log('getAvgPm10ForCity error');
      }
    }
  });
};

// 1.3、获取一个城市所有监测点的CO数据
AqiApi.prototype.getCoForCity = function(params) {
  if (!params.city) {return ;};
  var self = this;
  var url = 'http://pm25.in/api/querys/co.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.4、获取一个城市所有监测点的NO2数据
AqiApi.prototype.getNo2ForCity = function(params) {
  if (!params.city) {return ;};
  var self = this;
  var url = 'http://pm25.in/api/querys/no2.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.5、获取一个城市所有监测点的SO2数据
AqiApi.prototype.getSo2ForCity = function(params) {
  if (!params.city) {return ;};
  var self = this;
  var url = 'http://pm25.in/api/querys/so2.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.6、获取一个城市所有监测点的O3数据
AqiApi.prototype.getSo2ForCity = function(params) {
  if (!params.city) {return ;};
  var self = this;
  var url = 'http://pm25.in/api/querys/o3.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.7、获取一个城市所有监测点的AQI数据。params.details:包含详情
AqiApi.prototype.getAqiForCity = function(params) {
  if (!params.city) {return ;};
  var self = this;
  var url = params.detailes? 'http://pm25.in/api/querys/aqi_details.json': 'http://pm25.in/api/querys/only_aqi.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.8、获取一个监测点的AQI数据(含详情)
AqiApi.prototype.getAqiOfStation = function(params) {
  if (!params.station_code) {return ;};
  var self = this;
  var url = 'http://pm25.in/api/querys/aqis_by_station.json';
  var data = {token: self.token, station_code: params.station_code};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.9、获取一个城市的监测点列表
AqiApi.prototype.getStationsOfCity = function(params) {
  if (!params.city) {return ;};
  var self = this;
  var url = 'http://pm25.in/api/querys/station_names.json';
  var data = {token: self.token, city: params.city};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

// 1.10、获取所有城市的空气质量详细数据
AqiApi.prototype.getAqiForAllCity = function(params) {
  var self = this;
  var url = 'http://pm25.in/api/querys/all_cities.json';
  var data = {};
  commonReqest({
    url: url,
    data: data,
    callback: params.callback
  });
};

module.exports = AqiApi;
