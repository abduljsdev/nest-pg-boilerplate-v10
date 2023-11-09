import * as bcrypt from 'bcrypt';
import * as randomize from 'randomatic';

export function enCodePassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, salt);
}

export function comparePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}

export const PasswordGenerator = (pattern: string, length: number) => {
  return randomize(pattern, length);
};

export const checkFileType = (mineType) => {
  const fileTypes = ['image/jpeg', 'image/png'];
  return fileTypes.includes(mineType);
};

export const checkFileSize = (size: number) => {
  if (size > 1024 * 1024) {
    return false;
  }
  return true;
};
