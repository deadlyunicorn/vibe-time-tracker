import bcrypt from "bcrypt";

export namespace AuthUtils {
  export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password, 10);
  };

  export const passwordMatchesDatabaseHash = (
    password: string,
    databaseHash: string
  ) => {
    return bcrypt.compare(password, databaseHash);
  };
}
