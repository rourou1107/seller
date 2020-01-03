<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul v-if="goodsData.length">
        <li
          class="menu-item"
          v-for="(item, index) in goodsData"
          :key="index">
          <div>
            <div class="icon" >
              <support-icon :size="1" :type="item.type" v-if="item.type > 0"></support-icon>
            </div>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="content-wrapper"></div>
  </div>
</template>
<script>
  import { getGoods } from 'api/index.js'
  import SupportIcon from 'components/support-icon/support-icon.vue'

  export default {
      name: 'goods',
      data() {
          return {
              goodsData: []
          }
      },
      created() {
          this._getGoods()
      },
      components: { SupportIcon },
      methods: {
        _getGoods() {
            getGoods().then((data) => {
                this.goodsData = data
            })
        }
      }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .goods
    position: absolute
    top: 0
    bottom: 48px
    left: 0
    right: 0
    display: flex
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      white-space: normal
      background-color: $color-background-ssss
      .menu-item
        display: flex
        align-items: center
        width: 70%
        height: 54px
        margin: 0 auto
        font-size: $fontsize-small
        border-bottom: 1px solid $color-row-line
        vertical-align: top
        .icon
          display: inline-block
          vertical-align: top
    .content-wrapper
      flex: 1
</style>
