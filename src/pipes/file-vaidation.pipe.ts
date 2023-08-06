import {  ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("data", value, metadata);
        
        return value
    }
}