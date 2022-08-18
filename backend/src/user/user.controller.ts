import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

export interface LoginProps {
  email: string;
  password: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(@Body() data: LoginProps, @Res() res: Response) {
    try {
      const userAlreadyExist = await this.userService.findByEmailAndPassword(data);

      console.log(userAlreadyExist);

      if (!userAlreadyExist) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusMessage: 'Username or e-mail wrong',
          message: 'Nome de usuário ou e-mail incorretos',
        });
      }

      delete userAlreadyExist.id;

      return res.status(HttpStatus.CREATED).json({
        statusMessage: 'Login make with success',
        message: 'Login feito com sucesso',
        user: userAlreadyExist,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusMessage: 'Server internal error',
        message: 'Erro interno de servidor',
        error,
      });
    }
  }

  @Post('/register')
  async register(@Body() data: Prisma.UserCreateInput, @Res() res: Response) {
    try {
      const userAlreadyExist = await this.userService.findByEmail(data.email);

      if (userAlreadyExist) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusMessage: 'This e-mail has been in use',
          message: 'Este e-mail já esta sendo usado',
        });
      }

      this.userService.create(data);

      return res.status(HttpStatus.OK).json({
        statusMessage: 'User create with success',
        message: 'Usuário criado com sucesso',
        user: data,
      });
    } catch (error: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusMessage: 'Server internal error',
        message: 'Erro interno de servidor',
        error: error?.message,
      });
    }
  }
}
