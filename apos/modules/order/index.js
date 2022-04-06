module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'order',
    label: 'apostrophe:order',
    localized: false,
  },
  fields: {
    add: {
      _itinerary: {
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
      _domains: {
        type: 'relationship',
        withType: 'place',
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
        fields: [
          '_itinerary',
          '_customer',
          '_domains',
          'date',
          'originalPrice',
          'paidPrice',
        ],
      },
    },
  },
  extendMethods() {
    return {
      getRestQuery(_super, req) {
        const query = _super(req)
        if (req.user.role === 'editor') {
          query._domains(req.user.domainIds[0])
        }
        return query
      },
    }
  },
  handlers(self) {
    return {
      beforeSave: {
        checkPermissions(req, doc) {
          if (req.user.role !== 'admin') {
            throw new Error('unauthorized')
          }
          return doc
        },

        async addDomainsToCustomer(req, doc) {
          if (doc.aposDocId) {
            const domains = new Set(doc._customer[0].domainsIds)
            domains.add(doc.domainsIds[0])
            const domainsInCustomers = {
              ...doc._customer[0],
              domainsIds: [...domains],
            }

            await self.apos.customer.update(req, domainsInCustomers)
          }
        },
      },
    }
  },
}
