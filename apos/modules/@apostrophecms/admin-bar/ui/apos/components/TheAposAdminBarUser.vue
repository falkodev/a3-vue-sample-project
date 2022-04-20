<script>
import TheAposAdminBarUser from 'apostrophe/modules/@apostrophecms/admin-bar/ui/apos/components/TheAposAdminBarUser.vue'

export default {
  extends: TheAposAdminBarUser,
  methods: {
    emitEvent(evt) {
      TheAposAdminBarUser.methods.emitEvent.call(this, evt)
      if (evt === 'user-logout') {
        sessionStorage.setItem('aposLoadAfterLogout', true)
      }
    },
  },
}
</script>
