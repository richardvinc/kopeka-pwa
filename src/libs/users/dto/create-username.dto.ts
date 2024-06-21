import { User } from '@app/libs/users/interfaces/user.interface';
import { BaseResponse } from '@app/shared/interfaces/base-response.interface';

export interface CreateUsernameRequestDTO {
  username: string;
  profile_picture_url: string;
}

export interface CreateUsernameResponseDTO extends BaseResponse<User> {}
