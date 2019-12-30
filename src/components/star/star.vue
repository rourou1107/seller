<template>
  <div class="star" :class="starType">
    <span v-for="(item, index) in itemClasses" :key="index" :class="item" class="star-item"></span>
  </div>
</template>
<script>
    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'
    export default {
        name: 'star',
        props: {
            size: Number,
            score: Number
        },
        computed: {
            starType() {
              return 'star-' + this.size
            },
            itemClasses() {
                let result = []
                let score = Math.floor(this.score * 2) / 2
                let hasDecimal = score % 1 !== 0
                score = Math.floor(score)
                for (let i = 0; i < score; i++) {
                    result.push(CLS_ON)
                }
                if (hasDecimal) {
                    result.push(CLS_HALF)
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF)
                }
                return result
            }
        }
    }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  .star
    display: flex
    justify-content: center
    align-items: center
    margin-top: 16px
    margin-bottom: 28px
    .star-item
      background-repeat: no-repeat
    &.star-48 // .star.star-48
      .star-item // .star.star-48 .star-item
        width: 20px
        height: 20px
        background-size: 20px 20px
        margin-right: 20px
        &.on
          bg-image('star48_on')
        &.off
          bg-image('star48_off')
        &.half
          bg-image('star48_half')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        background-size: 15px 15px
        margin-right: 6px
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        background-size: 10px 10px
        margin-right: 3px
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')
</style>
