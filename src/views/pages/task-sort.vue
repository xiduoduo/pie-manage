<template>
  <div class="task-sort">
    <div class="form-content">
      <el-form
        :model="queryParams"
        ref="queryForm"
        class="breadcrumb"
        :inline="true">
        <el-form-item label="业务分类" prop="taskSort">
          <el-select
            v-model="queryParams.taskSort"
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
        <el-button type="primary" @click="add()" size="mini">添加</el-button>
        <el-button type="success" size="mini">批量启用</el-button>
        <el-button type="warning" size="mini">批量禁用</el-button>
        <el-button type="danger" size="mini">批量删除</el-button>
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
              @click="handleManage(scope.row)"
              >规则管理</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleStart(scope.row)"
              style="color:#00B645"
              >启用</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDisable(scope.row)"
              style="color:#FDBA22"
              >禁用</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleLog(scope.row)"
              >任务日志</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
              style="color:#F53A28"
              >删除</el-button
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
    
    <!-- 添加 -->
    <el-dialog
      :visible.sync="addDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog"
      >
      <div class="add-title">
        <div class="title">添加任务</div>
        <div class="close" @click="addDialogVisible = false;"></div>
      </div>
      <div class="dia-content">
        <el-col :span="12" class="collectionClass">
          <div class="name">
            <div class="name-title">业务名称</div>
            <el-input
              v-model="businessName"
              placeholder="请输入业务名称"
              clearable
              size="small"
              style="width: 320px"
            />
          </div>
        </el-col>
        <el-col :span="12" class="collectionClass">
          <div class="name">
            <div class="name-title">业务分类</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 320px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        
      </div>
      <div class="dia-content">
        <el-col :span="12" class="collectionClass">
          <div class="name">
            <div class="name-title">开始时间</div>
            <el-date-picker
              v-model="time1"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm:ss"
              size="small"
              style="width: 320px"
              placeholder="选择日期时间"
              :disabled="dialogType=='copy'">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="12" class="collectionClass">
          <div class="name">
            <div class="name-title">结束时间</div>
            <el-date-picker
              v-model="time2"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm:ss"
              size="small"
              style="width: 320px"
              placeholder="选择日期时间"
              :disabled="dialogType=='copy'">
            </el-date-picker>
          </div>
        </el-col>
        
      </div>
      <div class="dia-content">
        <el-col :span="12" class="collectionClass">
          <div class="name">
            <div class="name-title">任务区域</div>
            <el-input
              v-model="taskArea"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 320px"
            />
          </div>
        </el-col>
        <el-col :span="12" class="collectionClass">
          <el-button type="primary">绘制</el-button>
          <el-button type="primary">上传</el-button>
          <el-button>清空</el-button>
        </el-col>
        
      </div>
      <div class="dia-content">
        <el-col :span="12" class="collectionClass">
          <div class="name">
            <div class="name-title">任务区域</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 320px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </div>
       <div class="dia-content">
        <el-col :span="24" class="collectionClass">
          <div class="name">
            <div class="name-title">任务描述</div>
            <el-input
              v-model="taskDes"
              placeholder="请输入业务名称"
              clearable
              type="textarea"
              size="small"
              style="width: 740px"
            />
          </div>
        </el-col>
      </div>
      <div class="bot-btns">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
        <el-button type="warning">规则配置</el-button>
      </div>
    </el-dialog>

    <!-- 规则管理 -->
    <el-dialog
      :visible.sync="manageDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog manage-dialog"
      >
      <div class="add-title">
        <div class="title">规则管理</div>
        <div class="close" @click="manageDialogVisible = false;"></div>
      </div>
      <div class="dia-content">
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数名称</div>
            <el-input
              v-model="businessName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 170px"
            />
          </div>
        </el-col>
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数类型</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 170px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" class="collectionClass">
          <div class="name">
            <div class="name-title">卫星ID</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 270px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        
      </div>
      <div class="dia-content">
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数名称</div>
            <el-input
              v-model="businessName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 170px"
            />
          </div>
        </el-col>
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数类型</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 170px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" class="collectionClass">
          <div class="name">
            <div class="name-title">载荷ID</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 270px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </div>
      <div class="dia-content">
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数名称</div>
            <el-input
              v-model="businessName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 170px"
            />
          </div>
        </el-col>
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数类型</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 170px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" class="collectionClass">
          <div class="name">
            <div class="name-title">数据种类</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 270px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        
      </div>
      <div class="dia-content">
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数名称</div>
            <el-input
              v-model="businessName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 170px"
            />
          </div>
        </el-col>
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数类型</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 170px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" class="collectionClass">
          <div class="name">
            <div class="name-title">数据种类</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 270px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        
      </div>
      <div class="relationship">
        <div class="rela-img"></div>
        <div class="text">关联关系</div>
      </div>
      <div class="dia-content">
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数名称</div>
            <el-input
              v-model="businessName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 170px"
            />
          </div>
        </el-col>
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数类型</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 170px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" class="collectionClass">
          <div class="name">
            <div class="name-title">数据种类</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 270px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </div>
      <div class="dia-content">
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数名称</div>
            <el-input
              v-model="businessName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 170px"
            />
          </div>
        </el-col>
        <el-col :span="7" class="collectionClass">
          <div class="name">
            <div class="name-title">参数类型</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 170px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" class="collectionClass">
          <div class="name">
            <div class="name-title">数据种类</div>
            <el-select
              v-model="businessClassify"
              placeholder="请选择"
              clearable
              size="small"
              style="width: 270px"
              :disabled="dialogType=='copy'"
            >
              <el-option
                v-for="item in taskOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </div>
    </el-dialog>

    <!-- 启用 -->
    <el-dialog
      :visible.sync="startDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog start-dialog"
      >
      <div class="add-title">
        <div class="title">启用</div>
        <div class="close" @click="startDialogVisible = false;"></div>
      </div>
      <div class="mid">
        <div class="img"></div>
        <div class="text">是否确认启用？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="startDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="startDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 禁用 -->
    <el-dialog
      :visible.sync="disableDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog start-dialog"
      >
      <div class="add-title">
        <div class="title">禁用</div>
        <div class="close" @click="disableDialogVisible = false;"></div>
      </div>
      <div class="mid">
        <div class="img disable-img"></div>
        <div class="text">是否确认禁用？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disableDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="disableDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog
      :visible.sync="deleteDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog start-dialog"
      >
      <div class="add-title">
        <div class="title">删除</div>
        <div class="close" @click="deleteDialogVisible = false;"></div>
      </div>
      <div class="mid">
        <div class="img delete-img"></div>
        <div class="text">是否确认删除？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = true">取 消</el-button>
        <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 任务日志 -->
    <el-dialog
      :visible.sync="logDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog log-dialog"
      >
      <div class="add-title">
        <div class="title">任务日志</div>
        <div class="close" @click="logDialogVisible = false;"></div>
      </div>
      <div class="form-content">
        <el-form
          :model="queryParams"
          ref="queryForm"
          class="breadcrumb"
          :inline="true">
          <el-form-item label="流程任务状态" prop="taskSort">
            <el-select
              v-model="queryParams2.processStatus"
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
              v-model="queryParams2.dateRange"
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
        
      </div>
      <div class="table-list">
        <el-table
          v-loading="loading2"
          :data="roleList2"
          :header-cell-style="{
            background: 'rgb(236,241,252)',
            color: '#333',
            'text-align': 'center',
          }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange2"
          
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
            v-for="(item, index) in getHeaders2"
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
                @click="handleReStart(scope.row,1)"
                >重新开始</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleReStart(scope.row,2)"
                >重试</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleReStart(scope.row,3)"
                style="color:#00B645"
                >暂停</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleReStart(scope.row,4)"
                style="color:#FDBA22"
                >恢复</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleReStart(scope.row,5)"
                >停止</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row)"
                style="color:#F53A28"
                >删除</el-button
              >

            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="page"
          style="padding-right:20px"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="queryParams2.pageNum"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal2">
        </el-pagination>
      </div>
    </el-dialog>

    <!-- 重新开始 -->
    <el-dialog
      :visible.sync="deleteDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog start-dialog"
      >
      <div class="add-title">
        <div class="title">删除</div>
        <div class="close" @click="deleteDialogVisible = false;"></div>
      </div>
      <div class="mid">
        <div class="img delete-img"></div>
        <div class="text">是否确认删除？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = true">取 消</el-button>
        <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 重试、暂停、恢复、停止 -->
    <el-dialog
      :visible.sync="taskDialogVisible"
      :modal-append-to-body="false"
      class="add-dialog start-dialog"
      >
      <div class="add-title">
        <div class="title">{{reText}}</div>
        <div class="close" @click="taskDialogVisible = false;"></div>
      </div>
      <div class="mid">
        <div class="img" :class="reClass" ></div>
        <div class="text">是否确认{{reText}}？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskDialogVisible = true">取 消</el-button>
        <el-button type="primary" @click="taskDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'taskSort',
  data(){
    return {
      reClass:'',
      reImg:'@/assets/images/chahao.png',
      reText:'',
      loading:false,
      loading2:false,
      time1:'',
      time2:'',
      taskArea:'',
      taskDes:'',
      businessName:'',
      roleName:'',
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        taskSort: '',
        dateRange:[]
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 100,
        taskSort: '',
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
          prop: 'taskName',
          label: '任务名称',
          width: '200'
        },
        {
          prop: 'startTime',
          label: '开始时间',
          width: '220'
        },
        {
          prop: 'endTime',
          label: '结束时间',
          width: '220'
        },
        {
          prop: 'taskArea',
          label: '任务区域',
          width: '200'
        },{
          prop: 'mianProcess',
          label: '关键流程',
          width: '200'
        },{
          prop: 'taskDescribe',
          label: '任务描述',
          width: '220'
        },
       
      ],
      roleList: [
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },
       {
        taskName:'任务A',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        taskArea:'区域XXX',
        mianProcess:'流程XXX',
        taskDescribe:'XXXXXXXXXXXXXXXXXX X',
       },

      ],
      getHeaders2: [
        {
          prop: 'processName',
          label: '流程名称',
          width: '200'
        },
        {
          prop: 'businessClassify',
          label: '业务分类',
          width: '220'
        },
        {
          prop: 'startTime',
          label: '结束时间',
          width: '220'
        },
        {
          prop: 'endTime',
          label: '结束时间',
          width: '220'
        },
        {
          prop: 'processStatus',
          label: '流程状态',
          width: '200'
        },{
          prop: 'address',
          label: '访问地址',
          width: '200'
        }
      ],
      roleList2:[
        {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
       {
        processName:'processName',
        businessClassify: '浙江三期',
        startTime:'2021-04-17 12:33:43',
        endTime:'2021-04-17 12:33:43',
        processStatus:'未完成',
        address:'流程XXX',
        taskDescribe:'http://120.46.234…',
       },
      
      ],
      c
      multipleSelection2: [],
      pageTotal: 0,
      pageTotal2: 0,
      addDialogVisible: false,
      manageDialogVisible: false,
      startDialogVisible: false,
      disableDialogVisible: false,
      deleteDialogVisible: false,
      logDialogVisible: false,
      taskDialogVisible: false,
    }
  },
  mounted(){
    this.pageTotal = this.roleList.length;
    this.pageTotal2 = this.roleList2.length;
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
        taskSort: this.queryParams.taskSort,
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
    add(){
      this.addDialogVisible = true;
    },
    // manage(){
    //   this.manageDialogVisible = true;
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange2(val) {
      this.multipleSelection = val;
    },

    // 规则管理
    handleManage(row) {
      this.row = row;
      this.manageDialogVisible = true;
    },
    // 详情
    handleDetail(row) {
      this.row = row;
    },
    // 启用
    handleStart(row) {
      this.row = row;
      this.startDialogVisible = true;
    },
    // 禁用
    handleDisable(row) {
      this.row = row;
      this.disableDialogVisible = true;
    },
    // 任务日志
    handleLog(row) {
      this.row = row;
      this.logDialogVisible = true;
    },
    handleDelete(row) {
      this.row = row;
      this.deleteDialogVisible = true;
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      this.getList();
    },

    // dialog table 操作
    // 重新开始
     handleReStart(row,num) {
      this.row = row;
      this.taskDialogVisible = true;
      if(num==1){
        this.reText = "重新开始"
        this.reClass="reStart"
      }else if(num==2){
        this.reText = "重试"
        this.reClass="chongshi"
      }else if(num==3){
        this.reText = "暂停"
        this.reClass="zanting"
      }else if(num==4){
        this.reText = "恢复"
        this.reClass="huifu"
      }else if(num==5){
        this.reText = "停止"
        this.reClass="tingzhi"
      }
    },
    // 重试
     handleReTry(row) {
      this.row = row;
    },
    // 暂停
     handleSuspend(row) {
      this.row = row;
    },
    // 恢复
     handleRestore(row) {
      this.row = row;
    },
    // 停止
     handleStop(row) {
      this.row = row;
    },
    handleSizeChange2(val) {
      this.queryParams2.pageSize = val;
      this.getList();
    },
    handleCurrentChange2(val) {
      this.queryParams2.pageNum = val;
      this.getList();
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
.add-title {
  width: 100%;
  height: 44px;
  background: url('~@/assets/images/add-title.png');
  background-size: cover;
  display: flex;
  justify-content: space-between;
  .title {
    height: 44px;
    line-height:44px;
    margin-left: 40px;
    color: #fff;
    font-size: 18px;
  }
  .close {
    width: 24px;
    height: 24px;
    background: url('~@/assets/images/close.png');
    background-size: cover;
    margin-top: 8px;
    margin-right: 8px;
  }
}
.dia-content {
  padding: 7px 20px;
  display: flex;
  justify-content: space-between;
  .name {
    height: 40px;
    line-height: 40px;
    .name-title {
      padding-right: 20px;
    }
  }
}
.manage-dialog .dia-content .name .name-title {
  padding-right: 5px;
}
.collectionClass {
  
}
.collectionClass>div {
  display: flex;
}
.bot-btns {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  /deep/ .el-button:not(first-child) {
    margin-left: 20px;
  }
}
.relationship {
  width: 100%;
  height: 44px;
  padding-left: 20px;
  font-size: 14px;
  display: flex;
  .rela-img {
    width: 24px;
    height: 24px;
    background: url('~@/assets/images/close.png');
    background-size: cover;
    margin-top: 10px;
  }
  .text {
    height: 44px;
    line-height: 44px;
    color: #666;
    margin-left: 10px;
  }
}
.start-dialog /deep/ .el-dialog {
  width: 426px !important;
  height: 254px !important;
}
.start-dialog /deep/ .el-dialog__footer {
  text-align: center;
}
.start-dialog {
  .mid {
    display: flex;
    justify-content: center;
    height: 140px;
    line-height: 140px;
    .img {
      background: url('~@/assets/images/duigou.png');
      width: 24px;
      height: 24px;
      background-size: cover;
      margin-top: 58px;
    }
    .disable-img {
      background: url('~@/assets/images/tanhao.png');
      background-size: cover;
    }
    .delete-img {
      background: url('~@/assets/images/chahao.png');
      background-size: cover;
    }
    .reStart {
      background: url('~@/assets/images/reStart.png');
      background-size: cover;
    }
    .chongshi {
      background: url('~@/assets/images/chongshi.png');
      background-size: cover;
    }
    .zanting {
      background: url('~@/assets/images/zanting.png');
      background-size: cover;
    }
    .huifu {
      background: url('~@/assets/images/huifu.png');
      background-size: cover;
    }
    .tingzhi {
      background: url('~@/assets/images/tingzhi.png');
      background-size: cover;
    }
    .text {
      margin-left: 10px;
    }
  }
}
.log-dialog /deep/ .el-dialog {
  width: 1744px !important;
  height: 800px !important;
  margin-top: 9vh !important;
}
.log-dialog .table-list {
  height: 65vh;
}
.log-dialog .table-list .el-table /deep/ .el-table__body-wrapper{
  height: 550px !important;
}
</style>