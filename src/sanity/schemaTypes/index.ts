import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { collectionType } from './collectionType'
import { orderType } from './orderType'
import { policyType } from './policyType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productType, categoryType, collectionType, orderType, policyType],
}
