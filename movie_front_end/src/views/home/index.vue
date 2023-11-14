<template>
  <div>
    <movie-header></movie-header>
    <el-row type="flex" justify="center" align="middle" class="movie-content">
      <el-col :span="18">
        <!--各种选项-->
        <div class="tag-row" v-for="group in groups">
          <template v-if="group.isCheckBox">
            <p>{{group.label}}：</p>
            <el-checkbox-group @change="search" v-model="group.value" size="medium">
              <el-checkbox-button v-for="option in group.options" :label="option" :key="option.id">{{option.name}}</el-checkbox-button>
            </el-checkbox-group>
          </template>
          <template v-else>
            <p>{{group.label}}：</p>
            <el-radio-group @change="search" v-model="group.value">
              <el-radio-button v-for="option in group.options" :label="option" :key="option.id">{{option.name}}</el-radio-button>
            </el-radio-group>
          </template>
        </div>

        <el-row :gutter="30" class="movie-row" :class="movieRowOrder(cur,pageSize)" v-for="cur in pageSize">
          <!--cur-->
          <el-col v-for="order in rowSize(cur,pageSize)" :span="8">
            <div @click="handleDetail" class="movie-item">
              <el-image class="image-item"
                   :alt="current(order,cur)['titleCN']"
                   :src="`http://localhost:8080/image/${current(order,cur)['movieId']}`"/>
              <div class="detail-item">
                <a @click.prevent class="title">{{ current(order, cur)['titleCN'] }}</a>
                <a @click.prevent class="texts">导演：{{ current(order,cur)['director'] }}</a>
                <a @click.prevent class="texts">主演：{{ current(order,cur)['actor'] }}</a>
                <a @click.prevent class="texts">{{detail(order,cur)}}</a>
                <div class="texts-row">
                  <a @click.prevent>评分：</a>
                  <a @click.prevent class="rating-score">{{ current(order,cur)['rating'] }}</a>
                  <a @click.prevent class="rating-count">{{ current(order,cur)['judgeNum'] }}人评价</a>
                </div>

                <a @click.prevent class="texts">评语：{{ current(order,cur)['inq'] }}</a>
              </div>
            </div>
          </el-col>
        </el-row>


        <pagination class="clear-left" v-show="total>0" :pageSizes="[9,12]" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </el-col>
    </el-row>
  </div>
</template>

<script>
import {fetchCheckGroups, fetchList} from '@/api/movie'
import Pagination from '@/components/Pagination'
import MovieHeader from '@/views/components/MovieHeader'

//use obj not str
const yearsOptions = [{id:0,name:'全部'},{id:1,name:'2023'},{id:2,name:'2022'},
  {id:3,name:'2021'},{id:4,name:'2020'},{id:5,name:'2019'},{id:6,name:'2018以前'}]
//use obj not str
const sortOptions = [{id:0,name:'综合排序'},{id:1,name:'近期热度'},
  {id:2,name:'首映时间'},{id:3,name:'高分优先'}]
const checkGroupsTemp = [
  {
    label:'年代',
    value: yearsOptions[0],
    options: yearsOptions,
    isCheckBox:false
  },
  {
    label:'排序',
    value: sortOptions[0],
    options: sortOptions,
    isCheckBox:false
  },
]
export default {
  name: 'Home',
  components: { MovieHeader, Pagination },
  data() {
    return{
      imagePath: require('@/assets/image/gongfu.jpg'),
      groups:[],
      listQuery: {
        page:1,
        limit:9,
        countryId:0,
        typeId:0,
        yearId:0,
        sortId:0
      },
      list: [],
      total: 0,
      text:'2004 / 中国大陆 中国香港 / 喜剧 动作 犯罪 奇幻 / 周星驰 / 周星驰 元秋',
      score:3
    }
  },
  computed:{
    pageSize(){
      const len = this.list.length
      return Math.ceil(len/3);
    }
  },
  created() {
    const _this = this
    fetchCheckGroups().then(res=>{
      let checkGroups = checkGroupsTemp
      const {data} = res
      let {countries,types} = data
      countries = countries.slice(0,11)
      types = types.slice(0,12)
      checkGroups.splice(0, 0,
        {
          label:'类型',
          value: types[0],
          options: types,
          isCheckBox:false
        }
      );
      checkGroups.splice(1, 0,
        {
          label:'地区',
          value: countries[0],
          options: countries,
          isCheckBox:false
        }
      );
      _this.groups = checkGroups
    }).then(()=>{
      this.getList()
    })
  },
  methods:{
    search(){
      const typeId = this.groups[0].value.id
      const countryId = this.groups[1].value.id
      const yearId = this.groups[2].value.id
      const sortId = this.groups[3].value.id
      this.listQuery.typeId = typeId
      this.listQuery.countryId = countryId
      this.listQuery.yearId = yearId
      this.listQuery.sortId = sortId
      this.getList()
    },
    detail(order,cur){
      const movie = this.current(order,cur)
      const {releaseTime,countries,types} = movie
      const countryStr = countries.reduce((accumulator,current)=>{
        accumulator += current.name + " "
        return accumulator
      },"")
      const typeStr = types.reduce((accumulator,current)=>{
        accumulator += current.name + " "
        return accumulator
      },"")
      return `${releaseTime} / ${countryStr}/ ${typeStr}`
    },
    current(order,cur){
      return this.list[(cur-1)*3+order-1]
    },
    rowSize(cur,pageSize){
      //3 or less
      if (cur<pageSize){
        return 3
      }else {
        return this.list.length - (pageSize-1)*3
      }
    },
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
.movie-item{
  cursor: pointer;
  display: flex;
  .image-item{
    width: 25%;
    height: 110px;
  }
  .detail-item{
    width: 75%;
    div{
      &.texts-row{
        font-size: 13px;
        display: inline-block;
        padding-bottom: 5px;
        .rating-score{
          color:#FFAC2D;
        }
        .rating-count{
          margin-left: 13px;
        }
      }
    }
    a{
      &.title{
        padding: 0 0 5px 0;
        font-size: 15px;
      }
      &.texts{
        font-size: 13px;
        padding-bottom: 5px;
        display: block;
      }
    }
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
