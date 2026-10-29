-- Normalize the legacy seed role before enforcing the role enum.
UPDATE "usuarios"
SET "rol" = 'ADMINISTRADOR'
WHERE "rol" = 'ADMIN';

CREATE TYPE "Rol" AS ENUM ('ADMINISTRADOR', 'CHEF', 'BODEGA');

ALTER TABLE "usuarios"
ALTER COLUMN "rol" DROP DEFAULT;

ALTER TABLE "usuarios"
ALTER COLUMN "rol" TYPE "Rol"
USING "rol"::"Rol";

ALTER TABLE "usuarios"
ALTER COLUMN "rol" SET DEFAULT 'CHEF';
