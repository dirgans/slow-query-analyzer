import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Normal Query',
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('slow')
  @ApiOperation({
    summary: 'Generate Slow Query',
  })
  async generateSlowQuery() {
    await this.usersService.generateSlowQuery();

    return {
      success: true,
      message: 'Slow query executed successfully.',
    };
  }
}
