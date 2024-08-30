import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';

export const IS_PUBLIC_KEY = 'isPublic';
export const AllowAnon = () => SetMetadata(IS_PUBLIC_KEY, true);

export enum Role {
  User = 'user',
  Admin = 'admin',
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const GetPayload = createParamDecorator(
  (
    data: keyof JwtPayload | undefined,
    ctx: ExecutionContext,
  ): JwtPayload | JwtPayload[keyof JwtPayload] => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    return data ? user?.[data] : user;
  },
);
