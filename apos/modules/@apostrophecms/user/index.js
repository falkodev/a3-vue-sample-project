module.exports = {
  fields: {
    add: {
      role: {
        label: 'apostrophe:role',
        type: 'role',
        choices: [
          {
            label: 'apostrophe:guest',
            value: 'guest',
          },
          {
            label: 'apostrophe:contributor',
            value: 'contributor',
          },
          {
            label: 'apostrophe:editor',
            value: 'editor',
          },
          {
            label: 'apostrophe:admin',
            value: 'admin',
          },
        ],
        def: 'guest',
        required: true,
      },
      groupType: {
        label: 'apostrophe:groupType',
        type: 'select',
        if: {
          $or: [{ role: 'guest' }, { role: 'contributor' }, { role: 'editor' }],
        },
        choices: [
          {
            label: 'apostrophe:syndicate',
            value: 'syndicate',
          },
          {
            label: 'apostrophe:domain',
            value: 'domain',
          },
        ],
        def: 'domain',
        required: true,
      },
    },

    group: {
      basics: {
        fields: ['title', 'disabled', 'groupType', 'role'],
      },
    },
  },
}
