import { Configuration, Environment } from '../configuration.model';

export class AppSettings {
  private static settings: AppSettings;
  private static environment = '';
  public static get isProduction(): boolean {
    return this.environment == 'production';
  }

  public static get configuration(): Configuration {
    return this.settings.config;
  }

  static construct(config: Configuration, environment: Environment): void {
    if (this.settings) throw Error('App Settings already initialized');
    this.environment = environment.env;
    this.settings = new AppSettings(config);
  }

  private readonly config: Configuration;

  private constructor(config: Configuration) {
    this.config = config;
  }
}
