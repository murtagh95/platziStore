import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const valueParse = parseInt(value, 10);
    if (isNaN(valueParse)){
      throw new BadRequestException(`This value (${value}) is not a number`)
    }
    return valueParse;
  }
}
