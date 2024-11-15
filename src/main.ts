// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { routes } from './app/app.routes';  // Assuming your routing is defined in app.routes.ts

// Update appConfig to include HashLocationStrategy and routes
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,   // Existing providers from app.config
    provideRouter(routes),    // Provide the routes configuration
    { provide: LocationStrategy, useClass: HashLocationStrategy }  // Use HashLocationStrategy
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
