import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // localhost:3000/contact
  @Post('send')
  send(@Body() createContactDto: CreateContactDto) {
    return this.contactService.send(createContactDto);
  }
}
