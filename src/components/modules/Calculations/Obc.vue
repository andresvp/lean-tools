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
            <label for="">Takt Time: </label>
            <input type="number" class="form-wd text-center">
          </div>
          <div class="col-xm-6 col-sm-6 col-md-6 col-lg-6 form-wd-2 text-center">
            <label>OEE (%): </label>
            <input type="number" class="form-wd text-center">
          </div>
        </div>
        <br>
        <h6>Now let's dive into OBC:</h6><br>
        <br>
        <div class="row">
          <div class="col-lg-4 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Operator Description:</label><br>
            <input type="text" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Max Operator Cycle</label>
            <input type="number" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Min Operator Cycle</label>
            <input type="number" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label>Lowest Repeatable Cycle</label>
            <input type="number" class="form-wd-2 text-center">
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6 text-center form-wd-2">
            <label for="">Average Cycle</label>
            <input type="number" class="form-wd-2 text-center">
          </div>
        </div>
        <br>
        <button class="primary round button-obc">Add Operator</button>
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
                {{ item.AveCycle }}
              </div>
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
      obc: [
        { name: 'Operator 1', maxOP: 50, minOP: 35, lowRep: 46, AveCycle: 47 },
        { name: 'Operator 2', maxOP: 50, minOP: 35, lowRep: 46, AveCycle: 47 },
        { name: 'Operator 3', maxOP: 50, minOP: 35, lowRep: 46, AveCycle: 47 }
      ]
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
</style>
