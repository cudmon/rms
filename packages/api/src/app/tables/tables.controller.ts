import { TablesService } from "@/app/tables/tables.service";
import { Public } from "@/app/auth/decorators/public.decorator";
import { CreateTableDto, UpdateTableDto } from "@/app/tables/tables.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

@Controller("tables")
export class TablesController {
  constructor(private readonly tableService: TablesService) {}

  @Public()
  @Get()
  async findAll(@Query() params: { take?: number; skip?: number }) {
    return this.tableService.findAll(params);
  }

  @Get(":id")
  async findById(@Param("id", ParseUUIDPipe) id: string) {
    const table = await this.tableService.findById(id);

    if (!table) {
      throw new NotFoundException();
    }

    return table;
  }

  @Post()
  async create(@Body() data: CreateTableDto) {
    return await this.tableService.create(data);
  }

  @Patch(":id")
  async updateById(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateTableDto
  ) {
    return this.tableService.updateById(id, data);
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseUUIDPipe) id: string) {
    return this.tableService.deleteById(id);
  }
}
