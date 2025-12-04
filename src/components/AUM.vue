<template>
  <div class="hello">
    <h2 style="padding-top: 30px;margin-bottom: 30px;">直营考核AUM新增计算器</h2>

    <el-form ref="form" :model="form" label-width="auto">

    <div class="item">

      <el-divider content-position="left" class="divider">基础数据</el-divider><br>
      <el-form-item label="上年末">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.last_year_date" style="width: 55vw;" readonly="readonly"></el-date-picker>
        </el-col>
      </el-form-item>
    
      <el-form-item label="今日">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.today_date" style="width: 55vw;" readonly="readonly"></el-date-picker>
        </el-col>
      </el-form-item>
    
      <el-form-item label="时点日均更新">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.current_aum_update_date" style="width: 55vw;" readonly="readonly"></el-date-picker>
        </el-col>
      </el-form-item>
    
      <el-form-item label="年日均更新">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.annual_aum_update_date" style="width: 55vw;" readonly="readonly"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="年日均计算天数">
        <el-input type=“number” style="width: 55vw;" :value="annual_aum_days" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item label="时点日均计算天数">
        <el-input type=“number” style="width: 55vw;" :value="current_aum_days" readonly="readonly"></el-input>
      </el-form-item>
    </div>

    <div class="item">

      <el-divider content-position="left" class="divider">查询输入</el-divider><br>
      <el-form-item label="目前时点日均AUM"
        prop="now_aum"
        :rules="[
         { required: true, message: 'AUM不能为空'},
         {
            validator: function(rule, value, callback) {
              if (/^(-?\d+)(\.\d+)?$/.test(value) == false) {
                callback('请输入AUM');
              } else {
                //校验通过
                callback();
              }
            },
            trigger: 'blur'
          }
        ]">
        <el-input v-model="form.now_aum" type=“number” style="width: 55vw;"></el-input>
      </el-form-item>
    
      <el-form-item label="上月年日均AUM"
        prop="last_month_aum"
        :rules="[
         { required: true, message: 'AUM不能为空'},
         {
            validator: function(rule, value, callback) {
              if (/^(-?\d+)(\.\d+)?$/.test(value) == false) {
                callback('请输入AUM');
              } else {
                //校验通过
                callback();
              }
            },
            trigger: 'blur'
          }
      ]">
        <el-input v-model="form.last_month_aum" style="width: 55vw;"></el-input>
      </el-form-item>
    
      <el-form-item label="上年末年日均AUM"
        prop="last_year_aum"
        :rules="[
         { required: true, message: 'AUM不能为空'},
         {
            validator: function(rule, value, callback) {
              if (/^(-?\d+)(\.\d+)?$/.test(value) == false) {
                callback('请输入AUM');
              } else {
                //校验通过
                callback();
              }
            },
            trigger: 'blur'
          }
      ]">
        <el-input v-model="form.last_year_aum" style="width: 55vw;"></el-input>
      </el-form-item>

      <el-form-item>
          <el-button type="success" @click="onClick">立即计算</el-button>
          <el-button type="danger">清空</el-button>
        </el-form-item>

    </div>

    <div class="item">

      <el-divider content-position="left" class="divider">输出数据</el-divider><br>
      <el-form-item label="目前年日均" label-width="35vw">
        <el-input v-model="form.now_annual_aum" type=“number” style="width: 55vw;" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item :label=computedLabel1 label-width="35vw">
        <el-input v-model="form.increase_aum1" type=“number” style="width: 55vw;" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item :label=computedLabel2 label-width="35vw">
        <el-input v-model="form.increase_aum2" type=“number” style="width: 55vw;" readonly="readonly"></el-input>
      </el-form-item>

    </div>
    
  </el-form>


  </div>
</template>

<script>
export default {
  name: 'AUM',
  data() {
      return {
        form: {
          last_year_date: this.getLastDayOfLastYear(),
          today_date: new Date(),
          current_aum_update_date: this.getPastDate(2),
          annual_aum_update_date: this.lastMonthLast(),
          now_aum: '',
          last_month_aum: '',
          last_year_aum: '',
          now_annual_aum: '',
          increase_aum1: '',
          increase_aum2: ''
        }

      }
    },
    computed: {
      annual_aum_days() {
        // 将日期字符串转换为日期对象
        const startDate = new Date(this.getLastDayOfLastYear());
        const endDate = new Date(this.lastMonthLast());

        // 计算时间差（以毫秒为单位）
        const timeDiff = endDate - startDate;

        // 将毫秒转换为天
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        return Math.abs(daysDiff); // 返回绝对值，避免负数
        
      },
      current_aum_days() {

        const startDate = new Date(this.getPastDate(2));
        const endDate = new Date(this.lastMonthLast());

        // 计算时间差（以毫秒为单位）
        const timeDiff = endDate - startDate;

        // 将毫秒转换为天
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        return Math.abs(daysDiff); // 返回绝对值，避免负数
      },
      computedLabel1() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        return year + '年' + month + '月及以前添客年日均新增';
      },
      computedLabel2() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        return year + '年' + month + '月及以后添客年日均新增';
      }
    },
    methods: {
      onClick() {
        this.form.now_annual_aum = ((this.annual_aum_days * this.form.last_month_aum + this.current_aum_days * this.form.now_aum) / (this.annual_aum_days + this.current_aum_days)).toFixed(2)
        this.form.increase_aum1 = (this.form.now_annual_aum - this.form.last_year_aum).toFixed(2);
        this.form.increase_aum2 = (this.form.now_annual_aum - this.form.last_month_aum).toFixed(2);
      },
      getLastDayOfLastYear() {
        const now = new Date();
        const lastYear = now.getFullYear() - 1;
        return `${lastYear}-12-31`;
      },
      lastMonthLast() {
	      var time=new Date();
	      var year=time.getFullYear();
	      var month=time.getMonth();
	      var day=time.getDate();
	      if(month<10){
	      	month="0"+month;
	      }
	      if(month==0){
	      	year=year-1;
	      	month = 12;
	      }		
      
	      var lastday=new Date(year,month,0).getDate();
	      //上个月的最后一天
	      var v2=year+'-'+month+'-'+lastday;
           return v2;		
      },
      getPastDate(daysAgo) {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0]; // 返回 YYYY-MM-DD 格式
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.item {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.251), 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding-top: 10px; /* 内部上边距 */
  padding-bottom: 10px; /* 内部下边距 */
  margin-bottom: 30px;
}
.divider {
  margin-bottom: 10px;
}
.easter-egg {
  display: block;
  width: 90vw;
  height: auto;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}


</style>
