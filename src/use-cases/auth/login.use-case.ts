import { IUserRepository } from '../../domain/repositories/user.repository';
import { LoginInput } from '../../domain/types/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';

export class LoginUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(input: LoginInput): Promise<User | null> {
    const user = await this.userRepo.getUserByEmail(input.email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
