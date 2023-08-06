import { Injectable } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { join } from 'path';
import { v4 as uuidv4 } from "uuid"
import { UpdateFileInput } from './dto/update-file.input';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';

@Injectable()
export class FileService {
  constructor(@InjectRepository(File) private readonly repository: Repository<File>) {}

  create(createFileInput: CreateFileInput) {
    return 'This action adds a new file';
  }

  async uploadFiles(file: Express.Multer.File) {
    const uploadedFileIds: string[] = [];

    console.log("upload start");

    const files = [file];
    

    for (const file of files) {
      const extension = file.originalname.split('.').pop();
      const shortLink = uuidv4();
      const path = join(__dirname, '..', '..', 'uploads', `${shortLink}.${extension}`);

      console.log("path", path);
      

    const newFile = this.repository.create({
      name: file.originalname,
      size: file.size,
      shortLink,
      extension,
      path,
    });

    console.log("file", newFile);
    

    await this.repository.save(newFile);
    uploadedFileIds.push(shortLink);

    // Upload file to S3 or local storage
    const s3 = new S3(); // Initialize S3 client
    const fileStream = createReadStream(file.path);
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `${shortLink}.${extension}`,
      Body: fileStream,
    };
    await s3.upload(params).promise();
  }
    return [""]
  }
}
