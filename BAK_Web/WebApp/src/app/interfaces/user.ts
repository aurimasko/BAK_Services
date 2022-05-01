export enum Role {
  Admin = 'Admin',
  Student = 'Student',
  Teacher = 'Teacher',
  None = ''
}

export class User {
  id: number=0;
  username: string="";
  password: string="";
  firstName: string="";
  lastName: string="";
  role: Role = Role.None;
  token?: string="";
}
