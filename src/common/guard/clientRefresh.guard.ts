import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from 'src/v1/user/user.service';
import { RES } from 'src/utils';
import { JWT } from 'src/utils';
import { LOGGER } from 'src/utils/logger';

@Injectable()
export class clientRefreshGuard implements CanActivate {
  constructor(
    private readonly userService: UserService

  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if ((await this.validateRequest(request)) === true) {
      return await this.validateRequest(request);
    } else {
      throw new HttpException(RES.error(HttpStatus.UNAUTHORIZED, 'Forbidden resource', 'คุณไม่มีสิทธิ์เข้าถึงข้อมูล'), HttpStatus.UNAUTHORIZED)

    }
  }

  private async validateRequest(request: any): Promise<boolean> {
    const headerAuth = request.headers['authorization'];
    if (headerAuth) {
      try {
        const token = headerAuth.split(' ')[1];
        const exposeData = await JWT.refresh.expose(token);

        if (exposeData && exposeData.tokenType === 'refresh' && exposeData.role === 'client') {
          const findUserByEmail = await this.userService.findByEmail(exposeData.email)
          request.user = { ...findUserByEmail, password: undefined }
          return true;
        } else {
          return false;
        }
      } catch (error) {
        LOGGER.error(error);
        return false;
      }
    }

    return false;
  }
}
