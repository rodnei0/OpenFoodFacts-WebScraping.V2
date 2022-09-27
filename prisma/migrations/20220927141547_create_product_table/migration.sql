-- CreateTable
CREATE TABLE "Post" (
    "code" BIGINT NOT NULL,
    "barcode" TEXT NOT NULL,
    "imported_t" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "packaging" TEXT NOT NULL,
    "brands" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("code")
);
