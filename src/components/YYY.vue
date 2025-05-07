<template>
  <div class="yyy">
    <h2 style="padding-top: 30px;margin-bottom: 30px;">资产提升月月赢+通知存款计算器</h2>

    <el-form ref="form" :model="form" label-width="auto">

    <div class="item">

      <el-divider content-position="left" class="divider">查询输入</el-divider><br>
      <el-form-item label="开始日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.start_date" style="width: 49vw;" readonly="readonly"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="前三个月最大月日均（万元）"
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
        <el-input v-model="form.last_month_aum" type=“number” style="width: 48vw;"></el-input>
      </el-form-item>

      <el-form-item label="当月已有月日均预估（万元）"
                    prop="this_month_aum"
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
        <el-input v-model="form.this_month_aum" style="width: 48vw;"></el-input>
      </el-form-item>

      <el-form-item label="测算日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.caculate_date" style="width: 49vw;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="测算日起新存入资金（至少持有至月底）（万元）" label-width="42vw"
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
        <el-input v-model="form.estimate_aum" style="width: 48vw;"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onClick">立即计算</el-button>
        <el-button @click="doClean">清空</el-button>
      </el-form-item>

    </div>


    <div class="item">

      <el-divider content-position="left" class="divider">输出数据</el-divider><br>
      <el-form-item label="当月月日均（万元）" label-width="40vw">
        <el-input v-model="form.this_month_aum_real" type=“number” style="width: 50vw;" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item label="提升值（万元）" label-width="40vw">
        <el-input v-model="form.increase_aum" type=“number” style="width: 50vw;" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item label="享受月月赢立减金收益" label-width="40vw">
        <el-input v-model="form.ljj_rights" type=“number” style="width: 50vw;" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item label="享受7天通知存款收益" label-width="40vw">
        <el-input v-model="form.deposit_rights" type=“number” style="width: 50vw;" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item label="总收益" label-width="40vw">
        <el-input v-model="form.total_rights" type=“number” style="width: 50vw;" readonly="readonly"></el-input>
      </el-form-item>

      <el-form-item label="年化收益率" label-width="40vw">
        <el-input v-model="form.annual_rights_rate" type=“number” style="width: 50vw;" readonly="readonly"></el-input>
      </el-form-item>
    </div>

    <div class="item speech_div" v-if="this.form.speech_display">
      <el-divider content-position="left" class="divider">文字话术</el-divider><br>


      <p v-if="'抽奖' === this.form.ljj_rights" class="speech_text">相当于您只要存入<span>{{ this.form.estimate_aum }}</span>万元，并存入7天通知存款（年利率0.9%），
        且持有到<span>{{ this.form.this_month }}</span>月底，就可以拿利息<span>{{ this.form.deposit_rights }}</span>元，
        同时还可以享受立减金<span>{{ this.form.ljj_rights }}</span>。
        相当于至少年化收益率<span>{{ this.form.annual_rights_rate }}</span>。
      </p>
      <p v-else class="speech_text">相当于您只要存入<span>{{ this.form.estimate_aum }}</span>万元，并存入7天通知存款（年利率0.9%），
        且持有到<span>{{ this.form.this_month }}</span>月底，就可以拿利息<span>{{ this.form.deposit_rights }}</span>元，
        同时还可以享受立减金<span>{{ this.form.ljj_rights }}</span>元。利息加立减金合计<span>{{ this.form.total_rights }}</span>元，
        就相当于至少年化收益率<span>{{ this.form.annual_rights_rate }}</span>。
      </p>

    </div>
    
  </el-form>


  </div>
</template>

<script>
export default {
  name: 'YYY',
  data() {
      return {
        form: {
          start_date: '2025-04-01',
          caculate_date: '2025-04-25',
          last_month_aum: '20',
          this_month_aum: '20',
          estimate_aum: '90',
          this_month_aum_real: '',
          increase_aum: '',
          ljj_rights: '',
          byl_rights: '',
          deposit_rights: '',
          total_rights: '',
          annual_rights_rate: '',
          this_month: '',
          speech_display: false,
        },

      }
    },
  mounted() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 补零处理
    const date = now.getDate();
    this.form.start_date =  `${year}-${month}-01`;
    this.form.caculate_date = `${year}-${month}-${date}`;

    var file_path = "/stock.txt";
    this.loadJsonData(file_path);
    console.log(this.json_data);
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
      onClick() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // JavaScript 的月份从 0 开始，所以要 +1\
        this.form.this_month = month;
        const count_of_days =  new Date(year, month, 0).getDate();
        alert(this.form.estimate_aum + ' ' + count_of_days  + ' '  + this.form.caculate_date + ' ' + this.form.start_date + ' ' +  this.form.this_month_aum + ' ' + count_of_days + ' ' + count_of_days)
        this.form.this_month_aum_real = ((this.form.estimate_aum * (count_of_days - this.getDaysBetween(this.form.caculate_date, this.form.start_date)) + this.form.this_month_aum * count_of_days) / count_of_days).toFixed(2);
        this.form.increase_aum = (this.form.this_month_aum_real - this.form.last_month_aum).toFixed(2);

        if (this.form.increase_aum >= 600) {
          this.form.ljj_rights = 6000
        }else if (this.form.increase_aum >= 300) {
          this.form.ljj_rights = 3000
        }else if (this.form.increase_aum >= 100) {
          this.form.ljj_rights = 1000
        }else if (this.form.increase_aum >= 50) {
          this.form.ljj_rights = 500
        }else if (this.form.increase_aum >= 20) {
          this.form.ljj_rights = 200
        }else if (this.form.increase_aum >= 5) {
          this.form.ljj_rights = 50
        }else if (this.form.increase_aum >= 1) {
          this.form.ljj_rights = 15
        }else if (this.form.increase_aum >= 0.2) {
          this.form.ljj_rights = '抽奖'
        }else {
          this.form.ljj_rights = ''
        }

        var ljj = this.json_data.ljj.find(ljj => this.form.ljj_rights === ljj.id);
        if (ljj.stock !== 1) {
          this.form.ljj_rights = '已兑完'
          this.form.ljj_type = 'string'
        }

        this.form.deposit_rights = (this.form.estimate_aum * 0.009 * ((10 + count_of_days) - this.getDaysBetween(this.form.caculate_date, this.form.start_date) - 1) / 360 * 10000).toFixed(2);
        if ('抽奖' === this.form.ljj_rights || '已兑完' === this.form.ljj_rights){
          this.form.total_rights = eval(this.form.deposit_rights);
        }else {
          this.form.total_rights = eval(this.form.ljj_rights) + eval(this.form.deposit_rights);
        }
        this.form.annual_rights_rate = (this.form.total_rights / this.form.estimate_aum / 10000 / (count_of_days - this.getDaysBetween(this.form.caculate_date, this.form.start_date) - 1) * 360 * 100).toFixed(2) + '%';

        this.form.speech_display = true;
      },
      doClean() {
        this.form.last_month_aum = '';
        this.form.this_month_aum = '';
        this.form.estimate_aum = '';
        this.form.speech_display = false;
      },
      getDaysBetween(date1, date2) {
        const timeDiff = Math.abs(new Date(date2) - new Date(date1)); // 计算时间差（毫秒）
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 转换为天数
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

.speech_div {
  display: flex;
  flex-direction: column;
  height: 200px;
  position: relative;
}
.speech_text {
  display: inline-block; /* 让其本身按内容适配 */
  width: 90vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
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
