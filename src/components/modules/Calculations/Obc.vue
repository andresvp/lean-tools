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
          <div class="col-lg-4 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Operator Description:</label><br>
            <input v-model="opDesc" type="text" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Max Operator Cycle</label>
            <input v-model="maxOpCycle" type="number" min="0" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Min Operator Cycle</label>
            <input v-model="minOpCycle" type="number" min="0" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label>Lowest Repeatable Cycle</label>
            <input v-model="lowRepCycle" type="number" min="0" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Average Cycle</label>
            <input v-model="averageCycle" type="number" min="0" class="form-wd-2 text-center">
          </div>
        </div>
        <br>
        <div class="button-obc">
          <button class="primary round padding-btn" @click="addOperator">Add Operator</button>
          <button class="primary round padding-btn" @click="generateChart">Generate Chart</button>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-2 col-sm-4 col-xs-4 text-center form-wd-2">
            <p>Desc</p>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center form-wd-2">
            <p>Max</p>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center form-wd-2">
            <p>Min</p>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center form-wd-2">
            <p>Low R</p>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center form-wd-2">
            <p>Average</p>
          </div>
        </div>
        <div class="list striped">
          <div class="item" v-for="item in obc">
            <div class="item-content row">
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                {{ item.name }}
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                {{ item.maxOP }}
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                {{ item.minOP }}
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                {{ item.lowRep }}
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                {{ item.aveCycle }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from 'quasar'

export default {
  data () {
    return {
      takt: '',
      oee: '',
      opDesc: '',
      maxOpCycle: '',
      minOpCycle: '',
      lowRepCycle: '',
      averageCycle: '',
      obc: [
        { name: 'Operator 1', maxOP: 50, minOP: 35, lowRep: 46, aveCycle: 47 }
      ]
    }
  },
  methods: {
    addOperator () {
      let newObc = {
        name: this.opDesc, maxOP: this.maxOpCycle, minOP: this.minOpCycle, lowRep: this.lowRepCycle, aveCycle: this.averageCycle
      }
      this.obc.push(newObc)
      this.opDesc = ''
      this.maxOpCycle = ''
      this.minOpCycle = ''
      this.lowRepCycle = ''
      this.averageCycle = ''
      Toast.create('New Operation Added')
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
