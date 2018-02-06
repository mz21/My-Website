<template lang="jade">
.sidebar
  .book-title-section
    h1.book-title {{ title }}
  .milestone-section
  .roadmap-section
</template>
<script>
export default {
  data: function () {
    return {
      title: 'bits of that: HTML & CSS'
    }
  }
}
</script>
<style lang="sass" scoped>
.sidebar
  width: 100%
  height: 100vh
  border-right: 1px solid rgb(230,232,230)
  .book-title-section
    background: rgb(26,155,154)
    h1.book-title
      font-size: 15px
      text-align: center
      color: rgb(240,247,245)
      padding: 18px 0
  .milestone-section
    height: 200px
    background: rgb(252,253,252)
  .roadmap-section
    height: calc(100vh - 250px)
    background: rgb(255,255,255)
</style>
