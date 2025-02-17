import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from 'src/contact/dtos/create-contact.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  private transporter: any;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('ZOO_EMAIL'),
        pass: this.configService.get<string>('ZOO_PASS'),
      },
    });
  }

  async sendUserCreationEmail(to: string, user: User) {
    const mailOptions = {
      from: this.configService.get<string>('ZOO_EMAIL'),
      to,
      subject: 'Bienvenue sur notre plateforme Arcadia',
      text: `Bonjour ${user.firstName},\n\n
      Votre compte a été créé avec succès !\n
      Votre identitifant de connexion correspond à votre email : ${user.email}\n
      Rapprochez-vous d'un administrateur pour obtenir votre mot de passe.\n
      Cordialement,\n
      L'équipe du zoo d'Arcadia.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
    }
  }

  async sendContactEmail(createContactDto: CreateContactDto) {
    const { email, firstName, lastName, title, message } = createContactDto;

    const zooEmail = this.configService.get<string>('ZOO_EMAIL');

    const mailOptions = {
      from: zooEmail,
      to: zooEmail,
      subject: `Message de contact - ${title}`,
      text: `Un utilisateur a soumis un message via le formulaire de contact :\n\n
      Identité : ${firstName} ${lastName}\n
      Email : ${email}\n
      Titre : ${title}\n
      Message :\n\n${message}\n`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email de contact :", error);
    }
  }
}
