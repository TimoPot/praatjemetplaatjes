import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './lmz/app.config';
import { AppComponent } from './lmz/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
