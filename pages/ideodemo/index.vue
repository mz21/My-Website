<template lang="jade">
keep-alive
  component(v-bind:is="slides[currPosition]")
</template>
<script>
import Page1 from './page1.vue'
import Page2 from './page2.vue'
import Page3 from './page3.vue'
import Page4 from './page4.vue'
import Page5 from './page5.vue'
import Page6 from './page6.vue'
import Page7 from './page7.vue'
import Page8 from './page8.vue'
import Page9 from './page9.vue'
import Page10 from './page10.vue'
import Page11 from './page11.vue'
import Page12 from './page12.vue'
import Page13 from './page13.vue'
import Page21 from './page14.vue'
import Page15 from './page15.vue'
import Page16 from './page16.vue'
import Page17 from './page17.vue'
import Page18 from './page18.vue'

export default {
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    Page8,
    Page9,
    Page10,
    Page11,
    Page12,
    Page13,
    Page21,
    Page15,
    Page16,
    Page17,
    Page18
  },
  data: function () {
    return {
      slides: [Page1, Page2, Page21, Page9, Page3, Page4, Page5, Page6, Page7, Page8, Page10, Page11, Page12, Page13, Page10, Page15, Page16, Page17, Page10],
      currPosition: 0
    }
  },
  mounted: function () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 39) {
        if(this.currPosition < this.slides.length - 1) {
          this.currPosition++
        }
      }
      if (e.keyCode === 37) {
        if(this.currPosition > 0) {
          this.currPosition--
        }
      }
    })
  }
}
</script>
<style lang="sass">
.container
  height: 100vh
  background: whitesmoke
iframe
  display: block !important
  box-shadow: 0px 1px 2px rgba(200,200,200,0.5)
.iframe_container
  width: 100%
  height: 100vh
  margin: 0 auto
  display: flex
  justify-content: center
  align-items: center
h1, h2, h3
  font-weight: 400
  background: white
</style>
