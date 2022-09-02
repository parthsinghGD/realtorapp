import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

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
        user_type: UserType.BUYER,
      },
    });

    return this.genrateJWT(name , user.id);
  }

  async signin({email , password}){
    const user = await this.prismaService.user.findUnique({
      where : {
        email
      }
    })

    if(!user) {
      throw new HttpException("invalid" , 400)
    }

    const hashesPassword = user.password;

    const isValidPassword = await bcrypt.compare(password , hashesPassword)

    if(!isValidPassword) {
      throw  new HttpException("invalid" , 400)
    }

    return this.genrateJWT(user.name , user.id);

  }

  private async genrateJWT(name : string, id : number) {
    return jwt.sign({
      name,
      id,
    }, "mynameisparthsingh")
  }


}
