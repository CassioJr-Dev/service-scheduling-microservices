-- DropForeignKey
ALTER TABLE "catalog" DROP CONSTRAINT "catalog_providerId_fkey";

-- AddForeignKey
ALTER TABLE "catalog" ADD CONSTRAINT "catalog_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
