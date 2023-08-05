import { Injectable } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Injectable()
export class FileService {
  create(createFileInput: CreateFileInput) {
    return 'This action adds a new file';
  }

  uploadFiles(files: Express.Multer.File[]) {
    return [""]
  }
}
