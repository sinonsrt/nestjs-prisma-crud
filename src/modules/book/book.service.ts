import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './DTO/book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create({ title, bar_code, description }: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code,
      },
    });

    if (bookExists) {
      throw new Error('Book already exists!');
    }

    const book = await this.prisma.book.create({
      data: {
        title,
        bar_code,
        description,
      },
    });

    return book;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }
}
