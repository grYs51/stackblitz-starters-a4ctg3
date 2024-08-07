import { Event, ActivationEnd } from "@angular/router";
import { OperatorFunction, filter } from "rxjs";
import { Type } from "@angular/core";

export function navigatedTo(
  component: Type<unknown>
): OperatorFunction<Event, ActivationEnd> {
  return filter((event: Event): event is ActivationEnd => {
    if (event instanceof ActivationEnd) {
      return event.snapshot.component === component;
    }
    return false;
  });
}
