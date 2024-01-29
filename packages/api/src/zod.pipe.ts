import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  transform(value: any) {
    return this.schema.parse(value);
  }
}
