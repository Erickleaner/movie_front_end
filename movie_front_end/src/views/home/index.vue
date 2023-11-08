<template>
  <div>
    <movie-header></movie-header>
    <el-row type="flex" justify="center" align="middle" class="movie-content">
      <el-col :span="18">
        <div class="tag-row" v-for="item in groups">
          <template v-if="item.isCheckBox">
            <p>{{item.label}}：</p>
            <el-checkbox-group v-model="item.value" size="medium">
              <el-checkbox-button v-for="city in item.options" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </template>
          <template v-else>
            <p>{{item.label}}：</p>
            <el-radio-group v-model="item.value">
              <el-radio-button v-for="option in item.options" :label="option"></el-radio-button>
            </el-radio-group>
          </template>
        </div>

        <el-row :gutter="30" class="movie-row" :class="movieRowOrder(q,3)" v-for="q in 3">
          <el-col v-for="p in 3" :span="8">
            <div @click="handleDetail" class="movie-item">
              <el-image class="image-size" :src="imagePath"></el-image>
              <div class="detail">
                <a @click.prevent class="title">功夫</a>
                <a @click.prevent class="texts">{{ text }}</a>
                <div class="rate-row">
                  <el-rate v-model="score"></el-rate>
                  <p>7.6</p>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>


        <pagination class="clear-left" v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination'
import MovieHeader from '@/views/components/MovieHeader'

const typeOptions = ['全部', '喜剧', '爱情', '动作' , '科幻' , '动画', '悬疑', '犯罪', '惊悚' , '冒险'];
const areaOptions = ['全部', '华语', '欧美', '韩国' , '日本' , '大陆', '美国', '香港', '台湾' , '英国' , '法国'];
const yearsOptions = ['全部' , '2023', '2022', '2021', '2020' , '2019' , '2010']
const tagOptions = ['经典', '暴力', '黑白', '无厘头' , '魔幻' , '冒险', '惊悚', '犯罪', '儿童' ]
const sortOptions = ['综合排序', '近期热度', '首映时间', '高分优先'];
export default {
  name: 'Home',
  components: { MovieHeader, Pagination },
  data() {
    return{
      imagePath: require('@/assets/image/gongfu.jpg'),
      groups:[
        {
          label:'类型',
          value: '全部',
          options: typeOptions,
          isCheckBox:false
        },
        {
          label:'地区',
          value: '全部',
          options: areaOptions,
          isCheckBox:false
        },
        {
          label:'年代',
          value: '全部',
          options: yearsOptions,
          isCheckBox:false
        },
        {
          label:'标签',
          value: ['经典'],
          options: tagOptions,
          isCheckBox:true
        },
        {
          label:'排序',
          value: '综合排序',
          options: sortOptions,
          isCheckBox:false
        },
      ],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      list: null,
      total: 10,
      text:'2004 / 中国大陆 中国香港 / 喜剧 动作 犯罪 奇幻 / 周星驰 / 周星驰 元秋',
      score:3
    }
  },
  methods:{
    handleDetail(){
      this.$router.push({
        path:'/detail',
        query:{}
      })
    },
    movieRowOrder(current,len){
      if (current===1) return 'first'
      if (current===len) return 'last'
      return ''
    },
    getList() {
      fetchList(this.listQuery).then(response => {
        //单页的数据集合
        this.list = response.data.items
        //总数
        this.total = response.data.total
      })
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

.movie-content{
  .tag-row:first-child{
    padding-top: 15px
  }
  .movie-row.first{
    margin-top: 15px;
  }
  .movie-row{
    margin-bottom: 20px;
    &.last{
      margin-bottom: 0;
    }
  }
}
.tag-row{
  p{
    font-size: 18px;
    padding-right: 8px;
  }
  display: flex;
  align-items: center;
}
.clear-left{
  display: flex;
  justify-content: center;
  margin-left: 0;
  padding-left: 0;
}
//此处的size不符合一般size
.image-size{
  width: 120px;
  height: 120px;
}
.movie-item{
  cursor: pointer;
  display: flex;
  .detail{
    .rate-row{
      padding: 0;
      display: flex;
      align-items: center;
      p{
        font-size: 14px;
      }
    }
    a{
      &.title{
        padding: 0 0 5px 0;
        font-size: 15px;
      }
      &.texts{
        line-height: 20px;
        font-size: 13px;
      }
    }
    //width: 220px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  }
}
</style>
