<template>
  <div id="app-container">
    <div class="card">
      <div class="card-title bg-primary text-white text-center">
        <h4>OBC - Operator Balance Chart</h4>
      </div>
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
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for=""># Operator or Process:</label><br>
            <input class="padding-small text-center" v-model="processId" type="text">
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Process Description</label><br>
            <input v-model="processName" type="text" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Lowest Repeatable Cycle</label>
            <input v-model="lowRepCycle" type="number" min="0" class="form-wd-2 text-center">
          </div>
        </div>
        <br>
        <div class="button-obc">
          <button class="primary round padding-btn" @click="addOperator">Add Operator</button>
          <button class="primary round padding-btn" @click="cleanData">Clean Data</button>
        </div>
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4 text-center form-wd-2">
            <p>#Operator or Process Number</p>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-2 col-xs-2 text-center form-wd-2">
            <p>Process Description</p>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center form-wd-2">
            <p>Lowest Repeatable Cycle</p>
          </div>
        </div>
        <div class="list striped">
          <div class="item" v-for="item in obc">
            <div class="item-content row">
              <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
              </div>
              <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4 text-center">
                {{ item.processId }}
              </div>
              <div class="col-lg-4 col-md-4 col-sm-2 col-xs-2 text-center">
                {{ item.processName }}
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                {{ item.lowRepCycle }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
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
// import { Toast } from 'quasar'

export default {
  data () {
    return {
      takt: 90,
      oee: 80,
      processId: 'Vigas',
      processName: 'Acabamento',
      lowRepCycle: 65,
      obc: [
        { takt: 90, oee: 80, processId: 'Vigas', processName: 'Cortar', lowRepCycle: 65 },
        { takt: 90, oee: 80, processId: 'Vigas', processName: 'Dobrar', lowRepCycle: 65 }
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
          },
          groups: [
            ['processId']
          ]
        }
      })
    },
    cleanData () {
      this.processId = ''
      this.processName = ''
      this.lowRepCycle = ''
    }
  }
}

</script>

<style>
#app-container {
  padding: 1em;
}

.form-wd {
  width: 4em;
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
  margin-bottom: 3em;
}

.padding-btn {
  margin: 0 1.5em;
}

@media screen and (max-width: 533px) {
  .padding-btn {
    display: table;
    margin: 1em auto;
  }
}

</style>
