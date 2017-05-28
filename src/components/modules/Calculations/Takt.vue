<template>
  <div id="app-container">
    <div class="card">
      <div class="card-title bg-primary text-white text-center">
        <h4>TAKT TIME</h4>
      </div>
      <div class="card-content card-force-top-padding text-center">
        <p class="no-margin">Your Demand:</p>
        <input class="text-center" type="number" v-model="demand" autofocus>
        <br><br>
        <p class="no-margin">Avaliable Time do Produce (min):</p>
        <input class="text-center" type="number" v-model="avaliableTime">
        <br><br>
        <button class="primary round" v-show="!showReset" @click="calculateTakt">Calculate</button>
        <button class="primary round" v-show="showReset" @click="resetParams">Reset Calculation</button>
        <br><br>
        <input v-show="result != 0" class="text-center" readonly v-model="result">
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'quasar'

export default {
  data () {
    return {
      demand: '',
      avaliableTime: '',
      result: 0,
      showReset: false
    }
  },
  methods: {
    calculateTakt () {
      if (this.demand === '' || this.avaliableTime === '') {
        return Toast.create('Please, insert some data!')
      }
      let takt = Math.floor(this.avaliableTime / this.demand)
      this.result = `${takt} minutes`
      this.showReset = true
    },
    resetParams () {
      this.demand = ''
      this.avaliableTime = ''
      this.result = 0
      this.showReset = false
    }
  }
}
</script>

<style>

#app-container {
  padding: 1em;
}

</style>
