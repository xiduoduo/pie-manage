<template>
  <div class="task">
    <div class="total">
      <div class="tot-title">
        任务总览
      </div>
      <div class="middle">
        <div class="list">
          <div class="name">总监控量</div>
          <div class="num">
            <div class="number" style="color: #F53A28;">{{num1}}</div>
            <div class="danwei">GI</div>
          </div>
        </div>
        <div class="list">
          <div class="name">总监控景数</div>
          <div class="num">
            <div class="number" style="color: #FFCB21;">{{num2}}</div>
            <div class="danwei">个</div>
          </div>
        </div>
        <div class="list">
          <div class="name">总任务个数</div>
          <div class="num">
            <div class="number" style="color: #F2A445;">{{num3}}</div>
            <div class="danwei">个</div>
          </div>
        </div>
        <div class="list">
          <div class="name">任务处理景数</div>
          <div class="num">
            <div class="number" style="color: #1A6FFE;">{{num4}}</div>
            <div class="danwei">个</div>
          </div>
        </div>
      </div>
    </div>
    <div class="monitor">
      <div class="tot-title">
        任务监控
      </div>
      <div class="seco">
        <div class="tab-a">
          <div class="item">
            <div class="top">
              <div class="num">0/50</div>
              <div class="danwei">TB</div>
            </div>
            <div class="bot">磁盘空间</div>
          </div>
          <div class="item">
            <div class="top top-item">
              <div class="top-mid">
                <div class="num">30.5</div>
                <div class="danwei" style="margin-left: 5px">%</div>
              </div>
              <div class="top-mid">
                <div class="num">0</div>
                <div class="danwei">个</div>
              </div>
            </div>
            <div class="bot">磁盘空间</div>
          </div>
        </div>
        <div class="tab-b">
          <div class="item">
            <div class="top">
              <div class="num">46.20</div>
              <div class="danwei">%</div>
            </div>
            <div class="bot">内存</div>
          </div>
          <div class="item">
            <div class="top">
              <div class="num">46.20</div>
              <div class="danwei">%</div>
            </div>
            <div class="bot">内存</div>
          </div>
          <div class="item">
            <div class="top">
              <div class="num">46.20</div>
              <div class="danwei">%</div>
            </div>
            <div class="bot">内存</div>
          </div>
        </div>
      </div>
    </div>
    <div class="task-table">
      <div class="tot-title">
        任务监控
      </div>
      <el-table class="table-content" v-loading="loading" :data="roleList" 
      :row-class-name="tableRowClassName"
      :header-cell-style="{
            background: 'rgb(236,241,252)',
            color: '#333',
            'text-align': 'center',
          }" :cell-style="{ 'text-align': 'center' }">
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
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  data(){
    return {
      num1: 4000,
      num2: 220,
      num3: 13,
      num4: 160,
      loading: false,
      getHeaders: [
        {
          prop: 'jobName',
          label: '任务名称',
          width: '150'
        },
       
        {
          prop: 'status',
          label: '状态',
          width: '180'
        },
      ],
      roleList:[
        {
          jobName: '任务A',
          status:'执行中',
        },
        {
          jobName: '任务A',
          status:'执行中',
        },
        {
          jobName: '任务A',
          status:'执行中',
        },
        {
          jobName: '任务A',
          status:'执行中',
        },
        {
          jobName: '任务A',
          status:'执行中',
        },
        {
          jobName: '任务A',
          status:'执行中',
        },
        {
          jobName: '任务A',
          status:'执行中',
        },
        {
          jobName: '任务A',
          status:'执行中',
        }
      ]
    }
  },
  mounted(){

  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "";
      } else {
        return "warning-row";
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .task {
    position: absolute;
    top: 96px;
    left: 16px;
    z-index: 999;
    overflow: hidden;
    width: 420px;
    height: 828px;
    background: #fff;
    // border: 1px solid pink;
  }
  .tot-title {
    width: 420px;
    height: 41px;
    background: url('~@/assets/images/top_bg.png');
    background-size: contain;
    line-height: 41px;
    padding-left: 36px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
  .middle {
    padding: 0px 17px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .list {
      width: 186px;
      height: 64px;
      margin-top: 16px;
      .name {
        // text-align: center;
        margin-top: 8px;
        color: #333;
        margin-left:68px;
      }
      .num {
        display: flex;
        // justify-content: center;
        margin-top: 4px;
        .number {
          font-size: 20px;
          margin-left:68px;
        }
        .danwei {
          height: 23px;
          line-height: 23px;
          margin-left: 10px;
        }
      }
    }
    .list:first-child {
      background: url('~@/assets/images/red.png');
      background-size: contain;
    }
    .list:nth-child(2) {
      background: url('~@/assets/images/yellow.png');
      background-size: contain;
    }
    .list:nth-child(3) {
      background: url('~@/assets/images/orange.png');
      background-size: contain;
    }
    .list:nth-child(4) {
      background: url('~@/assets/images/blue.png');
      background-size: contain;
    }
    .list {
    }
  }
  .tab-a {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    .item {
      width: 138px;
      height: 99px;
      background: url('~@/assets/images/dizuo.png');
      background-size: contain;
      .top {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        .num {
          color: #488CFF;
          font-size: 26px;
          font-style: italic;
          font-weight: bold;
        }
        .danwei {
          height: 34px;
          line-height: 34px;
          color: #999999;
          font-size: 16px;
          margin-left: 10px;
        }
        .top-mid {
          display: flex;
          // justify-content: space-between;
        }
      }
      .top-item {
        display: flex;
        justify-content: space-between;
      }
      .bot {
        text-align: center;
        color: #666666;
        margin-top: 48px;
        font-size: 16px;
      }
    }
  }
  .tab-b {
    display: flex;
    justify-content: space-evenly;
    margin-top: 37px;
    .item {
      width: 120px;
      height: 52px;
      background: url('~@/assets/images/duijiao.png');
      background-size: contain;
      .top {
        display: flex;
        .num {
          color: #488CFF;
          font-size: 20px;
          margin-left: 19px;
        }
        .danwei {
          color: #999999;
          margin-left: 8px;
          height:23px;
          line-height: 23px;
        }
      }
      .bot {
        margin-left: 19px;
        margin-top: 8px;
        color: #666;
      }
    }
  }
  .task-table {
    margin-top: 20px;
  }
  .table-content {
    margin-top: 10px;
    height: 300px;
    width: 100%;
    // overflow-y: auto;
    /deep/ .el-table__header-wrapper {
      width: 100%;
      .el-table__header {
        width: 100% !important;
      }
    }
    /deep/ .el-table__body-wrapper {
      height: 230px;
      overflow-y: auto !important;
    }
  }
// 去掉最下面的那一条线 
.el-table::before {
  height: 0px;
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
</style>