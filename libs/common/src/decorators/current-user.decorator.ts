import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface RequestUser {
  id: string;
  [key: string]: any;
}

export const CurrentUser = createParamDecorator(
  (data: keyof RequestUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as RequestUser;
    return data ? user?.[data] : user;
  },
);

export const Public = () => {
  const { SetMetadata } = require('@nestjs/common');
  return SetMetadata('isPublic', true);
};
