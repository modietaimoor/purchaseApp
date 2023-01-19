interface Api {
    baseUrl: string;
  }
  
  interface Idle {
    timeout: number;
  }
  
  export interface Configuration {
    api: Api;
    idle: Idle;
  }
  
  export interface Environment {
    env: 'development' | 'production';
  }
  