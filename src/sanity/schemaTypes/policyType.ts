import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const policyType = defineType({
  name: 'policy',
  title: 'Policy / Legal Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { 
              name: 'body', 
              title: 'Body Text', 
              type: 'array', 
              of: [{ type: 'block' }] 
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'datetime',
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
