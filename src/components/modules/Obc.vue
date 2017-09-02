<template>
  <div id="app-container">
    <q-card>
      <q-card-title class="bg-primary text-white text-center">
        <h5 class="no-margin" >OBC - Operator Balance Chart</h5>
      </q-card-title>
      <div class="card-content card-force-top-padding">
        <h6>Enter the Following information:</h6><br>
        <div class="row">
          <div class="col-xm-6 col-sm-6 col-md-6 col-lg-6 form-wd-2 text-center">
            <label>Takt Time: </label>
            <input v-model="takt" type="number" min="0"class="form-wd text-center">
          </div>
          <div class="col-xm-6 col-sm-6 col-md-6 col-lg-6 form-wd-2 text-center">
            <label>OEE (%): </label>
            <input v-model="oee" type="number" min="0" max="100" class="form-wd text-center">
          </div>
        </div>
        <br>
        <h6>Now let's dive into OBC:</h6><br>
        <br>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center form-wd-2">
            <label for=""># Operator or Process:</label><br>
            <input class="form-wd-2 text-center" v-model="processId" type="text">
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center form-wd-2">
            <label for="">Process Description:</label><br>
            <input v-model="processName" type="text" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center form-wd-2">
            <label for="">Lowest Repeatable Cycle:</label>
            <input v-model="lowRepCycle" type="number" min="0" class="form-wd-2 text-center">
          </div>
        </div>
        <br>
        <div class="button-obc">
          <button class="primary round padding-btn" @click="addOperator">Add Operator</button>
          <button class="primary round padding-btn" @click="cleanData">Clean Data</button>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center form-wd-2">
            <p>#Process</p>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 text-center form-wd-2">
            <p>Desc</p>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center form-wd-2">
            <p>Lowest <br> Cycle</p>
          </div>
        </div>
        <div class="list striped">
          <div class="item" v-for="item in obc">
            <div class="item-content row no-margin">
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center">
                {{ item.processId }}
              </div>
              <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 text-center">
                {{ item.processName }}
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">
                {{ item.lowRepCycle }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
    <div class="card" v-if="show">
        <div class="card-title bg-primary text-white text-center">
          <h5>OBC - Operator Balance Chart</h5>
        </div>
        <div class="card-content card-force-top-padding">
          <div id="chart"></div>
        </div>
    </div>
  </div>
</template>

<script>
import c3 from 'c3'

import {
  Toast,
  QCard,
  QCardTitle,
  QCardMain,
  QCardSeparator,
  QInput,
  QBtn
} from 'quasar'

export default {
  name: 'obc',
  components: {
    Toast,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QInput,
    QBtn
  },
  data () {
    return {
      show: false,
      takt: 90,
      oee: 80,
      processId: 'Vigas',
      processName: 'Acabamento',
      lowRepCycle: 65,
      obc: [
        { takt: 90, oee: 80, processId: 'Almas', processName: 'Cortar', lowRepCycle: 43 },
        { takt: 90, oee: 80, processId: 'Almas', processName: 'Dobrar', lowRepCycle: 35 },
        { takt: 90, oee: 80, processId: 'Almas', processName: 'Montar', lowRepCycle: 55 },
        { takt: 90, oee: 80, processId: 'Almas', processName: 'Soldar', lowRepCycle: 47 },
        { takt: 90, oee: 80, processId: 'Vigas', processName: 'Cortar', lowRepCycle: 47 },
        { takt: 90, oee: 80, processId: 'Vigas', processName: 'Dobrar', lowRepCycle: 47 },
        { takt: 90, oee: 80, processId: 'Vigas', processName: 'Montar', lowRepCycle: 47 },
        { takt: 90, oee: 80, processId: 'Vigas', processName: 'Soldar', lowRepCycle: 47 }
      ]
    }
  },
  methods: {
    addOperator () {
      let newObc = {
        takt: this.takt,
        oee: this.oee,
        processName: this.processName,
        processId: this.processId,
        lowRepCycle: this.lowRepCycle
      }
      this.obc.push(newObc)
      this.chart()
    },
    cleanData () {
      this.processId = ''
      this.processName = ''
      this.lowRepCycle = ''
    },
    chart () {
      c3.generate({
        padding: {
          right: 40
        },
        bindto: '#chart',
        data: {
          json: this.obc,
          keys: {
            value: ['lowRepCycle', 'takt', 'oee']
          },
          type: 'bar',
          types: {
            takt: 'line',
            oee: 'line'
          }
        }
      })
      this.show = true
    }
  }
}
</script>

<style>
#app-container {
  padding: 0.25em;
}

</style>