import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LOGGER } from '../../../utils/logger';
import { JWT, PASSWORD, RES } from '../../../utils';
import { UserService } from '../user/user.service';
import { ClientAuthGuard } from '../../common/guard/clientAuth.guard';
import { clientRefreshGuard } from '../../common/guard/clientRefresh.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }


  @Post('login')
  async Login(@Body() loginDto: LoginDto) {

    try {

      const { email, password } = loginDto

      const isExistUser = await this.userService.findByEmail(email)

      if (!isExistUser) {
        return RES.error(400, "wrong email or password", "email หรือ password ไม่ถูกต้อง")
      }

      const comparePassword = await PASSWORD.compare(password, isExistUser.password)

      if (!comparePassword) {
        return RES.error(400, "wrong email or password", "email หรือ password ไม่ถูกต้อง")
      }

      const payloadJwt = { id: isExistUser.id, email: isExistUser.email, role: "client" }

      const accessToken = await JWT.access.create(payloadJwt)
      const refreshToken = await JWT.refresh.create(payloadJwt)

      if (accessToken && refreshToken) {
        return RES.ok(200, "success login", "เข้าสู่ระบบสำเร็จ", { accessToken, refreshToken })
      }
      else {
        return RES.error(400, "error create login access", "การ login ผิดพลาด")
      }

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }


  }

  @Post('register')
  async Register(@Body() registerDto: RegisterDto) {

    try {

      const { email, password } = registerDto

      const isExistUser = await this.userService.findByEmail(email)

      if (isExistUser) {
        return RES.error(400, "this email is exited", "email ถูกใช้งานแล้ว")
      }

      const hashPassword = await PASSWORD.hash(password)

      if (!hashPassword) {
        return RES.error(400, "error create password", "สร้างรหัสผ่านไม่สำเร็จ")
      }

      const newUser = await this.userService.create(email, password)

      if (newUser) {
        return RES.ok(200, "success create user", "สร้างผู้ใช้สำเร็จ", { id: newUser.id, email: newUser.email, createdAt: newUser.createdAt })
      }
      else {
        return RES.error(400, "error create user", "สร้างผู้ใช้ไม่สำเร็จ")
      }

    } catch (error) {
      LOGGER.error(error)
      return RES.sysError()
    }


  }


  @Get('validate-client')
  @UseGuards(ClientAuthGuard)
  async validateClient(@Req() request) {
    try {
      if (!request.user) {
        return RES.error(403, "Error to validate user", "ยืนยันตัวตนไม่สำเร็จ")
      }
      const res = { ...request.user, password: undefined }
      return RES.ok(200, "Success to validate", "ยืนยันตัวตนสำเร็จ", res)
    } catch (error) {
      LOGGER.error(error)
      return RES.error(500, "System error", "เกิดข้อผิดพลาดจากระบบ")
    }

  }



  @Get('refresh-client')
  @UseGuards(clientRefreshGuard)
  async refreshClient(@Req() request) {
    try {
      const { id, email } = request.user

      const payloadJwt = { id: id, email: email, role: "client" }

      const accessToken = await JWT.access.create(payloadJwt)
      const refreshToken = await JWT.refresh.create(payloadJwt)

      if (accessToken && refreshToken) {
        return RES.ok(200, "Success to validate", "ยืนยันตัวตนสำเร็จ", { accessToken, refreshToken })
      }
      else {
        return RES.error(403, "Error to validate user", "ยืนยันตัวตนไม่สำเร็จ")
      }

    } catch (error) {
      LOGGER.error(error)
      return RES.error(500, "System error", "เกิดข้อผิดพลาดจากระบบ")
    }

  }





  @Post()
  create(@Body() createAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
