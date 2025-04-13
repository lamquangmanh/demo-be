import { IUserRepository } from '../../domain/repositories/user.repository';
import { CreateUserInput } from '../../domain/types/common';
import { User } from '../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const newUser = new User(
      id,
      input.username,
      input.email,
      hashedPassword,
      input.phone,
    );
    return this.userRepo.createUser(newUser);
  }
}
