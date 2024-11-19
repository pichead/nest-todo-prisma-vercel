import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export async function findAll(){
    try {

        const findData = await prisma.admin.findMany()

        return findData

    } catch (error) {
        console.log(error);
        return null
    }
}