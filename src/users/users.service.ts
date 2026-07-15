import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit(): Promise<void> {
    const total = await this.userRepository.count();

    if (total > 0) {
      return;
    }

    const users: Partial<User>[] = [];

    for (let i = 1; i <= 1000; i++) {
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
      });
    }

    await this.userRepository.save(users);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      take: 100,
      order: {
        id: 'ASC',
      },
    });
  }

  async generateSlowQuery(): Promise<any> {
    return this.userRepository.query(`
      SELECT u.*, gs
      FROM users u
      CROSS JOIN generate_series(1, 300000) gs
    `);
  }
}
