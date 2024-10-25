export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.name = "AppError";
  }
}
