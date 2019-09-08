import { Controller } from "@nestjs/common";
import { PhotoService } from './photo.service';
import { Get } from '@nestjs/common';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }
}
