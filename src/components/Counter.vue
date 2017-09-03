<template>
  <div class="form">
    <md-layout>
      <md-layout md-flex-xsmall="100">
        <md-input-container>
          <label>Попередні показники</label>
          <md-input type="number" :value="previousValue"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Поточні показники</label>
          <md-input type="number" v-model="currentValue"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout md-flex-xsmall="100">
        <md-whiteframe md-elevation="2">
          <div class="form-total">
            <h4>Різниця: <span v-show="isValid">{{ difference }}</span></h4>
            <h3>До сплати: <span v-show="isValid">{{ calculate }} грн</span></h3>
          </div>
        </md-whiteframe>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    props: {
      previous: Number,
      context: String,
    },
  })
  export default class Counter extends Vue {
    previousValue = this.previous;
    currentValue = '';

    get difference() {
      return this.currentValue - this.previousValue;
    }

    get isValid() {
      return (this.difference > 0 && !isNaN(this.difference));
    }

    get calculate() {
      let rates = this.rates;
      let result = 0;
      let difference = this.difference;
      for (let j = 0; j < rates.length; j += 1) {
        let rate = rates[j].rate;
        let price = rates[j].price;
        if (j === rates.length - 1 || difference < rate || rate === 0) {
          result += difference * price;
          return result.toFixed(2);
        }
        result += rate * price;
        difference -= rate;
      }
      return result.toFixed(2);
    }

    get rates() {
      this.currentValue = 2;
      return [];
      /*
      Зробити щоб таблиця тягнулась тільки один раз на два компоненти
      */
      // let userId = this.$root.auth.currentUser.uid;   
      // this.$root.db.ref(`rates/${userId}/${this.context}`)
      //   .on('value', (rates) => {
      //     let newRates = [];
      //     let ratesValue = rates.val();
      //     return Object.keys(ratesValue).map(k => ratesValue[k]);
      //   });
    }
  }

</script>

<style lang="scss" scoped="true">
  .form {
    margin-bottom: 45px;
    .md-whiteframe {
      width: 100%;
      margin-left: 30px;
      padding: 15px 0;
      @media (max-width: 600px) {
        margin-left: 0;
      }
    }
    .md-input-container {
      &:last-child {
        margin-bottom: 0;
      }
    }
    .md-layout {
      @media (max-width: 600px) {
        &:not(:last-child) {
          margin-bottom: 30px;
        }
      }
    }
  }

  label {
    display: block;
  }
</style>
