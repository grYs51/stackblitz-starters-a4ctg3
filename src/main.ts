import { Component, isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import "zone.js";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, RouterOutlet } from "@angular/router";
import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from "@ngrx/effects";

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
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
  ],
});
