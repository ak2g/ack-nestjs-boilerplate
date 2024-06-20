import {
    Inject,
    Injectable,
    NotFoundException,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ENUM_POLICY_ROLE_TYPE } from 'src/common/policy/constants/policy.enum.constant';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant';

@Injectable({ scope: Scope.REQUEST })
export class UserNotSelfPipe implements PipeTransform {
    constructor(@Inject(REQUEST) protected readonly request: IRequestApp) {}

    async transform(value: string): Promise<string> {
        const { user } = this.request;
        if (
            user._id === value &&
            user.type !== ENUM_POLICY_ROLE_TYPE.SUPER_ADMIN
        ) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        return value;
    }
}
