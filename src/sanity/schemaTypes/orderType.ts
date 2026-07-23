import { defineType, defineField } from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'razorpayOrderId',
      title: 'Razorpay Order ID',
      type: 'string',
    }),
    defineField({
      name: 'razorpayPaymentId',
      title: 'Razorpay Payment ID',
      type: 'string',
    }),
    defineField({
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'zipCode', title: 'ZIP Code', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'productId', title: 'Product ID', type: 'string' }),
            defineField({ name: 'name', title: 'Product Name', type: 'string' }),
            defineField({ name: 'quantity', title: 'Quantity', type: 'number' }),
            defineField({ name: 'price', title: 'Price', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount (₹)',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'status',
      customer: 'customerName',
    },
    prepare: ({ title, subtitle, customer }) => ({
      title: title || 'No order number',
      subtitle: `${subtitle || 'unknown'}${customer ? ` — ${customer}` : ''}`,
    }),
  },
})
