import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppInjector } from './app/core/services/app-injector.service';
import { environment } from './environments/environment';
import './app/shared/utils/date.utils';
import './app/shared/utils/array.utils';
import './app/shared/utils/html.utils';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(moduleRef => {
    AppInjector.setInjector(moduleRef.injector);
  })
  .catch(err => console.error(err));
