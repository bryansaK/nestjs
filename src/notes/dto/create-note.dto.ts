import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
    @IsNotEmpty()
    note: string;
    isPublic: boolean;
}
