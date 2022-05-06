import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './DTO/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() { title, bar_code, description }: BookDTO) {
    return this.bookService.create({ bar_code, description, title });
  }

  @Get()
  async listAll() {
    return this.bookService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() { title, bar_code, description }: BookDTO,
  ) {
    return this.bookService.update({ id, title, bar_code, description });
  }
}
