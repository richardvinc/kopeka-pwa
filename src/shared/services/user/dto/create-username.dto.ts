import { BaseResponse } from '@app/shared/interfaces/base-response.interface';
import { User } from '@app/shared/interfaces/user.interface';

export interface CreateUsernameRequestDTO {
  username: string;
  profile_picture_url: string;
}

export interface CreateUsernameResponseDTO extends BaseResponse<User> {}
