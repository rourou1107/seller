<template>
  <div id="app">
    <Header :sellerData="sellerData"></Header>
    <div class="tab-wrapper">
      <Tab></Tab>
    </div>
  </div>
</template>

<script>
    import { getSeller } from 'api/index.js'
    import Header from 'components/header/header.vue'
    import Tab from 'components/tab/tab.vue'

    export default {
        name: 'app',
        data() {
            return {
                sellerData: {}
            }
        },
        components: { Header, Tab },
        created() {
            this._getSeller()
        },
        methods: {
            _getSeller() {
                getSeller().then((res) => {
                    this.sellerData = res
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
  .tab-wrapper
    position: fixed
    top: 134px
    bottom: 0
    left: 0
    right: 0
</style>
