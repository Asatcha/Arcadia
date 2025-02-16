import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  private transporter: any;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendUserCreationEmail(to: string, user: User) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
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
      console.error("Erreur lors de l'envoi de l'email:", error);
    }
  }
}
