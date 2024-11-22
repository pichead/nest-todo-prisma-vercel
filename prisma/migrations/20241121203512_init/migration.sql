-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('SUCCESS', 'PENDING');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "avatarPath" VARCHAR(255),
    "avatarSrc" VARCHAR(255),
    "fname" VARCHAR(255),
    "lname" VARCHAR(255),
    "fullname" VARCHAR(255),
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(10),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "avatarPath" VARCHAR(255),
    "avatarSrc" VARCHAR(255),
    "fname" VARCHAR(255),
    "lname" VARCHAR(255),
    "fullname" VARCHAR(255),
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(10),
    "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "point" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lineId" TEXT,
    "baned" BOOLEAN NOT NULL DEFAULT false,
    "ipv4" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "detail" TEXT,
    "status" "task_status" NOT NULL DEFAULT 'PENDING',
    "statusHistory" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_phone_key" ON "admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
