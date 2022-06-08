import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(contexto: ExecutionContext) {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, contexto.getHandler())
    if(isPublic){
      return true;
    }
    return super.canActivate(contexto)
  }
}
