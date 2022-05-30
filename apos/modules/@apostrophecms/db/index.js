module.exports = {
  tasks(self) {
    return {
      fixtures: {
        usage: 'node app @apostrophecms/db:fixtures',
        async task() {
          self.apos.util.log('Fixtures task started')
          await self.apos.doc.db.deleteMany({ fixtures: true })
          const req = self.apos.task.getAdminReq()
          await self.emit('fixtures', req)
        },
      },
      defaults: {
        usage: 'node app @apostrophecms/db:defaults',
        async task() {
          self.apos.util.log('Defaults task started')
          const req = self.apos.task.getAdminReq()
          await self.emit('defaults', req)
        },
      },
    }
  },
}
