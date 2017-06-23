<template>
  <div id="app-container">
    <div class="card">
      <div class="card-title bg-primary text-white text-center">
        <h4>Pareto Chart</h4>
      </div>
      <div class="card-content card-force-top-padding">
        <h6>Enter the Following information:</h6><br>
        <div class="row">
          <div class="col-xm-6 col-sm-6 col-md-6 col-lg-6">
            <label>Problem Name: </label>
            <input v-model="problem" type="text" class="prob-form text-center">
          </div>
          <div class="col-xm-6 col-sm-6 col-md-6 col-lg-6">
            <label>Quantity: </label>
            <input v-model.number="qtd" type="number" min="0" max="100" class="form-wd text-center">
          </div>
        </div>
        <br>
        <div class="button-obc">
          <button class="primary round padding-btn vertical-middle" @click="addProblem">Add Problem</button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center form-wd-2">
          <p>Problem Description</p>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-2 col-xs-2 text-center form-wd-2">
          <p>Quantity</p>
        </div>
      </div>
      <div class="list striped">
        <div class="item" v-for="item in paretoAr">
          <div class="item-content row no-margin">
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
              {{ item.problem }}
            </div>
            <div class="col-lg-4 col-md-4 col-sm-2 col-xs-2 text-center">
              {{ item.qtd }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-show="showChart">
      <div class="card-title bg-primary text-white text-center">
        <h5>Chart</h5>
      </div>
      <div class="card-content card-force-top-padding">
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>

import c3 from 'c3'
import _ from 'lodash'
import { Toast } from 'quasar'

export default {
  data () {
    return {
      problem: '',
      qtd: null,
      paretoAr: [],
      paretoArChart: [],
      showChart: false
    }
  },
  methods: {
    addProblem () {
      if (this.problem === '' || this.qtd === null) {
        return Toast.create('Missing fields to complete!')
      }
      this.showChart = true
      let data = this.paretoAr
      let index = data.map(function (d) { return d['problem'] }).indexOf(this.problem)
      if (index === -1) {
        let newPareto = {
          problem: this.problem,
          qtd: this.qtd
        }
        this.paretoAr.push(newPareto)
        this.paretoAr = this.paretoAr.sort(this.compare)
        this.paretoArChart = this.paretoCalculation(this.paretoAr)
        this.chartData()
        this.problem = null
        this.qtd = null
      }
      else {
        Toast.create('Data already registered, go to the next one!')
      }
    },
    compare (a, b) {
      if (a.qtd > b.qtd) {
        return -1
      }
      if (a.qtd < b.qtd) {
        return 1
      }
      return 0
    },
    chartData () {
      c3.generate({
        data: {
          bindto: '#chart',
          x: 'x',
          columns: [
            this.paretoArChart.finalPatternX,
            this.paretoArChart.finalPatternQtd,
            this.paretoArChart.finalPatternAcc
          ],
          type: 'bar',
          types: {
            '% Accumalated': 'spline'
          },
          axes: {
            '% Accumalated': 'y2'
          }
        },
        axis: {
          x: {
            type: 'category'
          },
          y2: {
            show: true
          }
        },
        grid: {
          y: {
            lines: [
              {value: 80, text: '80% of Problems', axis: 'y2'}
            ]
          }
        }
      })
    },
    paretoCalculation (paretoAr) {
      function compare (a, b) {
        if (a.qtd > b.qtd) {
          return -1
        }
        if (a.qtd < b.qtd) {
          return 1
        }
        return 0
      }
      const paretoArray = paretoAr.sort(compare)
      const patternX = [
          ['x']
      ]
      const patternQtd = [
          ['Quantity']
      ]
      const patternAcc = [
          ['% Accumalated']
      ]
      const patternXFinal = paretoArray.map(item => item.problem)
      const patternQtdFinal = paretoArray.map(item => item.qtd)
      const totalPercent = patternQtdFinal.reduce((acc, curr) => acc + curr)
      const itemPercent = patternQtdFinal.map(item => Math.round((item / totalPercent) * 100))
      const patternAccAlmost = itemPercent.reduce(function (r, c, i) { r.push((r[i - 1] || 0) + c); return r }, [])
      const finalPatternAcc = _.flattenDeep(patternAcc.concat(patternAccAlmost))
      const finalPatternX = _.flattenDeep(patternX.concat(patternXFinal))
      const finalPatternQtd = _.flattenDeep(patternQtd.concat(patternQtdFinal))
      return {
        finalPatternX,
        finalPatternQtd,
        finalPatternAcc
      }
    }
  }
}
</script>

<style>
#app-container {
  padding: 1em;
}

.prob-form {
  width: 75%;
}

.form-wd-2 {
  display: block;
  width: 100%;
  margin-bottom: 1em;
  white-space: nowrap;
}

.button-obc {
  display: table;
  margin: auto;
  margin-bottom: 1em;
}

.padding-btn {
  margin: 0 1.5em;
}

@media screen and (max-width: 533px) {
  .padding-btn {
    display: table;
    margin: 1em;
  }
}
</style>
