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

Page({
  onLoad: function () {
    var that = this;
    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      that.setData({
        staffName: result.name,
        id_number: result.id_number
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

    hospitalization: [
      {
        id : "0",
        text : "否"
      },
      {
        id: "1",
        text: "是"
      }
    ],
    hospitalizationIndex: 0,
    hospitalizationID : "0",

    date: common.getNowFormatDate(),
  },
  navToggle: function () {
    data.navToggle(this);
  },
  dropdownToggle: function () {
    data.dropdownToggle(this);
  },
  itemToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;

    data.itemToggle(id, list, this);
  },
  logout: function () {
    var that = this;
    data.logout(common, api.interface.logout.url, that);
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },  
  bindHospitalizationChange: function (e) {
    var index = e.detail.value;
    this.setData({
      sexIndex: index,
      hospitalizationID : this.data.hospitalization[index].id
    });
  },
  formSubmit : function(e){
    var that = this;
    var illness = e.detail.value.illness;
    var hospitalization = e.detail.value.hospitalization;
    var diagnose_date = e.detail.value.diagnose_date;
    

    if (!judge("" == common.trim(illness), "疾病名称不能为空", that)) return;


    common.request(api.interface.medicalReport.url, {
      illness: illness,
      hospitalization: hospitalization,
      diagnose_date: diagnose_date,
    }, function (res) {
      common.showToast("提交成功，等待相关人员审核");
      setTimeout(function () {
        common.redirect("medical_reimbursement");
      }, 1000)
    }, true)        
  }
})