<template lang="jade">
.container
  h1 Data-Ink Ratio
  .images
    .img_container
      img(v-bind:src="img1")
    .img_container
      img(v-bind:src="img2")
</template>
<script>
import img1 from '@/assets/images/2-1.png'
import img2 from '@/assets/images/2-2.png'
export default {
  mounted: function () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 39) {
        console.log('right')
      }
    })
  },
  data: function () {
    return {
      img1,
      img2
    }
  }
}
</script>
<style lang="sass" scoped>
.container
  display: flex
  justify-content: center
  align-items: center
  align-content: center
  flex-wrap: wrap
h1
  font-size: 72px
  text-align: center
.images
  display: flex
  justify-content: space-around
  margin-top: 50px
  .img_container
    width: 50%
  img
    max-width: 60%
    height: auto
    display: block
    margin: 0 auto

</style>
