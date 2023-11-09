import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import * as _ from 'lodash';

export const CheckValidId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = _.toNumber(request.params.id);

    if (Number.isNaN(id)) {
      throw new BadRequestException('Invalid sql id.');
    }
    return request.params.id;
  },
);
