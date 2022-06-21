module.exports = {
  options: {
    localized: false,
  },
  fields: {
    add: {
      logo: {
        type: 'attachment',
        label: 'apostrophe:logoLabel',
        fileGroup: 'images',
      },
      backgroundImage: {
        type: 'attachment',
        label: 'apostrophe:backgroundImageLabel',
        fileGroup: 'images',
      },
      backgroundImageLogin: {
        type: 'attachment',
        label: 'apostrophe:backgroundImageLoginLabel',
        fileGroup: 'images',
      },
      socialNetworks: {
        label: 'apostrophe:socialNetworks.label',
        type: 'checkboxes',
        choices: [
          {
            label: 'Instagram',
            value: 'instagram',
          },
          {
            label: 'Facebook',
            value: 'facebook',
          },
          {
            label: 'LinkedIn',
            value: 'linkedin',
          },
        ],
      },
      socialUrlInstagram: {
        label: 'apostrophe:socialNetworks.urlLabelInstagram',
        type: 'url',
        required: 'true',
        def: 'https://www.instagram.com/your_profile/',
        if: {
          socialNetworks: 'instagram',
        },
      },
      socialUrlFacebook: {
        label: 'apostrophe:socialNetworks.urlLabelFacebook',
        type: 'url',
        required: 'true',
        def: 'https://www.facebook.com/your_profile/',
        if: {
          socialNetworks: 'facebook',
        },
      },
      socialUrlLinkedin: {
        label: 'apostrophe:socialNetworks.urlLabelLinkedin',
        type: 'url',
        required: 'true',
        def: 'https://www.linkedin.com/in/your_profile/',
        if: {
          socialNetworks: 'linkedin',
        },
      },
      mainColor: {
        type: 'color',
        label: 'apostrophe:graphicIdentity.mainColor',
      },
      secondaryColor: {
        type: 'color',
        label: 'apostrophe:graphicIdentity.secondaryColor',
      },
      backgroundColor: {
        type: 'color',
        label: 'apostrophe:graphicIdentity.backgroundColor',
      },
      textColor: {
        type: 'color',
        label: 'apostrophe:graphicIdentity.textColor',
      },
      navbarColor: {
        type: 'color',
        label: 'apostrophe:graphicIdentity.navbarColor',
      },
    },
    group: {
      basics: {
        label: 'apostrophe:customImagesLabel',
        fields: ['logo', 'backgroundImage', 'backgroundImageLogin'],
      },
      socialNetworks: {
        label: 'apostrophe:socialNetworks.tabLabel',
        fields: [
          'socialNetworks',
          'socialUrlInstagram',
          'socialUrlFacebook',
          'socialUrlLinkedin',
        ],
      },
      graphicIdentity: {
        label: 'apostrophe:graphicIdentity.title',
        fields: [
          'mainColor',
          'secondaryColor',
          'backgroundColor',
          'textColor',
          'navbarColor',
        ],
      },
    },
  },
}
