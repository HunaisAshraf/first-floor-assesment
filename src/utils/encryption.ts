import bcrypt from "bcryptjs";

export function encryptPassword(password: string): string {
  try {
    return bcrypt.hashSync(password, 10);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function comparePassword(
  inputPassword: string,
  passwordFromDb: string
): boolean {
  try {
    return bcrypt.compareSync(inputPassword, passwordFromDb);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
