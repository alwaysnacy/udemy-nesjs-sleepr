import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRespository } from './users.respository';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UsersRespository
    ) {}

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto);
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        });
    }

    async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.userRepository.findOne({email: createUserDto.email});
        } catch(e) {
            return;
        }
        throw new UnprocessableEntityException('Email already exists.');
    }

    findOne(_id: string) {
        return this.userRepository.findOne({_id});
    }

    findAll() {
        return this.userRepository.find({});
    }

    async update(_id: string, updateUserDto: UpdateUserDto) {
        return this.userRepository.findOneAndUpdate(
            {_id}, 
            {$set: updateUserDto}
        );
    }

    async delete(_id: string) {
        return this.userRepository.findOneAndDelete(
            {_id}
        );
    }

    async verifyUser(email: string, password: string) {
        const savedUser = await this.userRepository.findOne({email});
        const passwordIsValid = await bcrypt.compare(password, savedUser.password);
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid.')
        }
        return savedUser;
    }

    async getUser(getUserDto: GetUserDto) {
        return this.userRepository.findOne(getUserDto);
    }
}
