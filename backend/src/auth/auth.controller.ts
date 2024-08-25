import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'testuser' },
        email: { type: 'string', example: 'testuser@example.com' },
        password: {
          type: 'string',
          example:
            '$2b$10$AGvtmnsis7smv4hwYPdCy.40ZGB/D7nxyXDBmEP.ijlwft2qqopwK',
        },
        id: { type: 'number', example: 1 },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-08-24T14:37:13.779Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'testuser' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwic3ViIjoxLCJpYXQiOjE3MjQ1MTEwOTksImV4cCI6MTcyNDUxNDY5OX0.TemI4YbbZq3Sncp-ADegDLMd26If0RcCT2zbvBVYGoQ',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
