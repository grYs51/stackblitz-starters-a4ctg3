import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

// environment.ts or .env
const BASE_URL = "http://localhost:3000";

export const apiInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (request.url.startsWith("/api")) {
    return next(
      request.clone({ url: `${BASE_URL}${request.url.replace("/api", "")}` })
    );
  }
  return next(request);
};
