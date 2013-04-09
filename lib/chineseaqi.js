var jquery = require('jquery');
var libxmljs = require('libxmljs');
var request = require('request');
var fs = require('fs');

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
  );
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

// 2.0 获取某城市美国大使馆数据
AqiApi.prototype.getUsemPm25ForCity = function(params) {
  var dict = {
    'beijing': {'city': 'beijing', 'name': '北京'},
    '北京': {'city': 'beijing', 'name': '北京'},

    'chengdu': {'city': 'chengdu', 'name': '成都'},
    '成都': {'city': 'chengdu', 'name': '成都'},

    'shanghai': {'city': 'shanghai', 'name': '上海'},
    '上海': {'city': 'shanghai', 'name': '上海'},

    'guangzhou': {'city': 'guangzhou', 'name': '广州'},
    '广州': {'city': 'guangzhou', 'name': '广州'},
  };
  if (!params.city || ! dict[params.city]) {
    return [];
  };
  var aqiArray = [];
  var pm25Array = [];
  var descArray = [];
  var readingDateArray = [];
  var result = [];
  request('http://aqi.cutefool.net/' + dict[params.city].city, function (error, response, body) {
    var xmldata = '';
    if (!error && response.statusCode == 200) {
      
      xmldata += body;
      xmldata = xmldata.replace(/[\u200B-\u200D\uFEFF]/g, '');

      var xmlDoc = libxmljs.parseXml(xmldata);
      var tmp = xmlDoc.find('//Conc|//AQI|//Desc|//ReadingDateTime');
      for (var i = 0, iMax = tmp.length; i < iMax; i++) {
        if (tmp[i].name() == 'Conc') {
          pm25Array.push(tmp[i].text());
          continue;
        }
        if (tmp[i].name() == 'AQI') {
          aqiArray.push(tmp[i].text());
          continue;
        };
        if (tmp[i].name() == 'Desc') {
          descArray.push(tmp[i].text());
          continue;
        };
        if (tmp[i].name() == 'ReadingDateTime') {
          readingDateArray.push(tmp[i].text());
          continue;
        };

      };
      //console.log(pm25Array.length, aqiArray.length);

      for (var i = 0, iMax = pm25Array.length; i < iMax; i ++) {
        var obj = {};
        obj.pm2_5 = pm25Array[i];
        obj.aqi = aqiArray[i];
        obj.time_point = readingDateArray[i];
        obj.quality = descArray[i];
        obj.area = dict[params.city]['name'];
        result.push(obj);
      }
      //console.log(result, result.length);
      if(params.callback && typeof(params.callback) == 'function') {
        params.callback(result);
      }

    } else {
      console.log('get xml error:' , error);
      if(params.errorCallback && typeof(params.errorCallback) == 'function') {
        params.errorCallback([]);
      }
    }
  });

  
}

module.exports = AqiApi;
