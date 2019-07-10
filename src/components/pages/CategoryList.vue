<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for="(item, index) in category" @click="clickCategory(index,item.ID)" :key="index" :class="{categoryActive:categoryIndex==index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                                
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div class="list-item" v-for="(item, index) in goodList" @click="goGoodsInfo(item.ID)" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" alt="" width="100%" :onerror="errorImg">
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE |moneyFilter}} 元</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPIconfig.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFiler";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0, //激活标签的值
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据
      isRefresh: false, //下拉刷新
      page: 1, //商品列表的页数
      goodList: [], //商品列表信息
      categorySubId: "", //商品子类ID
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"' //图片失效时的替补图片
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.finished = false;
      this.page = 1;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    //根据大类读取小类信息
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getSubCategoryList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          //console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
            this.onLoad();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 500);
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    //获取商品信息
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取小类
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    //点击商品跳转到详情页面
    goGoodsInfo(id) {
      this.$router.push({name:'Goods',params:{goodsId:id}})
    }
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46-50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90-50 + "px";
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2em;
  border-bottom: 1px solid #ddd;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background: #fff;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  padding: 5px;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin: 10px 0 0 10px;
}
</style>