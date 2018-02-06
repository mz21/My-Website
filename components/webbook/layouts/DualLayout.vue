<template lang="jade">
.dual-layout
  .left
    h1.title {{ title }}
  .right
    unit(v-for="(unit, index) in units" v-bind:key="index" v-bind:type="unit.type" v-bind:content="unit.content")
</template>
<script>
import Unit from '@/components/webbook/Unit.vue'
export default {
  components: {
    Unit
  },
  props: ['data'],
  computed: {
    title: function () {
      return this.data.title
    },
    units: function () {
      return this.data.layout.units
    }
  }
}
</script>
<style lang="sass" scoped>
.dual-layout
  display: flex
.left, .right
  width: 50%
.title
  margin-bottom: 22px
  font-size: 20px
  color: rgb(60,62,60)
  font-weight: 600
</style>
