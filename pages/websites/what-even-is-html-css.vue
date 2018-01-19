<template>
<div class="container">
  <div class="coding-block-container">
    <pre v-highlightjs="template">
      <code class="javascript">
      </code>
    </pre>
  </div>
  <div>
    <p>Hello world</p>
  </div>
</div>
</template>
<script>
import hljs from 'highlight.js'
import txt from '@/assets/webbook/test.txt'

export default {
  data() {
    console.log(txt)
    return {
      template: txt
    }
  }
}
</script>
<style lang="sass">
@import '~assets/css/github'
</style>
<style lang="sass" scoped>
.container
  width: 100%
  height: 100%
  display: flex
.coding-block-container
  width: 40%
  height: 100%
</style>
