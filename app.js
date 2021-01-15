App({
  onLaunch: function () {
    var that=this;
    console.log('App Launch')
    wx.cloud.init({
      env: 'xuexi-ffgum',
    });
    wx.login();
   
  
      setInterval(function () {
        that  .scanCarts()
      }, 100)
    
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  scanCarts: function () {
    let goodnum = 0
    let carts = wx.getStorageSync('goods') //获取缓存中carts信息
    for (let i = 0; i < carts.length; i++) {
      goodnum += carts[i].num //通过for循环对数量进行累加
    }
    if (goodnum) { //如果数量存在，即不为0，添加徽章
      wx.setTabBarBadge({
        index: 2, //图标下标是从0开始，2代表第3个图标
        text: '' + goodnum + '',
      })
    } else {
      wx.removeTabBarBadge({
        index: 2, //否则移除徽章
      })
    }
  },

  globalData: {
    hasLogin: false,
    useInfo: null,
  }
})
