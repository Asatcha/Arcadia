import { BaseDto } from "src/shared/base.dto";

export class HabitatDto extends BaseDto {
    name: string;
    description: string;
    comments?: string;
    habitatImage?: File;
    habitatImageUrl?: string;
}
