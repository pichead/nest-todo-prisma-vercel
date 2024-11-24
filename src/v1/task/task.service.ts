import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { LOGGER } from '../../../utils/logger';
import { Prisma } from '@prisma/client';


@Injectable()
export class TaskService {

  constructor(
    private readonly db: DatabaseService
  ) { }


  async create(userId: number, createTaskDto: CreateTaskDto, transaction?: Prisma.TransactionClient | null | undefined) {

    try {
      const dbt = transaction ? transaction : this.db

      return await dbt.task.create({
        data: { ...createTaskDto, userId }
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async findAll(userId: number) {
    try {
      return await this.db.task.findMany({
        where: {
          userId
        }
      })
    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async findAllActive(userId: number) {
    try {
      return await this.db.task.findMany({
        where: {
          userId,
          isActive: true
        }
      })
    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async findOne(id: number, userId: number) {
    try {
      return await this.db.task.findFirst({
        where: {
          id,
          userId
        }
      })
    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto, transaction?: Prisma.TransactionClient | null | undefined) {

    try {

      const dbt = transaction ? transaction : this.db
      return await dbt.task.update({
        where: {
          id,
          userId
        },
        data: updateTaskDto
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async removeAll(userId: number, transaction?: Prisma.TransactionClient | null | undefined) {
    try {
      const dbt = transaction ? transaction : this.db

      return await dbt.task.updateMany({
        where: {
          isActive: true,
          userId
        },
        data: {
          isActive: false
        }
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async remove(id: number, userId: number, transaction?: Prisma.TransactionClient | null | undefined) {
    try {
      const dbt = transaction ? transaction : this.db

      return await dbt.task.update({
        where: {
          id,
          userId
        },
        data: {
          isActive: false
        }
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async complete(id: number, userId: number, transaction?: Prisma.TransactionClient | null | undefined) {
    try {

      const dbt = transaction ? transaction : this.db
      return await dbt.task.update({
        where: {
          id,
          userId
        },
        data: {
          status: "SUCCESS"
        }
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async pending(id: number, userId: number, transaction?: Prisma.TransactionClient | null | undefined) {
    try {

      const dbt = transaction ? transaction : this.db
      return await dbt.task.update({
        where: {
          id,
          userId
        },
        data: {
          status: "PENDING"
        }
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }

  async removeComplete(userId: number, transaction?: Prisma.TransactionClient | null | undefined) {
    try {

      const dbt = transaction ? transaction : this.db
      return await dbt.task.updateMany({
        where: {
          status: "SUCCESS",
          userId
        },
        data: {
          isActive: false
        }
      })

    } catch (error) {
      LOGGER.error(error)
      return null
    }
  }


}
