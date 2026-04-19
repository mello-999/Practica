import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppKboomComponent } from './app/k-boom-gym';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppKboomComponent, {
  providers: [
    provideHttpClient()
  ]
})
.catch((err) => console.error(err));