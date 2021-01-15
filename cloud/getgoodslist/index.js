const cloud = require('wx-server-sdk')
cloud.init();
exports.main = (event, context) => {
  // 这里获取到的 openId、 appId 和 unionId 是可信的，注意 unionId 仅在满足 unionId 获取条件时返回
  const db = cloud.database();
  return db.collection('goods').get({
    success: function (res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data)
    }
    
    
  })
 
}