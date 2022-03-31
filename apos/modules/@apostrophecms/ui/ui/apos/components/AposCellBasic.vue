<script>
import AposCellBasic from 'apostrophe/modules/@apostrophecms/ui/ui/apos/components/AposCellBasic.vue'

export default {
  extends: AposCellBasic,
  methods: {
    get(fieldName) {
      const result = AposCellBasic.mixins[0].methods.get.call(this, fieldName)
      const translation = this.$t('apostrophe:' + result)
      if (!translation.includes('apostrophe:')) {
        // translation succeeded
        return translation
      }

      // 'apostrophe:' still in translation meaning it wasn't a field to translate,
      // so return original result
      return result
    },
  },
}
</script>
