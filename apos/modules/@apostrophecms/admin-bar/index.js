module.exports = {
  extendMethods() {
    return {
      getBrowserData(_super, req) {
        const adminBar = _super(req)
        if (adminBar && adminBar.items) {
          adminBar.items = adminBar.items.filter(
            (item) => !item.name.includes('-tag'),
          )

          if (req?.user?.role) {
            if (req.user.role !== 'admin') {
              if (req.user.role === 'guest') {
                return null
              } else {
                adminBar.items = adminBar.items.filter(
                  (item) => item.name !== '@apostrophecms/file',
                )
              }
            }
          }
        }

        return adminBar
      },
    }
  },
}
