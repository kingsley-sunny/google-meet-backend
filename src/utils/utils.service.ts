import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { FRONT_END_URL, SALTS_ROUNDS } from '../base/base.constant';

@Injectable()
export class UtilsService {
  /**
   * hashPassword
   */
  public static async hashPassword(password: string): Promise<string> {
    if (!password) {
      return undefined;
    }
    const hashedPassword = await bcrypt.hash(password, SALTS_ROUNDS);

    return hashedPassword;
  }

  /**
   * comparePassword
   */
  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    return isPasswordMatch;
  }

  /**
   * formatDateToMySqlDateFormat
   */
  public static convertToMySqlDateFormat(date: string | number | Date) {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  }

  /**
   * createNumberCode
   */
  public createNumberCode(iteration: number): number {
    let numberInString = '';
    for (let i = 0; i < iteration; i++) {
      // generate a random number
      const randomNumber = Math.floor(Math.random() * 10);

      numberInString += randomNumber;
    }

    return Number(numberInString);
  }

  /**
   * getResetPasswordEmailTemplate
   */
  public static getResetPasswordEmailTemplate(code: string) {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      
          <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
              <tr>
                  <td style="padding: 20px; text-align: center;">
                      <img src="your-logo.png" alt="Your Logo" style="max-width: 150px;">
                      <h2>Password Reset Request</h2>
                      <p>You have received this email because you requested to reset your password. Click the button below to reset your password:</p>
                      <p><a href="${FRONT_END_URL}/reset-password/${code}" style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
                      <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
                  </td>
              </tr>
          </table>
      
      </body>
      </html>
      `;
  }

  /**
   * cleanUpData
   */
  public cleanUpData<T extends Record<any, any> = Record<any, any>>(
    data: T,
    keys?: (keyof T)[],
  ): T {
    delete data.password;
    delete data.created_at;
    delete data.deleted_at;
    delete data.updated_at;
    delete data.id;

    if (keys) {
      for (const key of keys) {
        Reflect.deleteProperty(data, key);
      }
    }

    return data;
  }

  public static generateRandomLetters(): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < 9; i++) {
      // Get a random letter from the letters string
      const randomLetter = letters.charAt(
        Math.floor(Math.random() * letters.length),
      );
      result += randomLetter;

      // Add a dash after every 4 letters, except at the end
      if ((i + 1) % 4 === 0 && i < 8) {
        result += '-';
      }
    }

    return result;
  }

  public static generateMeetingToken(userId: string) {
    return `${Date.now().toString(36)}:${randomUUID()}:${userId}`;
  }
}
