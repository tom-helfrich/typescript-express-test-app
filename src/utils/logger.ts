export class Logger {
  constructor() {}

  public info(logText: string): void {
    const timestamp = new Date();
    console.log(`[Time] ${timestamp} INFO: ${logText}`);
  }

  public debug(logText: string): void {
    const timestamp = new Date();
    console.log(`[Time] ${timestamp} DEBUG: ${logText}`);
  }

  public error(logText: string): void {
    const timestamp = new Date();
    console.log(`[Time] ${timestamp} ERROR: ${logText}`);
  }
}
