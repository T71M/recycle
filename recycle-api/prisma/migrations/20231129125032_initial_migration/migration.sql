-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "contact_person" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "client_contact_phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "legal_address" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "kpp" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "ogrn" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "bank_bik" TEXT NOT NULL,
    "bank_inn" TEXT NOT NULL,
    "bank_account" TEXT NOT NULL,
    "bank_legal_address" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "legal_address" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'black',
    "icon" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerMaterials" (
    "id" SERIAL NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,

    CONSTRAINT "PartnerMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "north_lat" DOUBLE PRECISION NOT NULL,
    "north_long" DOUBLE PRECISION NOT NULL,
    "east_lat" DOUBLE PRECISION NOT NULL,
    "east_long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_id_key" ON "Partner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Material_id_key" ON "Material"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerMaterials_id_key" ON "PartnerMaterials"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- AddForeignKey
ALTER TABLE "PartnerMaterials" ADD CONSTRAINT "PartnerMaterials_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerMaterials" ADD CONSTRAINT "PartnerMaterials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
