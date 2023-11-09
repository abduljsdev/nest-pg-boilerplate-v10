import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
// import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}
  async sendMail(email, htmlToSend, title) {
    const transporter = nodemailer.createTransport({
      name: this.configService.get('mail.nodeMailer.name'),
      host: this.configService.get('mail.nodeMailer.host'),
      port: this.configService.get('mail.nodeMailer.port'),
      secure: true,
      auth: {
        user: this.configService.get('mail.nodeMailer.user'),
        pass: this.configService.get('mail.nodeMailer.password'),
      },
    });
    const info = await transporter.sendMail({
      from: 'IT BEAST <it@beasts.com>',
      to: email,
      subject: title,
      html: htmlToSend,
    });
    transporter.sendMail(info, function (error, info) {
      if (error) {
        console.log('Email Error ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

// email service with send grid
// export class EmailService {
//   constructor(private configService: ConfigService) {
//     SendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
//   }
//   async sendMail(email, htmlToSend, title) {
//     const msg = {
//       to: email,
//       from: process.env.SEND_GRID_EMAIL,
//       subject: title,
//       html: htmlToSend,
//     };

//     SendGrid.send(msg)
//       .then((response) => {
//         console.log('Email Send Successfully');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// }
