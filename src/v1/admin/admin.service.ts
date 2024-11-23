import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DatabaseService } from 'src/database/database';
import { LOGGER } from 'src/utils/logger';

@Injectable()
export class AdminService {

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
      LOGGER.error(AdminService.name, error.message)
      return null
    }
  }

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
