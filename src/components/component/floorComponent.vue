<template>
    <div>
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="this.floorData0.image" alt="" width="100%">
                </div>
                <div class="floor-two">
                    <div>
                        <img :src="this.floorData1.image" alt="" width="100%">
                    </div>
                    <div>
                        <img :src="this.floorData2.image" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item, index) in floorData3" :key="index">
                    <img :src="item.image" alt="" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {},
                floorData3: {},
            }
        },
        watch:{
            floorData:function(val){
                this.floorData0 = this.floorData[0]
                this.floorData1 = this.floorData[1]
                this.floorData2 = this.floorData[2]
                this.floorData3 = this.floorData.slice(3)
            }
        }
       
    }
</script>

<style scoped>
    .floor-title{
        text-align: center;
        padding:10px 0;
    }
    .floor-anomaly{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
    }
    .floor-anomaly>div{
        width: 50%;
        font-size: 0;
    }
    .floor-anomaly .floor-one{
        border-right: 1px solid #ccc;
        box-sizing:border-box;
    }
    .floor-anomaly .floor-two div:nth-of-type(1){
        border-bottom:1px solid #ccc;
        box-sizing:border-box;
    }
    .floor-rule{
        display: flex;
        flex-wrap: nowrap;
        font-size: 0;
    }
    .floor-rule div:nth-of-type(1){
        border-right: 1px solid #ccc;
        box-sizing:border-box;
    }
</style>