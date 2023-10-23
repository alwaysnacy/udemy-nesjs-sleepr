import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserSchema, UserDocument } from './models/user.schema';
import { UsersRespository } from './users.respository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {name: UserDocument.name, schema: UserSchema}
    ]),
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRespository],
  exports: [UsersService]
})
export class UsersModule {}
