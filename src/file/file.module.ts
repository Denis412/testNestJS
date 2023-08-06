import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { APP_PIPE } from '@nestjs/core';
import { FileValidationPipe } from 'src/pipes/file-vaidation.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileResolver, FileService]
})
export class FileModule {}
