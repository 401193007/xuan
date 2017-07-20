
var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
//页面共用数据
var data = require('../common/data.js');
Page({
  onLoad : function(){
    var that = this;

    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result){
      console.log(JSON.stringify(result));
      common.clearStorage(result.status, ["STAFF_IDNUMBER", "STAFF_PASSWORD","STAFF_LOGIN"],function(){
        common.redirect("../login");
      });
      that.setData({
        staffName : result.name,
        entry_date: common.formatTime(result.entry_date).split(" ")[0],
        isRead: result.is_readed_rules != 1? false : true 
      });
    });

  },
  /**
   * 页面的初始数据
   */
  data: {
    navHide: true,
    dropdownHide: true,
    showModal : false,
    showModal2 : true,
    list: data.nav.navList,
    isAgree : true
  },
  navToggle: function () {
    data.navToggle(this);
  },
  dropdownToggle: function () {
    data.dropdownToggle(this);
  },
  itemToggle : function(e){
    var id = e.currentTarget.id,
        list = this.data.list;

    data.itemToggle(id,list,this);       
  },
  logout : function(){
    var that = this;
    data.logout(common, api.interface.logout.url,that);
  },

  showModal : function(){
    var showModal = this.data.showModal;
    
    this.setData({
      showModal: !showModal
    });
  },
  closeModal : function(){
    var showModal = this.data.showModal;

    this.setData({
      showModal: !showModal
    });
  },
  checkboxChange : function(){
    
    var isAgree = this.data.isAgree;
    this.setData({
      isAgree: !isAgree
    })
  },
  closeFirst : function(){
    if(this.data.isAgree){
      this.setData({
        isRead: true,
        showModal2 : false
      });
    }else{
      wx.showToast({
        title: '请先勾选入职须知',
      })
    }

  },
  downloadPDF : function(){

    common.request(api.interface.downloadContractPdf.url, {
      check : "1"
    }, function (res) {

      if (res.status === 1){
        //请求
        wx.downloadFile({
          header : {
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')            
          },
          url: 'https://api.wx.xinyiqiguan.com/ucp/downloadContractPdf.pdf', 
          success: function (res) {
            console.log(JSON.stringify(res));
            var filePath = res.tempFilePath;

            //打开文件
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              },
              fail: function (res) {
                console.log("我进来失败了！！！" + JSON.stringify(res));
              }              
            });
          },

        })          
      }else{
        common.showToast("合同不存在");
      }

    },true); 
  }
})