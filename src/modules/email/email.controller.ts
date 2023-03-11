import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/server/user/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';

@Controller('email')
@ApiTags('email')
// @UseInterceptors(LoggingInterceptor)
export class EmailController {

  constructor(private readonly emailService: EmailService) {}

  /**
   * 测试
   * @returns 请求之后直接发送一个邮件
   */
  @Get()
  @ApiOperation({summary: '写死的接口直接发送给自己的邮件(我是用它来通知定时任务启动了)',})
  sendEmail() {
    this.emailService.example();
    return 'ok';
}


  @Post('/sendEmail')
  @ApiOperation({summary: '传入账号接口，直接给当前账号发送'})
  async sendEmailCode(@Body('email') email: string) {
    return this.emailService.sendEmail(email);
  }


  
  @Post('/sendEmailUser')
  @ApiOperation({ summary: '传入账号和姓名(也可以在其中添加text:文案)接口，直接给当前账号发送' })
  async sendEmailUser(@Body() user: User) {
    this.emailService.sendEmailUser(user);
  }

    /**
   *
   * @param file
   */
    @Post('emailtextFile')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: '传入账号和姓名(也可以在其中添加text:文案 ++附件)接口，直接给当前账号发送' })
    async emailtextFile(@Body() body: User,@UploadedFile() file: Express.Multer.File,) {
      console.log(file);
      console.log(body.email);
      this.emailService.emailtextFile(body, file);
    }
  
}
