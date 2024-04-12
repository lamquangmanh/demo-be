export abstract class LoggerAbstract {
  abstract init(moduleName: string, providerName: string);
  abstract setRequestContext(requestId: string, userId: string);
  abstract error(message: any);

  abstract info(message: any);

  abstract warn(message: any);

  abstract debug(message: any);
}
