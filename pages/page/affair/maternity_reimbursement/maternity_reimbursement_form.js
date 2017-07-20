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
    common.isError(tips, context);
    return false;
  } else {
    common.clearError(context);
    return true;
  }
}

//怀孕周数
function week(){
  var arr = [];
  for(var i= 1;i<=44;i++){
    var obj = {
      id : i,
      text : "第" + i + "周"
    }
    arr.push(obj);
  }
  return arr;
}

Page({
  onLoad: function () {
    var that = this;
    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      that.setData({
        staffName: result.name,
        id_number: result.id_number,
        week: week()
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

    weekIndex: 0,
    weekID: "0",

    date: common.getNowFormatDate(),
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
  bindWeekChange: function (e) {
    this.setData({
      weekIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },  
  formSubmit: function (e) {
    var that = this;
    var pregnancy_weeks = e.detail.value.pregnancy_weeks;
    var due_date = e.detail.value.due_date;

    console.log(typeof(pregnancy_weeks) + " " + due_date);

    common.request(api.interface.parturitionreport.url, {
      pregnancy_weeks: Number(pregnancy_weeks) + 1,
      due_date: due_date
    }, function (res) {
      console.log(JSON.stringify(res));
      common.showToast("提交成功，等待相关人员审核");
      setTimeout(function () {
        common.redirect("maternity_reimbursement");
      }, 1000)
    }, true)
  }    
})