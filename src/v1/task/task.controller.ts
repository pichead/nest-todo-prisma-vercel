import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { ClientAuthGuard } from '../../common/guard/clientAuth.guard';
import { CreateTaskDto } from './dto/task.dto';
import { LOGGER } from '../../../utils/logger';
import { RES } from '../../../utils';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('create')
  @UseGuards(ClientAuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request) {
    try {
      const { id } = request.user
      const newTask = await this.taskService.create(id, createTaskDto)

      if (!newTask) {
        return RES.error(400, "error create task", "สร้าง task ไม่สำเร็จ")
      }

      const allTask = await this.taskService.findAllActive(id)

      if (!allTask) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", allTask)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }

  }

  @Get('findall')
  @UseGuards(ClientAuthGuard)
  async findAll(@Req() request) {

    try {
      const { id } = request.user

      const allTask = await this.taskService.findAll(id)

      if (!allTask) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", allTask)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }

  }

  @Get('findall-active')
  @UseGuards(ClientAuthGuard)
  async findAllActive(@Req() request) {

    try {
      const { id } = request.user

      const allTask = await this.taskService.findAllActive(id)

      if (!allTask) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", allTask)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }

  }

  @Get('findone/:id')
  @UseGuards(ClientAuthGuard)
  async findOne(@Param('id') id: string, @Req() request) {
    try {
      const user = request.user

      const task = await this.taskService.findOne(+id, user.id)

      if (!task) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", task)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }
  }

  @Patch('update/:id')
  @UseGuards(ClientAuthGuard)
  async update(@Param('id') id: string, @Body() updateTaskDto, @Req() request) {
    try {
      const user = request.user

      const updateTask = await this.taskService.update(+id, user.id, updateTaskDto)

      if (!updateTask) {
        return RES.error(400, "error update task", "แก้ไข task ไม่สำเร็จ")
      }

      const task = await this.taskService.findAllActive(user.id)

      if (!task) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", task)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }
  }

  @Patch('complete/:id')
  @UseGuards(ClientAuthGuard)
  async complete(@Param('id') id: string, @Req() request) {
    try {
      const user = request.user

      const updateTask = await this.taskService.complete(+id, user.id)

      if (!updateTask) {
        return RES.error(400, "error update task", "แก้ไข task ไม่สำเร็จ")
      }

      const task = await this.taskService.findAllActive(user.id)

      if (!task) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", task)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }
  }

  @Patch('pending/:id')
  @UseGuards(ClientAuthGuard)
  async pending(@Param('id') id: string, @Req() request) {
    try {
      const user = request.user

      const updateTask = await this.taskService.pending(+id, user.id)

      if (!updateTask) {
        return RES.error(400, "error update task", "แก้ไข task ไม่สำเร็จ")
      }

      const task = await this.taskService.findAllActive(user.id)

      if (!task) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", task)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }
  }


  @Delete('remove/:id')
  @UseGuards(ClientAuthGuard)
  async remove(@Param('id') id: string, @Req() request) {
    try {
      const user = request.user

      const removeTask = await this.taskService.remove(+id, user.id)

      if (!removeTask) {
        return RES.error(400, "error remove task", "ลบ task ไม่สำเร็จ")
      }

      const task = await this.taskService.findAllActive(user.id)

      if (!task) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", task)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }

  }

  @Delete('remove-complete')
  @UseGuards(ClientAuthGuard)
  async removeComplete(@Req() request) {
    try {
      const user = request.user

      const removeTask = await this.taskService.removeComplete(user.id)

      if (!removeTask) {
        return RES.error(400, "error remove task", "ลบ task ไม่สำเร็จ")
      }

      const task = await this.taskService.findAllActive(user.id)

      if (!task) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", task)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }

  }

  @Delete('remove-all')
  @UseGuards(ClientAuthGuard)
  async removeAll(@Req() request) {
    try {
      const user = request.user

      const removeTask = await this.taskService.removeAll(user.id)

      if (!removeTask) {
        return RES.error(400, "error remove task", "ลบ task ไม่สำเร็จ")
      }

      const task = await this.taskService.findAllActive(user.id)

      if (!task) {
        return RES.error(400, "error get task", "ค้นหา task ไม่สำเร็จ")
      }

      return RES.ok(200, "success get task", "ค้นหา task สำเร็จ", task)

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }

  }





}
