<template lang="jade">
div(v-html="content").markdown-block
</template>
<script>
export default {
  props: ['content'],
}
</script>
<style lang="sass">
.markdown-block
  padding-left: 16px
  border-left: 3px solid rgba(26,155,154,0.8)
  p
    font-size: 15px
    font-weight: 400
    color: rgb(100,102,100)
</style>
