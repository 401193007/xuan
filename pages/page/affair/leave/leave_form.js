var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');

/*
  * 公共判断
  * @condition 判断条件
  * @tips 错误提示
  * @context 执行上下文
  */
function judge(condition, tips, context) {
  if (condition) {
    wx.showToast({
      title: tips,
      icon: 'success',
      image: '',
      duration: 2000
    })
    // common.isError(tips, context);
    return false;
  } else {
    // wx.showToast({
    //   title: tips,
    //   icon: 'success',
    //   image: '',
    //   duration: 2000
    // })     
    // common.clearError(context);
    return true;
  }
}

Page({
  onLoad: function () {
    var that = this;
    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      that.setData({
        staffName: result.name,
      });
    });

    common.request(api.interface.leavetype.url, {}, function (res) {
      console.log("请假类型：" + JSON.stringify(res));
      var result = res.result;
      var arr = [];
      for(var i in result){
        var obj = {};
        console.log(i + ":" + result[i]);
        obj.id = i;
        obj.text = result[i];
        arr.push(obj);
      }
      that.setData({
        leavetype: arr,
        leavetypeID: arr[0].id,
        leavetypeIndex: 0   //省份ID
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
    list: data.nav.navList,

    //身份证起止日期
    date1: common.getNowFormatDate(),
    date2: common.getNowFormatDate(),
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
  logout: function () {
    var that = this;
    data.logout(common, api.interface.logout.url, that);
  },
  bindLeavetypeChange : function(e){
    var index = e.detail.value;
    var leavetypeID = this.data.leavetype[index].id;
    this.setData({
        leavetypeIndex: index,
        leavetypeID: leavetypeID
    })    
  },
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    });
  },
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },    
  formSubmit: function (e) {
    console.log("我进来了！！！！" + JSON.stringify(e));
    var that = this;

    var type = that.data.leavetypeID; 
    var reason = e.detail.value.reason;
    var start_time = that.data.date1; 
    var end_time = that.data.date2; 
    var hours = e.detail.value.hours;
    var minute = e.detail.value.minute;


    if (!judge("" == common.trim(reason), "请输入请假原因", that)) return;



    common.request(api.interface.addleave.url, {
      type: type,
      reason: reason,
      start_time: start_time,
      end_time: end_time,
      hours: hours,
      minute: minute,
    }, function (res) {
      if (res.status == 1){
        common.showToast("提交成功，等待相关人员审核");
        setTimeout(function () {
          common.redirect("leave");
        }, 1000)
      }else{
        wx.showToast({
          title: res.info,
          icon: 'success',
          image: '',
          duration: 2000
        })
      }
      console.log("这个是第三部：" + JSON.stringify(res));


    });
  }    
})