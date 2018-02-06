<template lang="jade">
.lesson-layout
  .filler-width
  .chosen-layout
    dual-layout(:data="data")
  .next-section
    p NEXT
</template>
<script>
import BasicLayout from '@/components/webbook/layouts/BasicLayout.vue'
import DualLayout from '@/components/webbook/layouts/DualLayout.vue'

export default {
  components: {
    BasicLayout,
    DualLayout
  },
  props: ['data']
}
</script>
<style lang="sass">
.lesson-layout
  display: flex
  position: relative
.filler-width, .next-section
  width: 7.13%
  min-width: 50px
.chosen-layout
  width: 85.74%
  height: 100vh
  padding: 40px 9% 0px 0
.next-section
  position: absolute
  right: 0
  bottom: 0
  height: 70px
  width: 100%
  box-shadow: 0px -1px 1px rgba(240,240,240,0.5)
  border-top: 1px solid rgb(230,230,230)
  display: flex
  align-items: center
  justify-content: center
  background: rgb(248,248,248)
  p
    color: rgb(26,155,154)
    font-size: 15px
    font-weight: 600
    letter-spacing: 0.45px
</style>
