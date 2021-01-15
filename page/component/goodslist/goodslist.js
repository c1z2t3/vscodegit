// page/component/goodslist/goodslist.js
//初始化数据库
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
   
  },
  /**
   * 删除当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    //修改数据库
    db.collection('goods').doc(this.data.goods[index]._id).remove({
      success: function (res) {
        console.log("删除成功", res.data)
      }
    })
    let carts = this.data.goods;
    carts.splice(index, 1);
    this.setData({
      goods: carts
    });
    
    
  },

    
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.cloud.callFunction({
      name: 'getgoodslist',
      complete: res => {
        console.log('res: ', res);
        that.setData({
          goods:res.result.data,
        
        })
        console.log('result: ', that.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.cloud.callFunction({
      name: 'getgoodslist',
      complete: res => {
        console.log('res: ', res);
        that.setData({
          goods: res.result.data,

        })
        console.log('result: ', that.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})