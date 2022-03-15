module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'order',
    label: 'apostrophe:order',
    localized: false,
  },
  fields: {
    add: {
      _event: {
        type: 'relationship',
        min: 1,
        max: 1,
        required: true,
      },
      _customer: {
        type: 'relationship',
        min: 1,
        max: 1,
        required: true,
      },
      _domain: {
        type: 'relationship',
        max: 1,
        readOnly: true,
      },
      date: {
        type: 'date',
      },
      originalPrice: {
        type: 'float',
      },
      paidPrice: {
        type: 'float',
      },
    },
    group: {
      basics: {
        fields: ['_event', '_customer', 'date', 'originalPrice', 'paidPrice'],
      },
    },
  },
  extendMethods() {
    return {
      getRestQuery(_super, req) {
        const query = _super(req)
        if (req.user.role === 'contributor') {
          query.domain('domaine-1')
        }
        return query
      },
    }
  },
  handlers(self) {
    return {
      beforeSave: {
        async addCustomerToDomain(req, doc) {
          if (doc.aposDocId) {
            const domain = await self.apos.domain
              .find(req, { aposDocId: doc._event[0].domainIds[0] })
              .toObject()
            const _customers = new Set(domain._customers)
            _customers.add(doc._customer[0])
            await self.apos.domain.update(req, { ...domain, _customers })
            doc._domain = [domain]
          }
        },
      },
    }
  },
}
