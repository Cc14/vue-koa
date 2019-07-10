<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"/>
        </div>
        <!--显示购物车中的商品-->
        <div class="cart-list">
          <div class="list-row" v-for="(item, index) in cartInfo" :key="index">
            <div class="list-img"><img :src="item.image" alt="" width="100%"></div>
            <div class="list-text">
              <div class="list-goods-name">{{item.name}}</div>
              <div class="list-goods-control">
                <van-stepper v-model="item.count"/>
              </div>
            </div>
            <div class="list-goods-price">
              <div>￥{{item.price | moneyFilter}}</div>
              <div>×{{item.count}}</div>
              <div class="all-price">
                ￥{{item.price*item.count | moneyFilter}}
              </div>
            </div>
          </div>
        </div>
        <!--显示总金额-->
        <div class="totalMoney">
          商品总价格： ￥{{totalMoney | moneyFilter}}
        </div>
        <!--清空购物车-->
        <div class="card-title">
          <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import { toMoney } from '@/filter/moneyFiler';
export default {
  data() {
    return {
      cartInfo: [], //购物车内的商品
      isEmpty: false //购物车是否为空，不为空则显示ture，为空显示false
    };
  },
  created() {
    this.getCartInfo();
  },
  computed:{
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item,index)=>{
        allMoney +=item.price*item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log(this.cartInfo);
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  },
  filters:{
      moneyFilter(money){
          return toMoney(money)
      }
  }
};
</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list{
  background: #fff;
}
.list-row{
  display:flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding:0.5rem;
  font-size:0.85rem;
  border-bottom:1px solid #ddd;
}
.list-img{
  flex: 6;
}
.list-text{
  flex: 14;
}
.totalMoney{
  text-align: right;
  background:#fff;
  border-bottom:1px solid #ddd;
  padding:5px;
}
</style>