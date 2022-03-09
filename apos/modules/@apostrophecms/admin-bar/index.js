module.exports = {
  extendMethods() {
    return {
      getBrowserData(_super, req) {
        const adminBar = _super(req)
        if (adminBar && adminBar.items) {
          adminBar.items = adminBar.items.filter(
            (item) => !item.name.includes('-tag'),
          )

          if (
            req.user &&
            (req.user.groupType !== 'syndicat' || req.user.role !== 'admin')
          ) {
            adminBar.items = adminBar.items.filter(
              (item) => item.name !== '@apostrophecms/file',
            )
          }
        }

        return adminBar
      },
    }
  },
}
