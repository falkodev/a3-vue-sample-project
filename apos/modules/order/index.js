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
            const domains = await self.apos.domain
              .find(req, { aposDocId: { $in: doc._itinerary[0].domainIds } })
              .toArray()

            const customersDomains = domains.map((domain) => {
              const _customers = new Set(domain._customers)
              _customers.add(doc._customer[0])

              return { ...domain, _customers }
            })

            await Promise.all(
              customersDomains.map((customersDomain) =>
                self.apos.domain.update(req, customersDomain),
              ),
            )
            doc._domains = customersDomains
          }
        },
      },
    }
  },
}
