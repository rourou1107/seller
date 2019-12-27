<template>
  <div id="app">
    <Header :sellerData="sellerData"></Header>
  </div>
</template>

<script>
    import { getSeller, getGoods, getRatings } from 'api/index.js'
    import Header from 'components/header/header.vue'

    export default {
        name: 'app',
        data() {
            return {
                sellerData: {},
                goodsData: {},
                ratingsrData: {}
            }
        },
        components: { Header },
        created() {
            this._getSeller()
            this._getGoods()
            this._getRatings()
        },
        methods: {
            _getSeller() {
                getSeller().then((res) => {
                    this.sellerData = res
                })
            },
            _getGoods() {
                this.ratingsrData = getGoods()
            },
            _getRatings() {
                this.ratingsrData = getRatings()
            }
        }
    }
</script>

<style lang="stylus">
</style>
