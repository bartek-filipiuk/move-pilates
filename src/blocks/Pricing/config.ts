import type { Block } from 'payload'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'packages',
      type: 'array',
      label: 'Packages',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'Price (e.g. "85 zł")',
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Duration (e.g. "50 min")',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          label: 'Highlight this package',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Button Label',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'Button URL',
        },
      ],
    },
    {
      name: 'carnets',
      type: 'array',
      label: 'Carnets / Multi-entry passes',
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (whole card becomes clickable)',
          validate: (value: string | null | undefined) =>
            !value ||
            /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(value) ||
            'Podaj pelny adres z https:// albo sciezke zaczynajaca sie od /',
        },
      ],
    },
  ],
  labels: {
    plural: 'Pricing Sections',
    singular: 'Pricing Section',
  },
}
