import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class UserService {

    async getAllUsers(){
        const users = await User.find();
        return users;
    }

    async showUserById(id: number): Promise<User> {
        const user = await this.findUserById(id);

        delete user.password;
        return user;
    }

    async findUserById(id: number) {
        return await User.findOne(id);
    }

    async findUserByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

    async createUser(createUserDto: CreateUserDto){
        const user = User.create(createUserDto);
        await user.save();
        
        delete user.password;
        return user;
    }
    
}
