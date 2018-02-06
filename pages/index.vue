<template>
  <div id="home_wrapper">
    <div class="tile" v-for="color in colors" :key="color" v-bind:style="{backgroundColor: color}"></div>
    <div class="nothing_to_see_block">
      <div class="nothing_to_see">
        <h1>Just a blank home page. Move along, move along..*.</h1>
        <p class="footnote">* Or keep refreshing for more colors with a blue-green tint.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHome',
  data () {
    let colors = []
    for (let i = 0; i < 138; i++) {
      let r = Math.floor(Math.random() * 108 + 140)
      let g = Math.floor(Math.random() * 85 + 170)
      let b = Math.floor(Math.random() * 55 + 200)
      colors.push(`rgba(${r},${g},${b}, 0.4)`)
    }
    return {
      colors: colors
    }
  }
}
</script>
<style lang="sass">
#app, body
  overflow: hidden
#home_wrapper
  width: 100%
  height: 100%
  background: white
  overflow: hidden
  .tile
    float: left
    width: 80px
    height: 80px
  .nothing_to_see_block
    position: absolute
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
  .nothing_to_see
    padding: 4rem
    border-radius: 4px
    background: rgba(250,250,250,0.7)
    box-shadow: 0px 2px 4px rgb(230,230,230)
    h1
      font-size: 24px
      font-weight: 500
    p
      font-size: 15px
      font-weight: 400
    .footnote
      margin-top: 10px
      color: rgb(40,40,40)
</style>
