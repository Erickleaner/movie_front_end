<template>
  <div class="app-container">
    <!--头部操作拦-->
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="username" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.typeId" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in typeOptions" :key="item.typeId" :label="item.name" :value="item.typeId" />
      </el-select>
      <el-select v-model="listQuery.countryId" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in countryOptions" :key="item.countryId" :label="item.name" :value="item.countryId" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <!--表格-->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.movieId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TitleCN" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.titleCN }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Director" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.director }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Actor" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.actor }}</span>
        </template>
      </el-table-column>

      <el-table-column label="ReleaseTime" width="110px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.releaseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Rating" width="80" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.rating }}</span>
        </template>
      </el-table-column>

      <el-table-column label="JudgeNum" width="110px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.judgeNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Inq" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type " @click="handleUpdate(row)">{{ row.inq }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Types" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag class="link-type tag-mt" v-for="item in row.types" :key="item.typeId">{{ item.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Countries" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag class="link-type tag-mt" v-for="item in row.countries" :key="item.countryId">{{ item.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <pagination v-show="total>0" :pageSizes="[10,20,30]" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑|创建 对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="auto" style="width: 400px; margin-left:50px;">
        <el-form-item label="TitleCN" prop="titleCN">
          <el-input v-model="temp.titleCN" />
        </el-form-item>
        <el-form-item label="Director" prop="director">
          <el-input v-model="temp.director" />
        </el-form-item>
        <el-form-item label="Actor" prop="actor">
          <el-input v-model="temp.actor" />
        </el-form-item>
        <el-form-item label="ReleaseTime" prop="releaseTime">
          <el-input v-model="temp.releaseTime" />
        </el-form-item>
        <el-form-item label="Rating" prop="rating">
          <el-input v-model="temp.rating" />
        </el-form-item>
        <el-form-item label="judgeNum" prop="judgeNum">
          <el-input v-model="temp.judgeNum" />
        </el-form-item>
        <el-form-item label="Inq" prop="inq">
          <el-input v-model="temp.inq" />
        </el-form-item>
        <el-form-item v-for="(group,index) in groups" :label="group.label">
          <el-checkbox-group v-model="group.children">
            <el-checkbox-button v-for="elem in group.options" :label="elem" :key="elem.id">{{elem.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import {fetchCountries, fetchList, fetchTypes, insert, remove, update} from '@/api/manageMovie'
import {
  validateActor,
  validateDirector, validateInq, validateJudgeNum,
  validateRating,
  validateReleaseTime,
  validateTitleCN
} from "@/views/table/validator";

export default {
  name: 'movieTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      groups:[],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        sort: '+id',
        typeId:undefined,
        countryId: undefined
      },
      typeOptions:[],
      countryOptions:[],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        movieId: undefined,
        titleCN:'',
        director:'',
        actor:'',
        releaseTime:'',
        rating:'',
        judgeNum:'',
        inq:'',
        typeIds:[],
        countryIds:[]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        titleCN: [{ trigger: 'blur',validator: validateTitleCN}],
        director: [{ trigger: 'blur',validator: validateDirector }],
        actor: [{ trigger: 'blur',validator: validateActor }],
        releaseTime: [{ trigger: 'blur',validator: validateReleaseTime }],
        rating: [{ trigger: 'blur',validator: validateRating }],
        judgeNum: [{ trigger: 'blur',validator: validateJudgeNum }],
        inq: [{ trigger: 'blur',validator: validateInq }],
      },
    }
  },
  created() {
    this.initList()
  },
  methods: {
    setCheckGroups(){
      let types = this.typeOptions.slice(1);
      types = types.map(function (elem) {
        return {
          id:elem.typeId,
          name:elem.name
        }
      });
      let _this = this
      const typeGroup = {
        label:'types',
        children:[],
        options:types
      }
      let countries = this.countryOptions.slice(1);
      countries = countries.map(function (elem) {
        return {
          id:elem.countryId,
          name:elem.name
        }
      });
      const countryGroup = {
        label:'countries',
        children:[],
        options:countries
      }

      this.groups.push(typeGroup)
      this.groups.push(countryGroup)
    },
    getList(){
      this.listLoading = true
      fetchList(this.listQuery).then(res=>{
        const {data} = res
        this.list = data.items
        this.total = data.total
      }).then(()=>{
        this.listLoading = false
      })
    },
    initList() {
      this.listLoading = true
      const _this = this
      fetchTypes().then(res=>{
        const {data} = res
        _this.listQuery.typeId = 0
        _this.typeOptions = data
        return fetchCountries()
      }).then(res=>{
        const {data} = res
        _this.listQuery.countryId = 0
        _this.countryOptions = data
        _this.setCheckGroups()
        return _this.getList()
      })

    },
    //查询、按照升降序排列都会回到第一页
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    //修改状态
    handleModifyStatus(row, status) {
      let clone = {...row};
      clone.status = status
      update(clone).then(data=>{
        if (data){
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          row.status = status
        }
      })
    },
    //排序条件变化先拿到根据什么键进行排序
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'articleId') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    //新增的模板
    resetTemp() {
      this.temp =  {
        movieId: undefined,
        titleCN:'',
        director:'',
        actor:'',
        releaseTime:'',
        rating:'',
        judgeNum:'',
        inq:'',
      }
      for (let group of this.groups){
        group.children = []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      const _this = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          const types = _this.groups[0].children.map(function (elem) {
            return { typeId:elem.id,name:elem.name}
          });
          const countries = _this.groups[1].children.map(function (elem) {
            return { countryId:elem.id,name:elem.name }
          });
          const pTemp = {
            ..._this.temp,
            types,
            countries
          }
          insert(pTemp).then(res => {
            pTemp.movieId = res.data
            this.list.unshift(pTemp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    //显示更新的弹框
    handleUpdate(row) {

      this.temp = Object.assign({}, row) // copy obj

      const typeIds = row.types.map(elem=>{
        return elem.typeId
      })
      let {options} = this.groups[0]
      let children = []
      for (const option of options){
        if (typeIds.includes(option.id)){
          children.push(option)
        }
      }
      this.groups[0].children = children

      const countryIds = row.countries.map(elem=>{
        return elem.countryId
      })

      options = this.groups[1].options
      children = []
      for (const option of options){
        if (countryIds.includes(option.id)){
          children.push(option)
        }
      }
      this.groups[1].children = children

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const _this = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const types = _this.groups[0].children.map(function (elem) {
            return { typeId:elem.id,name:elem.name}
          });
          const countries = _this.groups[1].children.map(function (elem) {
            return { countryId:elem.id,name:elem.name }
          });
          const pTemp = {
            ..._this.temp,
            types,
            countries
          }
          update(pTemp).then(res => {
            if (res.data){
              const index = this.list.findIndex(v => v.movieId === this.temp.movieId)
              this.list.splice(index, 1, pTemp)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      remove(row.movieId).then(res=>{
        if (res.data){
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
        }
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "movieTable.scss";
</style>
