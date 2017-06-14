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
            <input v-model="problem" type="text" class="prob-form">
          </div>
          <div class="col-xm-6 col-sm-6 col-md-6 col-lg-6">
            <label>Quantity: </label>
            <input v-model="qtd" type="number" min="0" max="100" class="form-wd text-center">
          </div>
        </div>
        <br>
        <div class="button-obc">
          <button class="primary round padding-btn" @click="addProblem">Add Problem</button>
        </div>
      </div>
      <div class="list striped">
        <div class="item" v-for="item in paretoAr">
          <div class="item-content row no-margin">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              {{ item.problem }}
            </div>
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 text-center">
              {{ item.qtd }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      problem: '',
      qtd: '',
      paretoAr: [
        { problem: 'Prob1', qtd: 12 },
        { problem: 'Prob2', qtd: 15 },
        { problem: 'Prob3', qtd: 16 }
      ]
    }
  },
  methods: {
    addProblem () {
      let newPareto = {
        problem: this.problem,
        qtd: this.qtd
      }
      this.paretoAr.push(newPareto)
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
