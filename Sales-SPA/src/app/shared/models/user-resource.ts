import { Role } from './Role';

export class UserResource{
    Id: number;
    Username: string;
    RoleName: Role;
    RoleId: string;
    Token: string;
    TokeExpireOn: string;
}
