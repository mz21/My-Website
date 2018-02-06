<template lang="jade">
div(v-html="content").code-block

</template>
<script>
export default {
  props: ['content']
}
</script>
<style lang="sass">
.code-block
  width: 500px
  max-width: 100%
  .highlight
    width: 100%
    pre
      width: 100%
.code-block
  padding-left: 16px
  border-left: 3px solid rgba(26,155,154,0.8)
  margin: 28px 0
</style>
