<script>
import AposCellLastEdited from 'apostrophe/modules/@apostrophecms/ui/ui/apos/components/AposCellLastEdited.vue'

export default {
  extends: AposCellLastEdited,
  methods: {
    getRelativeTime(value) {
      let result = AposCellLastEdited.methods.getRelativeTime.call(this, value)

      if (apos.locale === 'fr') {
        const val = result.split(' ago')[0]
        const timeDuration = val.match(/^[0-9]*/g)[0]
        const timeFormat = val.match(/[^0-9]*$/g)[0]

        const formats = {
          s: 'sec',
          m: 'min',
          h: 'h',
          d: 'j',
          w: 'sem',
          mo: 'mois',
          yr: 'an',
        }

        if (formats[timeFormat]) {
          const format =
            timeFormat === 'yr' && timeDuration > 1
              ? 'ans'
              : formats[timeFormat]
          result = `${timeDuration} ${format}`
        } else {
          result = val
        }
      }

      return result
    },
  },
}
</script>
