import { Field, ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";

@ObjectType()
export class UploadResult {
    
    @Field(() => [String])
    ids: String[]
}