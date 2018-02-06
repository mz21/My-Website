<template lang="jade">
.container
  .left_box
    .module
      h1.headline WHAT EVEN IS HTML/CSS?
      p HTML is code that creates the content that’s on the website.
      p CSS is code that says what the website looks like.
      span(v-html="module")
      span(v-html="module1")
  .right_box
</template>
<script>
import module from '@/data/webbook/modules/1-2-samplecss.txt'
import module1 from '@/data/webbook/modules/1-3-samplehtml.txt'

export default {
  data() {
    return {
      module,
      module1
    }
  }
}
</script>
<style lang="sass" scoped>
.container
  background-color: rgb(243,247,251)
  height: 100vh
  display: flex
  min-width: 800px
  max-width: 1800px
.left_box, .right_box
  width: 50%
.module
  width: 70%
  min-width: 300px
  background: white
  float: right
  border: 1px solid rgb(234,234,234)
  border-radius: 4px
  padding: 32px
  box-shadow: 2px 2px 2px rgba(234,234,234,0.5)
h1.headline
  font-size: 15px
  margin-bottom: 16px
  font-weight: 500
p
  font-size: 15px
  line-height: 1.3
p.footnote
  color: rgb(117,117,117)
</style>
