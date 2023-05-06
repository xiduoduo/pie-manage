<template>
  <div class="task-sort">
    <div class="form-content">
      <el-form
        :model="queryParams"
        ref="queryForm"
        class="breadcrumb"
        :inline="true">
        <el-form-item label="文件类型" prop="fileType">
          <el-select
            v-model="queryParams.fileType"
            placeholder="请选择"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="item in taskOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文件状态" prop="fileStatus">
          <el-select
            v-model="queryParams.fileStatus"
            placeholder="请选择"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="item in taskOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据时间">
          <el-date-picker
            v-model="queryParams.dateRange"
            size="small"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="onSearch()"
            >查询</el-button>
        </el-form-item>
      </el-form>
      <div class="breadcrumb btns">
        
        <el-button type="success" size="mini">模板excel</el-button>
        <el-button type="success" size="mini">模板TXT</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table
        v-loading="loading"
        :data="roleList"
        :header-cell-style="{
          background: 'rgb(236,241,252)',
          color: '#333',
          'text-align': 'center',
        }"
        :cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
        
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>

        <el-table-column
          v-for="(item, index) in getHeaders"
          :key="index"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="downLoad(scope.row)"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'fileType',
  data(){
    return {
      loading:false,
      taskArea:'',
      taskDes:'',
      multipleSelection: [],
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        fileType: '',
        fileStatus: '',
        dateRange:[]
      },
      taskOption: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      getHeaders: [
        {
          prop: 'fileType',
          label: '文件类型',
          width: '200'
        },
        {
          prop: 'fileName',
          label: '文件名称',
          width: '220'
        },
        {
          prop: 'filePath',
          label: '文件路径',
          width: '220'
        },
        {
          prop: 'fileStatus',
          label: '文件状态',
          width: '200'
        },{
          prop: 'failLog',
          label: '失败日志',
          width: '200'
        },{
          prop: 'createTime',
          label: '创建时间',
          width: '220'
        },
       
      ],
      roleList: [
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'解析失败',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'未解析',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'未分类',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'解析失败',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'未解析',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'未分类',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'解析失败',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'未解析',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
       {
        fileType:'中法卫星',
        fileName:'CFisdsa',
        filePath:'D://ruo…',
        fileStatus:'未分类',
        failLog:'文件不存在',
        createTime:'2023-01-01 12:00:00',
       },
      ],
      pageTotal: 0,
    }
  },
  mounted(){
    this.pageTotal = this.roleList.length;
  },
  methods:{
    onSearch(){
      this.getList();
    },
    getList(){
      // this.loading = true;
      let params={
        dataStartTime: this.queryParams.dateRange.length ? this.queryParams.dateRange[0]: '',
        dataEndTime: this.queryParams.dateRange.length ? this.queryParams.dateRange[1]: '',
        fileType: this.queryParams.fileType,
        fileStatus: this.queryParams.fileStatus,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
      }
      // oriFindListByPage()
      // .then((res) => {
      //   this.loading = false;
      // })
      // .catch((err) => {
        
      // });
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      this.getList();
    },
    downLoad(val) {
      console.log(val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
}
</script>

<style lang="scss" scoped>
  .task-sort {
    position: absolute;
    top: 80px;
    width: calc(100vw - 20px);
    z-index: 999;
    height:calc(100vh - 100px);
    background: #fff;
    padding: 10px;
  }
  .form-content {
    // margin-left: 25px;
    display: flex;
    justify-content: space-between;
    height: 67px;
    .breadcrumb {
      padding-top: 25px;
      padding-left: 20px;
      height: 67px;
      .role {
      }
    }
    .btns {
      margin-top: -8px;
      padding-right: 10px;
    }
  }
  .table-list {
    background: #fff;
    // margin-top: 15px;
    // margin-left: 25px;
    // height: calc(100vh - 117px -82px);
    // height: 261%;
    height: calc(100vh - 240px);
    .info-title {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      padding: 20px 0;
      position: relative;
    }
    .el-table {
      // height: 77%;
      height: 100%;
      // overflow-y: auto;
      /deep/ .el-table__body-wrapper {
        height: 650px;
        overflow-y: auto !important;
      }
    }
  }
  .el-form--inline .el-form-item {
    margin-top: -14px;
  }
  .page {
    text-align: right;
    padding: 15px 0;
  }
  // 滚动条样式
::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #fff;
}
 
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 7px;
  opacity: 0.5;
}
 
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #0257aa;
}

// 表格斑马自定义颜色
::v-deep .el-table__row.warning-row {
  background: rgb(236,241,252);
}
// .add-dialog {
//   width: 880px;
//   height: 452px;
// }
/deep/ .el-dialog {
  width: 880px !important;
  height: 420px !important;
  padding: 0
}
/deep/ .el-dialog__body {
  padding: 0;
}
/deep/ .el-dialog__header {
  display: none;
}
</style>