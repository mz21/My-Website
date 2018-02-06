<template lang="jade">
component(:is="unit", :content="content")

</template>
<script>
import UnitMarkdown from '@/components/webbook/UnitMarkdown.vue'
import UnitCode from '@/components/webbook/UnitCode.vue'
export default {
  components: {
    UnitMarkdown,
    UnitCode
  },
  props: ['type', 'content'],
  computed: {
    unit: function () {
      console.log(this.type)
      if (this.type === 'md') {
        return UnitMarkdown
      }
      return UnitCode
    }
  }
}
</script>
<style lang="sass">
</style>
