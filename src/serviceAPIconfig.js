const BASEURL = "https://www.easy-mock.com/mock/5bd01a0d2ccc8d60cfa7ee15/smilevue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShopingMallInfo : BASEURL+'index', //首页数据
    getGoodsInfo : BASEURL+'goodsInfo',
    registerUser : LOCALURL+'user/register',  //用户注册接口
    loginUser : LOCALURL+'user/login',  //用户登录接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    getCategoryList : LOCALURL+'goods/getCategoryList',  //获取大类商品详情
    getSubCategoryList : LOCALURL+'goods/getSubCategoryList',  //获取小类商品详情
    getGoodsListByCategorySubID : LOCALURL+'goods/getGoodsListByCategorySubID',  //得到小类商品信息
}
module.exports = URL