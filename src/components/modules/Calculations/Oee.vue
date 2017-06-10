<template>
  <div id="app-container">
    <div class="card">
      <div class="card-title bg-primary text-white text-center">
        <h4>OEE - Overall Equipment Effectiveness</h4>
      </div>
      <div class="card-content card-force-top-padding">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <h5 class="text-center card-title bg-grey-2">Avaliable Rate</h5>
            <h6 class="">Actual Avaliable Time</h6>
            <div class="row">
              <div class="width-1of2 text-right padding-top">
                <label for="">Total Avaliable Time:  </label>
              </div>
              <div class="width-1of2">
                <input type="number" v-model="avaliableTime" class="form-wd text-center" min="0" autofocus>
              </div>            
            </div>
            <h6 class="">Planned Downtime</h6>
            <div class="row">
              <div class="width-1of2 text-right padding-top">
                <label for="">Brakes, 5s, Meetings: </label>
              </div>
               <div class="width-1of2">
                <input type="number" v-model="plannedTime" class="form-wd text-center" min="0">
              </div>
            </div>
            <h6 class="">Downtime Losses</h6>
            <div class="row">
              <div class="width-1of2 text-right padding-top">
                <label for="">Changeovers, Breakdowns, lack of components: </label>
              </div>
               <div class="width-1of2">
                <input type="number" v-model="downTime" class="form-wd text-center" min="0">
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <h5 class="text-center card-title bg-grey-2">Performance Rate</h5>
            <div class="row">
              <div class="width-1of2 text-right padding-top">
                <label for="">Process Cycle Time: </label>
              </div>
               <div class="width-1of2">
                <input type="number" v-model="processCycleTime" class="form-wd text-center" min="0">
              </div>
            </div>
            <div class="row">
              <div class="width-1of2 text-right padding-top">
                <label for="">Total Produced Parts: </label>
              </div>
              <div class="width-1of2">
                <input type="number" v-model="totalProduced" class="form-wd text-center" min="0">
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <h5 class="text-center card-title bg-grey-2">Quality Rate</h5>
            <div class="row">
              <div class="width-1of2 text-right padding-top">
                <label for="">Number of Defective Parts: </label>
              </div>
              <div class="width-1of2">
                <input type="number" v-model="defectiveParts" class="form-wd text-center" min="0">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="primary round button-oee" v-show="!buttonReset" @click="calculateOee">Calculate OEE</button>
    <button class="primary round button-oee" v-show="buttonReset" @click="resetCalc">Reset Calculation</button>
    <div class="card" v-show="showResult">
        <div class="card-title bg-primary text-white text-center">
          <h5>OEE - Result</h5>
        </div>
        <div class="card-content card-force-top-padding">
          <div id="chart" class="chart-css"></div>
        </div>
    </div>
  </div>
</template>

<script>

import { Toast } from 'quasar'
import C3 from 'c3'

export default {
  data () {
    return {
      avaliableTime: '',
      plannedTime: '',
      downTime: '',
      processCycleTime: '',
      totalProduced: '',
      defectiveParts: '',
      showResult: false,
      buttonReset: false
    }
  },
  methods: {
    calculateOee () {
      if (this.avaliableTime === '' || this.plannedTime === '' || this.downTime === '' || this.processCycleTime === '' || this.totalProduced === '' || this.defectiveParts === '') {
        return Toast.create('Please, insert data in ALL the fields!')
      }
      let scheduled = this.avaliableTime - this.plannedTime
      let avaliableRate = (scheduled - this.downTime) / scheduled
      let actualUptime = scheduled - this.downTime
      let performanceRate = this.totalProduced / (actualUptime / this.processCycleTime)
      let qualityRate = this.defectiveParts / this.totalProduced
      let oee = (avaliableRate * performanceRate * (1 - qualityRate)) * 100
      C3.generate({
        data: {
          columns: [
              ['OEE', oee]
          ],
          type: 'gauge'
        },
        color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
          threshold: {
            values: [30, 60, 90, 100]
          }
        }
      })
      this.showResult = true
      this.buttonReset = true
    },
    resetCalc () {
      this.avaliableTime = ''
      this.plannedTime = ''
      this.downTime = ''
      this.processCycleTime = ''
      this.totalProduced = ''
      this.defectiveParts = ''
      this.buttonReset = false
      this.showResult = false
    }
  },
  updated () {
    let elem = this.$el
    elem.scrollTop = elem.clientHeight
  }
}
</script>

<style>

#app-container {
  padding: 1em;
}

.form-wd {
  width: 25%;
  margin-left: 7%;
}

.padding-top {
  padding-top: 2%;
}

.button-oee {
  display: table;
  margin: auto;
  margin-bottom: 1em;
}

.chart-css {
  margin-left: -2em;
}

</style>
