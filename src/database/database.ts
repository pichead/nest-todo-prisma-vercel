import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (!prisma) {
    prisma = new PrismaClient();
}
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {

    constructor() {
        super();
    }

    async onModuleInit() {
        if (!prisma) {
            await prisma.$connect();
        }
    }
}