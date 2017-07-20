var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');
Page({
  onLoad: function () {
    var that = this;
    common.request(api.interface.getAreaAjax.url, {}, function (res) {
      console.log(JSON.stringify(res));
      that.setData({
        province: res.data,
        provinceID: res.data[0].id,
        provinceIndex: 0   //省份ID
      });

      common.request(api.interface.getAreaAjax.url, {
        id: res.data[0].id
      }, function (res) {
        that.setData({
          city: res.data,
          cityID: res.data[0].id,
          cityIndex: 0   //城市ID
        });
      });
    });
    //职位初始化
    common.request(api.interface.getPosition.url, {}, function (res) {
      console.log("职位信息：" + JSON.stringify(res));
      that.setData({
        position: res.result,
        positionID: res.result[0].id,
        positionIndex: 0   //省份ID
      });
    });
    //员工分组初始化
    common.request(api.interface.getGroups.url, {}, function (res) {
      console.log("员工分组" + JSON.stringify(res));
      that.setData({
        group: res.result,
        groupID: res.result[0].id,
        groupIndex: 0   //省份ID
      });
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    navHide: true,
    dropdownHide: true,
    showModal: false,
    list: data.navList,

    //工作类型
    type: [{
      id: 1,
      name: "全职"
    }, {
      id: 2,
      name: "兼职"
    }], 
    typeIndex: 0,
    typeID: 1    
  },
  navToggle: function () {
    var navHide = this.data.navHide;
    this.setData({
      navHide: !navHide
    });
  },
  dropdownToggle: function () {
    var dropdownHide = this.data.dropdownHide;
    this.setData({
      dropdownHide: !dropdownHide
    });
  },
  itemToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;

    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }

    this.setData({
      list: list
    });
  },
  bindProvinceChange: function (e) {
    var that = this;
    var val = e.detail.value;   //当前选择的值
    var provinceID = that.data.province[val].id;   //省份ID
    that.setData({
      provinceIndex: val,
      provinceID: provinceID
    });
    common.request(api.interface.getAreaAjax.url,{
      id: provinceID
    },function(res){
        that.setData({
          city: res.data,
          cityID: res.data[0].id,
          cityIndex: 0   //城市ID
        });     
    });
  },
  bindCityChange : function(e){
    var that = this;
    var index = e.detail.value;   //当前选择的值
    var id = that.data.city[index].id;
    that.setData({
      cityIndex: index,
      cityID: id
    })  
  },
  //工种选择
  bindPositionChange : function(e){
    var that = this;
    var index = e.detail.value;   //当前选择的值
    var id = that.data.position[index].id;  
    that.setData({
      positionIndex: index,
      positionID : id
    })    
  },
  // 类型选择
  bindTypeChange : function(e){
    var that = this;
    var index = e.detail.value;   //当前选择的值
    var id = that.data.type[index].id;
    that.setData({
      typeIndex: index,
      typeID: id
    })       
  },
  // 员工分组
  bindGroupChange: function (e) {
    var that = this;
    var index = e.detail.value;   //当前选择的值
    var id = that.data.group[index].id;
    that.setData({
      groupIndex: index,
      groupID: id
    })
  },
  formSubmit : function(e){
    console.log("我进来了！！！！" + JSON.stringify(e));
    var that = this;
    var provinceID = that.data.provinceID;
    var cityID = that.data.cityID;
    var positionID = that.data.positionID;
    var typeID = that.data.typeID;
    var groupID = that.data.groupID;

    common.request(api.interface.step2.url, {
      provice_id: provinceID,
      city_id: cityID,
      position_id: positionID,
      type: typeID,
      group_id: groupID,
    }, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        common.redirect("index_2");
      }); 

    });
  }  
})