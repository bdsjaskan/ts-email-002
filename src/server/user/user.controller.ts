import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('mongodb')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('/select')
  @ApiOperation({ summary: '返回用户信息', description: '查询' })
  async selectAll() {
    return await this.userService.select();
  }
  @Get('selectemail')
  @ApiOperation({ summary: '返回姓名和邮件信息'})
  async selectemail() {
    return await this.userService.selectemail(); ///查询我
  }

  @Post('/addemail')
  @ApiOperation({summary: '添加一个信息用于后续定时发送邮件'})
  async addEmail(@Body() userDto: User) {
    //USer 是我数据库的表（就是实体类）
    return await this.userService.add(userDto);
  }

  /**
   * 文件上传到数据库
   * @param file
   */
  @Post('files')
  @ApiOperation({summary: '用户信息和文件附件存入数据库以便于后续定时任务的使用'})
  @UseInterceptors(FileInterceptor('file'))
  sqlemail(@Body() userDto: User, @UploadedFile() file: Express.Multer.File) {
    console.log(userDto.email);
    console.log(file);
    this.userService.sqlemail(userDto, file);
  }
}
