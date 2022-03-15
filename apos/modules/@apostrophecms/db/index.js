module.exports = {
  tasks(self) {
    return {
      fixtures: {
        usage: 'Creates database defaults',
        async task() {
          self.apos.util.log('Fixtures task started')
          await self.apos.doc.db.deleteMany({ fixtures: true })
          const req = self.apos.task.getAdminReq()
          await self.emit('fixtures', req)
        },
      },
    }
  },
}
