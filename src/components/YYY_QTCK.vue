<template>
  <div class="yyy_qtck">
    <h2 style="padding-top: 30px;margin-bottom: 30px;">资产提升月月赢+保有活动+<br>7天通知存款计算器</h2>

    <el-form :model="form" label-position="top" label-width="100vw" class="custom-form">
      <div class="item">

        <el-divider content-position="left" class="divider">查询输入</el-divider><br>
        <el-form-item label="开始日期" label-width="50vw">
          <el-col :span="11">
            <el-date-picker type="date" class="custom-date-picker" placeholder="选择日期" v-model="form.start_date" readonly="readonly" style="width: 65vw;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="测算日期">
          <el-col :span="11">
            <el-date-picker type="date" class="custom-date-picker" placeholder="选择日期" v-model="form.calculate_date" style="width: 65vw;"></el-date-picker>
          </el-col>
        </el-form-item>

        <!--last_month_aum-->
        <el-form-item label="上月月日均（万元）"
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
          <el-input v-model="form.last_month_aum" type=“number” style="width: 90vw;"></el-input>
        </el-form-item>

        <!--last_month_time_aum-->
        <el-form-item label="上月末时点（万元）"
                      prop="last_month_time_aum"
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
          <el-input v-model="form.last_month_time_aum" type=“number” style="width: 90vw;"></el-input>
        </el-form-item>

        <!--estimate_aum-->
        <el-form-item label="本月当月已有月日均预估（万元）"
                      prop="last_month_time_aum"
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
          <el-input v-model="form.estimate_aum" type=“number” style="width: 90vw;"></el-input>
        </el-form-item>

        <!--this_month_aum-->
        <el-form-item label="本月当月已有时点（万元）"
                      prop="last_month_time_aum"
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
          <el-input v-model="form.this_month_aum" type=“number” style="width: 90vw;"></el-input>
        </el-form-item>

        <!--new_aum-->
        <el-form-item label="测算日起新存入资金（至少持有至下月10日）（万元）"
                      prop="estimate_aum"
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
          <el-input v-model="form.new_aum" style="width: 90vw;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onClick">立即计算</el-button>
          <el-button @click="doClean">清空</el-button>
        </el-form-item>

      </div>


      <div class="item">

        <el-divider content-position="left" class="divider">输出数据</el-divider><br>
        <el-form-item label="当月月日均（万元）" label-width="40vw">
          <el-input v-model="form.this_month_aum_real" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="月日均提升值（月月赢）（万元）" label-width="40vw">
          <el-input v-model="form.increase_aum_avg" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="时点提升值（至少）（万元）" label-width="40vw">
          <el-input v-model="form.increase_aum_time" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="享受月月赢立减金收益" label-width="40vw">
          <el-input v-model="form.ljj_rights" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="享受资产提升保有礼收益" label-width="40vw">
          <el-input v-model="form.byl_rights" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="享受7天通知存款收益" label-width="40vw">
          <el-input v-model="form.deposit_rights" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="总收益" label-width="40vw">
          <el-input v-model="form.total_rights" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>

        <el-form-item label="年化收益率" label-width="40vw">
          <el-input v-model="form.annual_rights_rate" type=“number” style="width: 90vw;" readonly="readonly"></el-input>
        </el-form-item>
      </div>

      <div class="item speech_div" v-if="this.form.speech_display">
        <el-divider content-position="left" class="divider">文字话术</el-divider><br>

        <div class="speech_text">
          相当于您只要转入<span>{{this.form.new_aum}}</span>万元，并存入7天通知存款（年利率0.65%），
        且持有到下个月10号，就可以拿利息<span>{{this.form.deposit_rights}}</span>元
        <label v-if="'string' !== this.form.ljj_type">，同时还可以享受立减金<span>{{this.form.ljj_rights}}</span>元</label> 。
        <label v-if="'string' !== this.form.byl_type">您还可以参与我行资产提升保有礼活动，资金保持到下月10号不下降还能额外拿到<span>{{this.form.byl_rights}}</span>万元等值奖励，</label>
        <label v-if="'string' !== this.form.ljj_type || 'string' !== this.form.byl_type">利息加等值奖励合计<span>{{this.form.total_rights}}</span>元，</label>
          就相当于至少年化收益率<span>{{this.form.annual_rights_rate}}</span>。
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'YYY_QTCK',
  data() {
    return {
      form: {
        start_date: '',
        last_month_aum: '',
        last_month_time_aum: '',
        estimate_aum: '',
        this_month_aum: '',
        calculate_date: '',
        new_aum: '',
        this_month_aum_real: '',
        increase_aum_avg: '',
        increase_aum_time: '',
        ljj_rights: '',
        byl_rights: '',
        ljj_type: 'number',
        byl_type: 'number',
        deposit_rights: '',
        total_rights: '',
        annual_rights_rate: '',
        speech_display: false,
      },
      json_data: ''
    };
  },
  mounted() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 补零处理
    const date = now.getDate();
    this.form.start_date =  `${year}-${month}-01`;
    this.form.calculate_date = `${year}-${month}-${date}`;
    var file_path = "/stock.txt";
    this.loadJsonData(file_path);
    console.log(this.json_data)

  },
  methods: {
    // 读取JSON文件并存储到jsonData中
    async loadJsonData(path) {
      try {
        const response = await fetch('/stock.txt'); // 加载JSON文件
        const data = await response.json();
        this.json_data = data; // 存储到jsonData中
        this.$message({
          message: 'JSON文件读取成功',
          type: 'success'
        });
        console.log("JSON文件读取成功：", this.json_data);
      } catch (error) {
        this.$message.error('读取文件失败');
        console.error("读取文件失败：", error);
      }
    },
    doClean() {
      this.form.last_month_aum = '';
      this.form.last_month_time_aum = '';
      this.form.last_month_time_aum = '';
      this.form.last_month_time_aum = '';
      this.form.new_aum = '';
      this.form.speech_display = false;
    },
    onClick() {
      this.form.ljj_type = 'number';
      this.form.byl_type = 'number';

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // JavaScript 的月份从 0 开始，所以要 +1\
      this.form.this_month = month;
      const count_of_days =  new Date(year, month, 0).getDate();

      this.form.this_month_aum_real = ((this.form.new_aum * (count_of_days - this.getDaysBetween(this.form.calculate_date, this.form.start_date)) + this.form.estimate_aum * count_of_days) / count_of_days).toFixed(2);
      this.form.increase_aum_avg = (this.form.this_month_aum_real - this.form.last_month_aum).toFixed(2);
      this.form.increase_aum_time = (this.form.new_aum * 1 + this.form.this_month_aum * 1 - this.form.last_month_time_aum).toFixed(2);

      if (this.form.increase_aum_avg >= 600) {
        this.form.ljj_rights = 4800
      }else if (this.form.increase_aum_avg >= 300) {
        this.form.ljj_rights = 2400
      }else if (this.form.increase_aum_avg >= 100) {
        this.form.ljj_rights = 800
      }else if (this.form.increase_aum_avg >= 50) {
        this.form.ljj_rights = 400
      }else if (this.form.increase_aum_avg >= 20) {
        this.form.ljj_rights = 160
      }else if (this.form.increase_aum_avg >= 5) {
        this.form.ljj_rights = 40
      }else if (this.form.increase_aum_avg >= 1) {
        this.form.ljj_rights = 10
      }else if (this.form.increase_aum_avg >= 0.2) {
        this.form.ljj_rights = '抽奖'
        this.form.ljj_type = 'string'
      } else {
        this.form.ljj_rights = ''
        this.form.ljj_type = 'string'
      }

      if (this.form.increase_aum_time >= 600) {
        this.form.byl_rights = 3000
      }else if (this.form.increase_aum_time >= 400) {
        this.form.byl_rights = 2000
      }else if (this.form.increase_aum_time >= 200) {
        this.form.byl_rights = 1000
      }else if (this.form.increase_aum_time >= 100) {
        this.form.byl_rights = 500
      }else if (this.form.increase_aum_time >= 50) {
        this.form.byl_rights = 250
      }else if (this.form.increase_aum_time >= 20) {
        this.form.byl_rights = 100
      }else {
        this.form.byl_rights = ''
        this.form.byl_type = 'string'
      }

      var ljj = this.json_data.ljj.find(ljj => this.form.ljj_rights === ljj.id);
      if (ljj.stock !== 1) {
        this.form.ljj_rights = '已兑完'
        this.form.ljj_type = 'string'
      }

      var byl = this.json_data.byl.find(byl => this.form.byl_rights === byl.id);
      if (byl.stock !== 1) {
        this.form.byl_rights = '已兑完'
        this.form.byl_type = 'string'
      }

      this.form.deposit_rights = (this.form.new_aum * 0.0065 * ((count_of_days + 10) - this.getDaysBetween(this.form.calculate_date, this.form.start_date) - 1) / 360 * 10000).toFixed(2);
      this.form.total_rights = this.form.deposit_rights;
      if ('string' !== this.form.ljj_type) {
        this.form.total_rights = this.form.total_rights * 1 + this.form.ljj_rights * 1;
      }
      if ('string' !== this.form.byl_type) {
        this.form.total_rights = this.form.total_rights * 1 + this.form.byl_rights * 1;
      }
      this.form.total_rights = (this.form.total_rights * 1).toFixed(2);

      this.form.annual_rights_rate = (this.form.total_rights / this.form.new_aum / 10000 / ((count_of_days + 10) - this.getDaysBetween(this.form.calculate_date, this.form.start_date) - 1) * 360 * 100).toFixed(2) + '%'

      this.form.speech_display = true;
    },
    getDaysBetween(date1, date2) {
      const timeDiff = Math.abs(new Date(date2) - new Date(date1)); // 计算时间差（毫秒）
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 转换为天数
    }
  }
};
</script>

<style>
.custom-form .el-form-item__label {
  text-align: left !important;
  float: left !important;
  font-size: 16px; /* 略微放大字体 */
  margin-left: 10px; /* 增加左侧间距 */
}
h3 {
  margin: 40px 0 0;
}
.item {
  width: 100vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.251), 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding-top: 10px; /* 内部上边距 */
  padding-bottom: 10px; /* 内部下边距 */
  margin-bottom: 30px;
}
.divider {
  margin-bottom: 10px;
}
.custom-date-picker {
  margin-left: 8vw;
}
.speech_div {
  display: flex;
  flex-direction: column;
  height: 250px;
  position: relative;
}
.speech_text {
  display: inline-block; /* 让其本身按内容适配 */
  width: 90vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.speech_text span {
  display: inline;
  font-weight: bold;
  color: #006fff;
  font-size: 20px;
}
</style>