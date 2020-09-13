// /// <reference types="node" />
// import Injector from 'injector';
// import Logger from 'bunyan';

//// F*kc D-R-Y
interface Injector {
  add(service: string, instance: any): void;
  resolve(service: string): any;
  remove(service: string): boolean;
}

// declare namespace Logger {
//   type LogLevelString = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
//   type LogLevel = LogLevelString | number;

//   const levelFromName: { [name in LogLevelString]: number };
//   const nameFromLevel: { [level: number]: string };

//   interface Stream {
//     type?: string;
//     level?: LogLevel;
//     path?: string;
//     stream?: NodeJS.WritableStream | Stream;
//     closeOnExit?: boolean;
//     period?: string;
//     count?: number;
//     name?: string;
//     reemitErrorEvents?: boolean;
//   }

//   type Serializer = (input: any) => any;

//   interface Serializers {
//     [key: string]: Serializer;
//   }
// }

interface Logger {
  addStream(stream: Logger.Stream): void;
  addSerializers(serializers: Logger.Serializers): void;
  child(options: Object, simple?: boolean): Logger;
  reopenFileStreams(): void;

  level(): number;
  level(value: Logger.LogLevel): void;
  levels(): number[];
  levels(name: number | string): number;
  levels(name: number | string, value: Logger.LogLevel): void;

  fields: any;
  src: boolean;

  /**
   * Returns a boolean: is the `trace` level enabled?
   *
   * This is equivalent to `log.isTraceEnabled()` or `log.isEnabledFor(TRACE)` in log4j.
   */
  trace(): boolean;

  /**
   * Special case to log an `Error` instance to the record.
   * This adds an `err` field with exception details
   * (including the stack) and sets `msg` to the exception
   * message or you can specify the `msg`.
   */
  trace(error: Error, ...params: any[]): void;

  /**
   * The first field can optionally be a "fields" object, which
   * is merged into the log record.
   *
   * To pass in an Error *and* other fields, use the `err`
   * field name for the Error instance.
   */
  trace(obj: Object, ...params: any[]): void;

  /**
   * Uses `util.format` for msg formatting.
   */
  trace(format: any, ...params: any[]): void;

  /**
   * Returns a boolean: is the `debug` level enabled?
   *
   * This is equivalent to `log.isDebugEnabled()` or `log.isEnabledFor(DEBUG)` in log4j.
   */
  debug(): boolean;

  /**
   * Special case to log an `Error` instance to the record.
   * This adds an `err` field with exception details
   * (including the stack) and sets `msg` to the exception
   * message or you can specify the `msg`.
   */
  debug(error: Error, ...params: any[]): void;

  /**
   * The first field can optionally be a "fields" object, which
   * is merged into the log record.
   *
   * To pass in an Error *and* other fields, use the `err`
   * field name for the Error instance.
   */
  debug(obj: Object, ...params: any[]): void;

  /**
   * Uses `util.format` for msg formatting.
   */
  debug(format: any, ...params: any[]): void;

  /**
   * Returns a boolean: is the `info` level enabled?
   *
   * This is equivalent to `log.isInfoEnabled()` or `log.isEnabledFor(INFO)` in log4j.
   */
  info(): boolean;

  /**
   * Special case to log an `Error` instance to the record.
   * This adds an `err` field with exception details
   * (including the stack) and sets `msg` to the exception
   * message or you can specify the `msg`.
   */
  info(error: Error, ...params: any[]): void;

  /**
   * The first field can optionally be a "fields" object, which
   * is merged into the log record.
   *
   * To pass in an Error *and* other fields, use the `err`
   * field name for the Error instance.
   */
  info(obj: Object, ...params: any[]): void;

  /**
   * Uses `util.format` for msg formatting.
   */
  info(format: any, ...params: any[]): void;

  /**
   * Returns a boolean: is the `warn` level enabled?
   *
   * This is equivalent to `log.isWarnEnabled()` or `log.isEnabledFor(WARN)` in log4j.
   */
  warn(): boolean;

  /**
   * Special case to log an `Error` instance to the record.
   * This adds an `err` field with exception details
   * (including the stack) and sets `msg` to the exception
   * message or you can specify the `msg`.
   */
  warn(error: Error, ...params: any[]): void;

  /**
   * The first field can optionally be a "fields" object, which
   * is merged into the log record.
   *
   * To pass in an Error *and* other fields, use the `err`
   * field name for the Error instance.
   */
  warn(obj: Object, ...params: any[]): void;

  /**
   * Uses `util.format` for msg formatting.
   */
  warn(format: any, ...params: any[]): void;

  /**
   * Returns a boolean: is the `error` level enabled?
   *
   * This is equivalent to `log.isErrorEnabled()` or `log.isEnabledFor(ERROR)` in log4j.
   */
  error(): boolean;

  /**
   * Special case to log an `Error` instance to the record.
   * This adds an `err` field with exception details
   * (including the stack) and sets `msg` to the exception
   * message or you can specify the `msg`.
   */
  error(error: Error, ...params: any[]): void;

  /**
   * The first field can optionally be a "fields" object, which
   * is merged into the log record.
   *
   * To pass in an Error *and* other fields, use the `err`
   * field name for the Error instance.
   */
  error(obj: Object, ...params: any[]): void;

  /**
   * Uses `util.format` for msg formatting.
   */
  error(format: any, ...params: any[]): void;

  /**
   * Returns a boolean: is the `fatal` level enabled?
   *
   * This is equivalent to `log.isFatalEnabled()` or `log.isEnabledFor(FATAL)` in log4j.
   */
  fatal(): boolean;

  /**
   * Special case to log an `Error` instance to the record.
   * This adds an `err` field with exception details
   * (including the stack) and sets `msg` to the exception
   * message or you can specify the `msg`.
   */
  fatal(error: Error, ...params: any[]): void;

  /**
   * The first field can optionally be a "fields" object, which
   * is merged into the log record.
   *
   * To pass in an Error *and* other fields, use the `err`
   * field name for the Error instance.
   */
  fatal(obj: Object, ...params: any[]): void;

  /**
   * Uses `util.format` for msg formatting.
   */
  fatal(format: any, ...params: any[]): void;
}

// global variables
declare var Injector: Injector;
declare var Logger: Logger;

type done = (err: any, id?: unknown) => void;

declare namespace NodeJS {
  export interface Process {
    appConfig: any;
  }
}
