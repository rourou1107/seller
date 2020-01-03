<template>
    <div class="cube-wrapper">
      <cube-tab-bar
        ref="tab"
        v-model="selectedLabel"
        :data="tabs"
        :showSlider="true"
        :useTransition="false"
        @change="changeHandler">
      </cube-tab-bar>
      <div class="slide-wrapper">
        <cube-slide
          ref="slide"
          :data="tabs"
          :loop="false"
          :showDots="false"
          :autoPlay="false"
          :initialIndex="index"
          :options="slideOptions"
          @change="changePage"
          @scroll="scrollHandle"
        >
          <cube-slide-item
            v-for="(tab, index) in tabs"
            :key="index"
          >
            <component :is="tab.component"></component>
          </cube-slide-item>
        </cube-slide>
      </div>
  </div>
</template>
<script>
  import Seller from 'components/seller/seller.vue'
  import Goods from 'components/goods/goods.vue'
  import Ratings from 'components/ratings/ratings.vue'

  export default {
      name: 'tab',
      data() {
          return {
              index: 0,
              tabs: [
                  {
                      label: '商品',
                      component: Goods
                  },
                  {
                      label: '评价',
                      component: Ratings
                  },
                  {
                      label: '商家',
                      component: Seller
                  }
              ],
              slideOptions: {
                  listenScroll: true,
                  probeType: 3,
                  directionLockThreshold: 0
              }
          }
      },
      computed: {
          selectedLabel: {
              get() {
                  return this.tabs[this.index].label
              },
              set(newValue) { // <cube-tab-bar> 标签的v-model会执行setter
                  this.index = this.tabs.findIndex(item => {
                      return item.label === newValue
                  })
              }
          }
      },
      components: { Seller, Goods, Ratings },
      methods: {
          changeHandler() {},
          changePage(currentIndex) {
              this.index = currentIndex
          },
          scrollHandle(pos) {
              const tabWidth = this.$refs.tab.$el.clientWidth
              const slideWidth = this.$refs.slide.slide.scrollerWidth
              const transform = -pos.x / slideWidth * tabWidth
              this.$refs.tab.setSliderTransform(transform)
          }
      }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/variable.styl'
  .cube-wrapper
    display: flex
    flex-direction: column
    border-1px($color-row-line)
    height: 100%
    & >>> .cube-tab
      height: 40px
      line-height: 26px
    .slide-wrapper
      flex: 1
</style>
