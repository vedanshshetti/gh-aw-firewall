import chalk from 'chalk';
import { LogLevel } from './types';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = 'info') {
    this.level = level;
  }

  /**
   * Sets the Logger instances Log Level (Debug, Info, Warn or Error). 
   * Logs with a lower priority than set level will be ignored.
   * @param level Level that is to be applied.
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
  }

  /**
   * Creates a debug log if permitted by the Logger Instance.
   * @param message Main Log Message
   * @param args Other Arguments, will be logged alongside message.
   */
  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.error(chalk.gray(`[DEBUG] ${message}`), ...args);
    }
  }

  /**
   * Creates an info log if permitted by the Logger Instance.
   * @param message Main Log Message
   * @param args Other Arguments, will be logged alongside message.
   */
  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.error(chalk.blue(`[INFO] ${message}`), ...args);
    }
  }

  /**
   * Creates a warning log if permitted by the Logger Instance.
   * @param message Main Log Message
   * @param args Other Arguments, will be logged alongside message.
   */
  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.error(chalk.yellow(`[WARN] ${message}`), ...args);
    }
  }

    /**
   * Creates an error log.
   * @param message Main Log Message
   * @param args Other Arguments, will be logged alongside message.
   */
  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error(chalk.red(`[ERROR] ${message}`), ...args);
    }
  }

  /**
   * Creates a sucess log if permitted by the Logger Instance (Uses Log Level 'info').
   * @param message Main Log Message
   * @param args Other Arguments, will be logged alongside message.
   */
  success(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.error(chalk.green(`[SUCCESS] ${message}`), ...args);
    }
  }
}

export const logger = new Logger();
