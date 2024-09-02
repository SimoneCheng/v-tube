import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"v-tube" <noreply@v-tube.com>',
      to: to,
      subject: '密碼重置請求',
      text: `請點擊以下連結重置您的密碼: ${resetUrl}`,
      html: `
        <p>您好，</p>
        <p>我們收到了重置您密碼的請求。如果這不是您發起的，請忽略此郵件。</p>
        <p>點擊以下按鈕重置您的密碼：</p>
        <a href="${resetUrl}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">重置密碼</a>
        <p>如果按鈕不起作用，請複製並在瀏覽器中打開以下連結：</p>
        <p>${resetUrl}</p>
        <p>此連結將在 10 分鐘後過期。</p>
        <p>祝您使用愉快！</p>
        <p>您的應用團隊 v-tube</p>
      `,
    });
  }
}
