import { IsNotEmpty, IsString } from "class-validator";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string
}

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string
}