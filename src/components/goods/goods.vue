<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul v-if="goodsData.length">
        <li
          class="menu-item"
          :class='{current: currentIndex===index}'
          v-for="(item, index) in goodsData"
          :key="index"
          @click="_scrollTo(index)"
        >
          <div>
            <div class="icon">
              <support-icon :size="1" :type="item.type" v-if="item.type > 0"></support-icon>
            </div>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="content-wrapper" ref="content">
      <ul>
        <li v-for="(item, index) in goodsData" :key="index" ref="goods" class="content-list-hook">
          <div class="title">{{item.name}}</div>
          <ul class="content">
            <li v-for="(item, index) in item.foods" :key="index" class="content-item">
              <div class="img">
                <img :src="item.image" alt=""/>
              </div>
              <div class="descs">
                <div class="name">{{item.name}}</div>
                <div class="desc">{{item.description}}</div>
                <div class="sell">
                  <span class="number">月售{{item.sellCount}}份</span>
                  <span>好评率{{item.rating}}%</span>
                </div>
                <div class="price">
                  <span class="price-now">￥{{item.price}}</span>
                  <span v-if="item.oldPrice" class="price-old">￥{{item.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    import { getGoods } from 'api/index.js'
    import SupportIcon from 'components/support-icon/support-icon.vue'
    import BScroll from '@better-scroll/core'

    export default {
        name: 'goods',
        data() {
            return {
                goodsData: [],
                heightList: [],
                scrollY: 0
            }
        },
        created() {
            this._getGoods()
        },
        components: { SupportIcon },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.heightList.length; i++) {
                    let left = this.heightList[i]
                    let right = this.heightList[i + 1]
                    if (!right || (this.scrollY >= left && this.scrollY < right)) { // 比如 [0, 1021) 为第一区域
                        return i
                    }
                }
                return 0
            }
        },
        methods: {
            _getGoods() {
                getGoods().then((data) => {
                    this.goodsData = data
                    this._initScroll() // 初始化 BS
                })
            },
            _initScroll() {
                this.$nextTick(() => {
                    /* eslint-disable no-new */
                    this.content = new BScroll(this.$refs.content, {
                        probeType: 3 // 实时派发 scroll 事件
                    })
                    this.menu = new BScroll(this.$refs.menu, {})
                    this.calculateHeight()
                    this.content.on('scroll', (pos) => { // pos 为一个对象, 有x、y 两个属性。存的是滚动的 x、y 坐标
                        this.scrollY = Math.round(Math.abs(pos.y))
                    })
                })
            },
            _scrollTo(index) {
                this.content.scrollToElement(this.$refs.goods[index], 1000)
            },
            // 计算每一块 content list 的高度
            calculateHeight() {
                let hook = this.$refs.content.getElementsByClassName('content-list-hook')
                let height = 0
                this.heightList.push(0)
                for (let i = 0; i < hook.length; i++) {
                    height += hook[i].clientHeight
                    this.heightList.push(height)
                }
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
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      white-space: normal
      background-color: $color-background-ssss
      .menu-item
        display: flex
        align-items: center
        justify-content: center
        padding: 0 10px
        height: 54px
        font-size: $fontsize-small
        border-bottom: 1px solid $color-row-line
        vertical-align: top
        &.current
          background-color: $color-background-ww
          font-weight: 400
          border-none()
        .icon
          display: inline-block
          vertical-align: top

    .content-wrapper
      flex: 1
      width: 0

      .title
        height: 26px
        line-height: 26px
        font-size: $fontsize-small
        color: $color-font
        padding-left: 14px
        background: $color-background-ssss
        border-left: 2px solid $color-col-line

      .content
        .content-item
          display: flex
          margin: 18px 18px 0
          padding-bottom: 18px
          border-bottom: 1px solid $color-row-line

          .img
            flex: 0 0 57px
            width: 57px

            img
              width: 100%

          .descs
            flex: 1
            margin-left: 10px

            .name
              font-size: $fontsize-medium
              margin-top: 2px

            .desc, .sell
              font-size: $fontsize-small-s
              color: $color-font-g
              margin: 8px 0

            .sell
              .number
                margin-right: 12px

            .price
              .price-now
                color: $color-red
                font-size: $fontsize-medium
                margin-right: 8px

              .price-old
                font-size: $fontsize-small-s
                color: $color-font-g
                text-decoration: line-through
</style>
