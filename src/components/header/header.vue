<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="sellerData.avatar" alt=""/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellerData.name}}</span>
        </div>
        <div class="description">{{sellerData.description}} / {{sellerData.minPrice}}分钟送达</div>
        <div class="support" v-if="sellerData.supports">
          <support-icon :type="sellerData.supports[0].type" :size="1"></support-icon>
          <span class="text">{{sellerData.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="sellerData.supports">
        <div class="count">{{sellerData.supports.length}}个</div>
        <i class="cubeic-arrow icon"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <div class="bulletin-title"></div>
      <div class="bulletin-text">{{sellerData.bulletin}}</div>
      <i class="cubeic-arrow icon"></i>
    </div>
  </div>
</template>

<script>
  import SupportIcon from '../support-icon/support-icon.vue'
  export default {
      props: {
          sellerData: {
              type: Object,
              default() {
                  return {}
              }
          }
      },
      components: { SupportIcon }
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/variable.styl'

  .header
    background-color: $color-background-ss
    color: $color-white
    .content-wrapper
      position: relative
      display: flex
      align-items: center
      padding: 24px 12px 18px 24px
      .avatar
        width: 64px
        height: 64px
        img
          width 100%
      .content
        margin-left 16px
        .title
          display: flex
          align-items: center
          .brand
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            margin-right: 6px
          .name
            font-size: $fontsize-large
            font-weight: bold
        .description
          font-size: $fontsize-small
          margin-bottom: 10px
          margin-top: 8px

        .support
          display: flex
          align-items: center
          .text
            font-size: $fontsize-small-s
            margin-left: 4px
      .support-count
        position: absolute
        right: 0
        bottom: 0
        display: flex
        align-items: center
        margin-bottom: 18px
        margin-right: 12px
        padding: 7px 8px
        background-color: $color-background-w
        font-size: $fontsize-small-s
        border-radius: 10px
        .count
          margin-right: 4px
    .bulletin-wrapper
      display: flex
      align-items: center
      font-size: 10px
      padding: 8px 12px
      background-color: $color-background-sss
      .bulletin-title
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        margin-right: 4px
      .bulletin-text
        flex: 1
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
</style>
