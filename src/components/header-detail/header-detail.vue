<template>
  <transition name="fade">
    <div class="header-detail" v-if="visible">
      <div class="detail-main">
        <div class="name">{{sellerData.name}}</div>
        <star :size="48" :score="sellerData.score"></star>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul class="support" v-if="sellerData.supports">
          <li v-for="(item, index) in sellerData.supports" :key="index" class="support-item">
            <support-icon :size="1" :type="item.type"></support-icon>
            <span>{{item.description}}</span>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="adv">{{sellerData.bulletin}}</div>
      </div>
      <i class="cubeic-close" @click="close"></i>
    </div>
  </transition>
</template>
<script>
  import Star from 'components/star/star.vue'
  import SupportIcon from 'components/support-icon/support-icon.vue'
  export default {
      name: 'header-detail',
      data() {
          return {
              visible: false
          }
      },
      props: {
          sellerData: Object,
          default() {
              return {}
          }
      },
      components: { Star, SupportIcon },
      methods: {
          close() {
              this.visible = false
          },
          show() {
              this.visible = true
          }
      }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/variable.styl'
  .header-detail
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color: $color-background-s
    color: $color-white
    opacity: 1
    .detail-main
      width: 80%
      margin: 64px auto 0
      .name
        font-size: $fontsize-large
        font-weight: 700
        text-align: center
      .title
        display: flex
        align-items: center
        justify-content: center
        .line
          flex: 1
          border-1px(rgba(255, 255, 255, 0.2))
        .text
          padding: 0 12px
          font-size: $fontsize-medium
      .support
        padding: 24px 12px 16px
        .support-item
          display: flex
          align-items: center
          margin-bottom: 12px
          font-size: $fontsize-small
        .support-ico
          margin-right: 6px
      .adv
        padding: 24px 12px 0
        font-size: $fontsize-small
        line-height: 24px
    .cubeic-close
      position: fixed
      bottom: 32px
      left: 0
      right: 0
      font-size: $fontsize-large-xxxx
      text-align: center
      color: $color-background-w
  .fade-enter-active, .fade-leave-active
    transition: all 1s
  .fade-enter, .fade-leave-to
    opacity: 0
  /*fade-leave-to 元素过渡的结束状态 fade-enter 过渡生效时的状态*/
</style>
