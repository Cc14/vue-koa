<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon"></van-col>
                <van-col span="16"><input type="text" class="search-input"></van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
            
        </div>
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(item, index) in bannerPicArray" :key="index">
                    <img :src="item.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="category">
            <div v-for="(item, index) in category" :key="index">
                <img :src="item.image" alt="" width="80%">
                <div>{{item.mallCategoryName}}</div>
            </div>
        </div>
        <div class="adbanner">
            <img :src="adBanner.PICTURE_ADDRESS" alt="" width="100%">
        </div>
        <div class="recommond-area">
            <div class="recommond-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" alt="">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <floorComponent :floorTitle="floorName.floor1" :floorData="floor1"></floorComponent>
        <floorComponent :floorTitle="floorName.floor2" :floorData="floor2"></floorComponent>
        <floorComponent :floorTitle="floorName.floor3" :floorData="floor3"></floorComponent>
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                            <goodsInfo :goodsId='item.goodsId' :goodsImage='item.image' :goodsName='item.name' :goodsPrice='item.price'></goodsInfo>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '@/components/component/floorComponent';
import goodsInfo from '@/components/component/goodsInfoComponents';
import { toMoney } from '@/filter/moneyFiler';
import url from '@/serviceAPIconfig'
export default {
  data () {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray:[],
      category:[],
      adBanner:'',
      recommendGoods:[],
      swiperOption:{
          slidesPerView:3
      },
      floorName:{},
      floor1:[],
      floor2:[],
      floor3:[],
      hotGoods:[]
    }
  },
  components:{
      swiper, swiperSlide, floorComponent, goodsInfo
  },
  created() {
      axios({
          url:url.getShopingMallInfo,
          method:'get'
      }).then((response)=>{
          this.bannerPicArray = response.data.data.slides;
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
      }).catch((err)=>{
          console.log(err)
      })
  },
  filters:{
      moneyFilter(money){
          return toMoney(money)
      }
  }
}
</script>

<style scoped>
    .search-bar{
        height: 2rem;
        line-height: 2rem;
        background-color: #e5017d;
        overflow: hidden;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        border:0px;
        border-bottom:1px solid #fff !important;
        background-color: #e5017d;
        color: #fff;
    }
    .location-icon{
        padding:.2rem 0 0 .3rem;
    }
    .swiper-area{
        height: 10rem;
        overflow: hidden;
    }
    .category{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin:0 .3rem;
    }
    .category div{
        font-size: 12px;
        text-align: center
    }
    .adbanner{
        padding:.3rem 0;
    }
    .recommend-body{
        width: 100%;
        border-bottom: 1px solid #eee;
    }
    .recommend-item {
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align:center
    }
    .hot-title{
        text-align: center;
        padding:10px 0;
    }
    .hot-goods{
        padding-bottom: 50px;
    }
</style>
