<template>  
  <md-whiteframe md-elevation="2">
    <div class="rates-inner">
      <div class="md-title">
        <span>Тарифи</span>
        <md-button class="md-icon-button md-raised md-warn md-dense" id="custom" @click.native="openDialog('rateDialog')">
          <md-icon>add</md-icon>
        </md-button>
      </div>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>Тариф</md-table-head>
            <md-table-head>Вартість</md-table-head>
            <md-table-head md-numeric></md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row  v-for="(item, index) in rates">
            <md-table-cell>
              {{ (index !== 0) ? previousSum(index) + 1 : 0 }} - {{ previousSum(index+1) }}
              <span v-html="unit"></span>
            </md-table-cell>
            <md-table-cell>{{ item.price }} грн.</md-table-cell>
            <md-table-cell md-numeric>
              <div>
                <md-button class="md-icon-button">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>

      <md-dialog md-open-from="#custom" md-close-to="#custom" ref="rateDialog">
        <md-dialog-title>Додати тариф</md-dialog-title>

        <md-dialog-content>
          <md-switch v-model="percentageView" id="ratio" name="ratio" class="md-primary">У відсотках (%)
            <a>&nbsp;<sup>?</sup><md-tooltip md-direction="bottom">Задається в процентному співвідношенні</md-tooltip></a>
          </md-switch>
          <md-input-container>
            <label v-html="percentageView ? '% ' + unit : unit"></label>
            <md-input type="number" min="0" :max="percentageView ? 1 : null" v-model="rate"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Вартість</label>
            <md-input type="number" min="0" v-model="price"></md-input>
          </md-input-container>
          <md-button class="md-raised md-primary pull-right" @click.native="saveRate('rateDialog')">Додати</md-button>
        </md-dialog-content>
      </md-dialog>
    </div>
  </md-whiteframe>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    props: [
      'unit',
      'context',
    ],
  })
  export default class Rates extends Vue {
    rate = null;
    price = null;
    rates = [];
    percentageView = false;

    mounted() {
      let userId = 'zdCQ9DFruOQSSrV80829kHhCEZ73';
      this.$root.db.ref(`rates/${userId}/${this.context}`)
        .on('value', (rates) => {
          let ratesValue = rates.val();
          this.rates = (ratesValue) ? Object.keys(ratesValue).map(k => ratesValue[k]) : [];
        });
    }

    previousSum(index) {
      var sum = 0;
      for (let i = 0; i < index; i += 1) {
        sum += this.rates[i].rate;
      }
      return sum;
    }

    isPercentageView() {
      for (let i = 0; i < this.rates.length; i += 1) {
        if (this.rates[i].percentageView) {
          return true;
        }
      }
      return false;
    }

    saveRate(ref) {
      let price = Number(this.price);
      let rate = Number(this.rate);
      let percentageView = this.percentageView;
      if (price !== null && rate !== null) {
        this.$root.auth.signInAnonymously()
          .then((user) => {
            // let userId = user.uid;
            let userId = 'zdCQ9DFruOQSSrV80829kHhCEZ73';
            if (user) {
              this.$root.db.ref(`rates/${userId}/${this.context}`)
                .push({ rate, price, percentageView })
                .then((res) => {
                  this.closeDialog(ref);
                });
            }
          });
      }
    }

    openDialog(ref) {
      this.rate = null;
      this.price = null;
      this.$refs[ref].open();
    }

    closeDialog(ref) {
      this.$refs[ref].close();
    }
  }

</script>

<style lang="scss" scoped="true">
  .rates-inner {
    padding: 20px 0 0;
  }

  .md-switch-label {
    a {
      text-decoration: none !important;
      line-height: 0;
    }
  }

  .md-title {
    margin-bottom: 30px;
    span {
      text-align: center;
      color: #585454;
      display: inline-block;
      vertical-align: middle;
      line-height: 32px;
    }
  }

  .pull-right {
    float: right;
    margin: 0;
    span {
      display: inline-flex;
    }
  }
</style>

