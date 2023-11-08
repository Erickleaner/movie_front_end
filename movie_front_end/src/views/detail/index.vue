<template>
  <div>
    <movie-header></movie-header>
    <el-row type="flex" justify="center" align="middle">
      <el-col class="movie-content" :span="18">
        <p class="title">功夫(2004)</p>
        <div class="main">
          <el-image class="left" :src="require('@/assets/image/gongfu.jpg')"></el-image>
          <div class="center">
            <span v-for="elem in detailList">
              <p>{{ elem.label }}</p>
              <a>{{ elem.value }}</a>
            </span>
          </div>
          <div class="right">
            <p class="title">评分</p>
            <div class="row-score">
              <p class="score">8.8</p>
              <div class="score-detail">
                <el-rate class="rate-item" :value="4"></el-rate>
                <p class="count-item">111100人评价</p>
              </div>
            </div>
          </div>
        </div>
        <div class="evaluate">
          <p class="label">评价：</p>
          <el-rate :value="4"></el-rate>
        </div>
        <div class="introduction">
          <p class="title">
            功夫的剧情简介 · · · · · ·
          </p>
          <p>1940年代的上海，自小受尽欺辱的街头混混阿星（周星驰）为了能出人头地，可谓窥见机会的缝隙就往里钻，今次他盯上行动日益猖獗的黑道势力“斧头帮”，想借之大名成就大业。<br>
            阿星假冒“斧头帮”成员试图在一个叫“猪笼城寨”的地方对居民敲诈，不想引来真的“斧头帮”与“猪笼城寨”居民的恩怨。“猪笼城寨”原是藏龙卧虎之处，居民中有许多身怀绝技者（元华、梁小龙等），
            他们隐藏于此本是为远离江湖恩怨，不想麻烦自动上身，躲都躲不及。而在观战正邪两派的斗争中，阿星逐渐领悟功夫的真谛。</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MovieHeader from '@/views/components/MovieHeader'
export default {
  name: 'Detail',
  components: { MovieHeader },
  data(){
    return{
      detailList:[
        { label:'导演：', value:'XX', },
        { label:'编剧：', value:'XX', },
        { label:'主演：', value:'XX', },
        { label:'类型：', value:'XX', },
        { label:'制片国家：', value:'XX', },
        { label:'语言：', value:'XX', },
        { label:'上映日期：', value:'XX', },
        { label:'片长：', value:'XX', },
        { label:'又名：', value:'XX', },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-content{
  display: flex;
  flex-direction: column;
  .title{

  }
  .main{
    display: flex;
    .left{
      &.el-image{
        height: 190px;
      }
    }
    .center{
      min-width: 300px;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      span{
        font-size: 14px;
        padding: 0;
        display: flex;
        align-items: center;
        p{
          margin: 0 0 6px 0;
        }
        a{
          margin-bottom: 6px;
        }
      }
    }
    .right{
      border-left: 1px solid gainsboro;
      margin-left: 20px;
      padding-left:20px;
      .title{
        margin: 0;
      }
      .score{
        margin: 0;
        padding: 0;
        font-size: 36px;
      }
      display: flex;
      flex-direction: column;
      .row-score{
        display: flex;
        align-items: center;
        .score-detail{
          flex-direction: column;
          justify-content: flex-start;
          margin-left: 15px;
          .rate-item{
            margin: 0 0 8px 0;
          }
          .count-item{
            margin: 0;
            font-size: 16px;
          }
        }
      }
    }
  }
  .evaluate{
    display: flex;
    align-items: center;
    .label{
      font-size: 16px;
    }
  }
  .introduction{

    padding: 0;
    display: flex;
    flex-direction: column;
    .title{
      font-size: 17px;
      color: #01774D;
      margin: 0;
    }
    p{
      white-space: pre-line;
    }
  }
}
</style>
