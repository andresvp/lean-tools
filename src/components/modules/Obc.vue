<template>
  <div id="app-container">
    <q-card>
      <q-card-title class="bg-primary text-white text-center">
        <h5 class="no-margin" >OBC - Operator Balance Chart</h5>
      </q-card-title>
      <q-card-main>
        <h6>Enter the Following information:</h6>
        <div class="row">
          <div class="col-6">
            <q-input v-model.number="takt" class="margin-min" type="number" :min="0" float-label="Takt Time" />
          </div>
          <div class="col-6">
            <q-input v-model.number="oee" class="margin-min" type="number" :min="0" :max="100" float-label="OEE" />
          </div>
        </div>
        <br>
        <h6>Now let's dive into OBC:</h6>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <q-input class="margin-min" v-model="processId" type="text" float-label="Operator Nº or Process"/>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-input v-model="processName" type="text" class="margin-min" float-label="Process Descrition" />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <q-input v-model.number="lowRepCycle" type="number" :min="0" class="margin-min" float-label="Lowest Repeatable Cycle" />
          </div>
        </div>
        <br>
        <div class="button-obc">
          <q-btn color="primary" class="round padding-btn" @click="addOperator">Add Operator</q-btn>
          <q-btn color="primary" class="round padding-btn" @click="cleanData">Clean Data</q-btn>
        </div>
      </q-card-main>
    </q-card>
    <q-card>
      <q-card-title class="card-title bg-primary text-white text-center">
        <h5 class="no-margin">Chart</h5>
      </q-card-title>
        <q-card-main>
          <q-card-separator class="separator-pad" />
            <div id="chart"></div>
          <div class="row uppercase text-bold table-header">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center">
              <p class="no-margin">#Process</p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 text-center">
              <p class="no-margin">Desc</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">
              <p class="no-margin">Lowest Cycle</p>
            </div>
          </div>
          <q-list striped-odd no-border>
            <q-item v-for="item in obc" :key="item.obc">
              <q-item-main>
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
              </q-item-main>
            </q-item>
          </q-list>
        </q-card-main>
    </q-card>  
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
  QBtn,
  QList,
  QItem,
  QItemMain
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
    QBtn,
    QList,
    QItem,
    QItemMain
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
  mounted () {
    this.addOperator()
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

@import url("../../../node_modules/c3/c3.css");

#app-container {
  padding: 0.25em;
}

.margin-min {
  margin: 1em;
}

.separator-pad {
  margin: 1%;
}

</style>