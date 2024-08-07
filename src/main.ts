import { Component, isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import "zone.js";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, RouterOutlet } from "@angular/router";
import { routes } from "./app.routes";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiInterceptor } from "./shared/interceptors/api.interceptor";
import { storeProviders } from "./features/shopping-cart/store";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class App {
  name = "Angular";
}

bootstrapApplication(App, {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    ...storeProviders,
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([apiInterceptor])),
  ],
});
