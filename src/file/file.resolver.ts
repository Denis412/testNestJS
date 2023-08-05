import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
// import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  // @Mutation(() => File)
  // createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
  //   return this.fileService.create(createFileInput);
  // }

  // @Mutation(() => [String])
  // async uploadFiles(@Args({ name: 'files', type: () => [GraphQLUpload] }) files: Express.Multer.File[]): Promise<string[]> {
  //   const uploadedFileIds = await this.fileService.uploadFiles(files);
  //   return uploadedFileIds;
  // }
}
