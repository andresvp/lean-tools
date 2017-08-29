<template>
  <div id="app-container">
    <q-card>
      <q-card-title class="card-title bg-primary text-white text-center">
        <h5>TAKT TIME</h5>
      </q-card-title> 
      <q-card-main class="card-wid">
        <br>
        <q-input type="number" v-model="demand" autofocus float-label="Your Demand Here" ref="focus"/>
        <br>
        <q-input float-label="Avaliable Time do Produce (min)" type="number" v-model="avaliableTime" />
        <br><br>
        <q-btn color="primary" v-show="!showReset" @click="calculateTakt">Calculate</q-btn>
        <q-btn color="primary" v-show="showReset" @click="resetParams">Reset Calculation</q-btn>
        <br><br>
        <q-input v-show="result != 0" class="text-center" id="size-result" readonly v-model="result" />
      </q-card-main>
    </q-card>
  </div>  
</template>

<script>
import {
  Toast,
  QCard,
  QCardTitle,
  QCardMain,
  QInput,
  QBtn
} from 'quasar'

export default {
  name: 'takt',
  components: {
    Toast,
    QCard,
    QCardTitle,
    QCardMain,
    QInput,
    QBtn
  },
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
      this.$refs.focus.focus()
    }
  }
}
</script>

<style>
#app-container {
  padding: 0.5em;
}

.size-result {
  font-size: 20px;
}

.card-wid {
  width: 50%;
  margin: 0 auto;
}

@media screen and (max-width: 425px){
  .card-wid {
    width: 100%;
    margin: 0 auto;
}
}

</style>
