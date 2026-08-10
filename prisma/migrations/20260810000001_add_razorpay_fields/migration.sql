-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customer" JSONB,
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "shippingAddress" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Order_razorpayOrderId_key" ON "Order"("razorpayOrderId");
