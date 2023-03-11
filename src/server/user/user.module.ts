import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { EmailModule } from 'src/modules/email/email.module';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    // TypeOrmModule.forFeature([User]),
    EmailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  // constructor(private readonly emailService:EmailService){}
}
