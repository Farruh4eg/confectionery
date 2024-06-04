-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NOT NULL,
    "id_position" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factory" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "num_employees" INTEGER NOT NULL,

    CONSTRAINT "Factory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factory_Employee" (
    "id" SERIAL NOT NULL,
    "id_factory" INTEGER NOT NULL,
    "id_employee" INTEGER NOT NULL,

    CONSTRAINT "Factory_Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pickup_Point" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "working_hours" TEXT NOT NULL,

    CONSTRAINT "Pickup_Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pickup_Point_Employee" (
    "id" SERIAL NOT NULL,
    "id_pickup_point" INTEGER NOT NULL,
    "id_employee" INTEGER NOT NULL,

    CONSTRAINT "Pickup_Point_Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "id_factory" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Category" (
    "id" SERIAL NOT NULL,
    "id_product" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,

    CONSTRAINT "Product_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Employee" (
    "id" SERIAL NOT NULL,
    "id_employee" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "Product_Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(16) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "id_customer" INTEGER NOT NULL,
    "id_pickup_point" INTEGER NOT NULL,
    "total_cost" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Product" (
    "id" SERIAL NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "Order_Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Factory_Employee_id_employee_key" ON "Factory_Employee"("id_employee");

-- CreateIndex
CREATE UNIQUE INDEX "Pickup_Point_Employee_id_employee_key" ON "Pickup_Point_Employee"("id_employee");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_position_fkey" FOREIGN KEY ("id_position") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factory_Employee" ADD CONSTRAINT "Factory_Employee_id_factory_fkey" FOREIGN KEY ("id_factory") REFERENCES "Factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factory_Employee" ADD CONSTRAINT "Factory_Employee_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup_Point_Employee" ADD CONSTRAINT "Pickup_Point_Employee_id_pickup_point_fkey" FOREIGN KEY ("id_pickup_point") REFERENCES "Pickup_Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup_Point_Employee" ADD CONSTRAINT "Pickup_Point_Employee_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_factory_fkey" FOREIGN KEY ("id_factory") REFERENCES "Factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Category" ADD CONSTRAINT "Product_Category_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Category" ADD CONSTRAINT "Product_Category_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Employee" ADD CONSTRAINT "Product_Employee_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Employee" ADD CONSTRAINT "Product_Employee_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_pickup_point_fkey" FOREIGN KEY ("id_pickup_point") REFERENCES "Pickup_Point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Product" ADD CONSTRAINT "Order_Product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Product" ADD CONSTRAINT "Order_Product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
