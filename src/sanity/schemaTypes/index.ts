import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { collectionType } from './collectionType'
import { productType } from './productType'
import { editorialType } from './editorialType'
import { policyType } from './policyType'
import { orderType } from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    collectionType,
    productType,
    editorialType,
    policyType,
    orderType,
  ],
}
