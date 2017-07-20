var nav = {
  navID : 'index',
  navList : [
    {
      id: "archives",
      name: '员工档案',
      open: false,
      pages: [{
        text: '完善资料',
        page: 'personal_data'
      }, {
        text: '修改资料',
        page: 'personal_data2'
      }]
    },
    {
      id: "social",
      name: '社保相关',
      open: false,
      pages: [{
        text: '医疗报销',
        page: 'medical_reimbursement'
      }, {
        text: '工伤报告',
        page: 'industrial_injury'
      }, {
        text: '生育报销',
        page: 'maternity_reimbursement'
      }, {
        text: '社保卡报办',
        page: 'social_security'
      }]
    },
    {
      id: "attendance",
      name: '考勤管理',
      open: false,
      pages: [{
        text: '每日签到',
        page: 'sign'
      }, {
        text: '请假列表',
        page: 'leave'
      }]
    }
  ]

}

function initData(common,url,callback){
  common.request(url, {

  }, function (res) {
    var result = res.result;
    callback(result);
  }); 
}

//左边导航
function navToggle(context){
    var navHide = context.data.navHide;
    context.setData({
      navHide: !navHide
    });
}

// 右边导航
function dropdownToggle(context){
  var dropdownHide = context.data.dropdownHide;
  context.setData({
    dropdownHide: !dropdownHide
  });
}

//退出登录
function logout(common, url,context){
  common.request(url, {
  }, function (res) {
    console.log(JSON.stringify(res));
    common.showToast("已退出登录");

    common.resCallback(res, context, function () {
      wx.setStorageSync("STAFF_IDNUMBER", null);
      wx.setStorageSync("STAFF_PASSWORD", null);      
      wx.setStorageSync("STAFF_LOGIN", false);   
      common.redirect("../login");
    });
  }, true);   
}

function itemToggle(id, list,context){
  for (var i = 0, len = list.length; i < len; ++i) {
    if (list[i].id == id) {
      list[i].open = !list[i].open
      
    } else {
      list[i].open = false
    }
  }

  context.setData({
    list: list
  });    
}

module.exports = {
  nav: nav,
  initData: initData,
  navToggle: navToggle,
  dropdownToggle: dropdownToggle,
  logout: logout,
  itemToggle: itemToggle
}