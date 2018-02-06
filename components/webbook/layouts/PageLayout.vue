<template lang="jade">
.page-container
  .page-sidebar
    sidebar
  .page-content
    slot
</template>
<script>
import Sidebar from '@/components/webbook/Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>
<style lang="sass">
  .page-container
    height: 100vh
  .page-sidebar
    width: 230px
    height: 100vh
    position: fixed
    background: rgba(174,54,54, 0.1)
  .page-content
    width: calc(100% - 230px)
    height: 100vh
    display: block
    margin-left: 230px
    background: rgb(254,254,254)
</style>
