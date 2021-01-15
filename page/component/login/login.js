
Page({
  data: {
    address: {
      name: '',
      phone: '',
      detail: ''
    },
    logined:false,
  },
  onLoad() {
    var self = this;

    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          address: res.data
        })
      }
    })
  },
  formSubmit(e) {
    const db = wx.cloud.database();
    const value = e.detail.value;
    var that=this;
    if (value.name && value.password) {
      db.collection('admin').doc('maicai-admin').get({
        success: function (res) {
          // res.data 包含该记录的数据
          console.log(res.data)
          if(value.name===res.data.name&&value.password===res.data.password){
            that.setData({
              logined:true,
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '用户名密码错误',
              showCancel: false
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})