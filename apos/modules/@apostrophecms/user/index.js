module.exports = {
  fields: {
    add: {
      groupType: {
        type: 'select',
        choices: [
          {
            label: 'Syndicat',
            value: 'syndicat',
          },
          {
            label: 'Vignoble',
            value: 'vignoble',
          },
        ],
        def: 'vignoble',
        required: true,
      },
    },
  },
}
