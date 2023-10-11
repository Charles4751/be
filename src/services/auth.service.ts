import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as CryptoJS from 'crypto-js';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../data-transfer-object/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async login(phoneNumber: number, password: string): Promise<User | null> {
    // 查找用户
    const user = await this.userModel.findOne({ phoneNumber }).exec();
    // this.logger.verbose(user);

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 检查密码是否匹配
    const bytes = CryptoJS.AES.decrypt(password, 'secret key');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    const isPasswordValid = originalText === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('密码不正确');
    }

    return user;
  }

  async register(userData: CreateUserDto): Promise<User> {
    const { nickName, username, email, phoneNumber, password } = userData;

    const _user = await this.userModel.findOne({ phoneNumber }).exec();
    this.logger.verbose(_user);

    const bytes = CryptoJS.AES.decrypt(password, 'secret key');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    try {
      const newUser = new this.userModel({
        nickName,
        username,
        email,
        phoneNumber,
        password: originalText,
      });

      // 保存用户到数据库
      await newUser.save();
      delete newUser.password;
      return newUser;
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.phoneNumber) {
        // 手机号已经存在
        throw new ConflictException('手机号已被注册');
      } else {
        // 其他错误
        throw new Error('注册失败');
      }
    }
  }
}
