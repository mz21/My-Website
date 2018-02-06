<template lang="jade">
page-layout
  lesson-layout(:data="data")
</template>
<script>
import PageLayout from '@/components/webbook/layouts/PageLayout.vue'
import LessonLayout from '@/components/webbook/layouts/LessonLayout.vue'
import data from '@/data/webbook/lessons/1-whatevenishtmlcss.json'
export default {
  components: {
    PageLayout,
    LessonLayout
  },
  data: function () {
    return {
      data
    }
  }
}
</script>
<style lang="sass">
</style>
