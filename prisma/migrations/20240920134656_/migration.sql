-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 2,
    "password" TEXT NOT NULL,
    "updatedPassword_at" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "refresh_token" TEXT,
    "refresh_token_expires_at" TIMESTAMP(3),
    "jwt_token_version" INTEGER NOT NULL DEFAULT 1,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
