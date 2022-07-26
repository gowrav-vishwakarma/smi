import { IsMongoId } from "class-validator";

export default class CreateSolutionAttemptDTO {
  @IsMongoId()
  questionId!: string;

  @IsMongoId()
  questionerId!: string;

  @IsMongoId()
  offererId!: string;
}
