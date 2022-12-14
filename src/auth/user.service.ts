import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { User } from "src/domain/user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
        ){}
   
        // 등록이 된 유저인지 확인
        async findByFields(options: FindOneOptions<UserDTO>): Promise<User | undefined>{
            return await this.userRepository.findOne(options);
        }

        // 신규 유저 등록
        async save(userDTO: UserDTO): Promise<UserDTO | undefined>{
            await this.transformPassword(userDTO);
            console.log(userDTO);
            return await this.userRepository.save(userDTO);
        }

        // 비밀번호 암호화 (saltround를 10으로 지정)
        async transformPassword(user: UserDTO): Promise<void>{
            user.password = await bcrypt.hash(
                user.password, 10,
            );
            return Promise.resolve();
        }
}
