import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({ email, password, name, phone }) {
    const userExits = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExits) {
      throw new ConflictException();
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name,
        password: hashPassword,
        email,
        phone,
      },
    });

    const token = await jwt.sign(
      {
        name,
        id: user.id,
      },
      'iamparthsingh',
    );

    return token;
  }
}
