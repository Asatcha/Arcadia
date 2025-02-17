import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dtos/create-contact.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailService) {}

  async send(createContactDto: CreateContactDto) {
    await this.mailService.sendContactEmail(createContactDto);

    return {
      message:
        'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
    };
  }
}
