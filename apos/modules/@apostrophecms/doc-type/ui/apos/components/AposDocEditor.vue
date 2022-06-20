<script>
import AposDocEditor from 'apostrophe/modules/@apostrophecms/doc-type/ui/apos/components/AposDocEditor.vue'

export default {
  extends: AposDocEditor,
  computed: {
    saveDisabled() {
      const result = AposDocEditor.computed.saveDisabled.call(this)
      if (
        apos.userRole !== 'admin' &&
        ['customer', 'order', 'domain-related/activity'].includes(
          this.original?.type,
        )
      ) {
        this.errorCount = 1
        return true
      }
      return result
    },
  },
}
</script>
