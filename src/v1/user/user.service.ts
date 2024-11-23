import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database';
import { LOGGER } from '../../../utils/logger';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {


  constructor(
    private readonly db: DatabaseService
  ) { }


  async findByEmail(email: string) {
    try {
      return await this.db.user.findFirst({
        where: {
          email: email,
        }
      })
    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }




  async create(email: string, password: string, transaction?: Prisma.TransactionClient | null | undefined) {
    try {

      const dbt = transaction ? transaction : this.db
      return await dbt.user.create({
        data: {
          email,
          password
        }
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
