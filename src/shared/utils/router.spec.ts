/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivationEnd, Event } from "@angular/router";
import { navigatedTo } from "./router";
import { of } from "rxjs";

describe("navigatedTo", () => {
  class MockComponent {}

  it("should return true when event is ActivationEnd and component matches", (done) => {
    const mockActivationEndEvent = new ActivationEnd({
      component: MockComponent,
    } as any);
    const events$ = of(mockActivationEndEvent);

    events$.pipe(navigatedTo(MockComponent)).subscribe((event) => {
      expect(event).toBe(mockActivationEndEvent);
      done();
    });
  });

  it("should return false when event is ActivationEnd and component does not match", () => {
    class MockComponent {}
    const mockActivationEndEvent = new ActivationEnd({
      component: class {},
    } as any);

    const mockEvent: Event = { id: 1, url: "some-url" } as Event;

    const events$ = of(mockEvent, mockActivationEndEvent);
    events$.pipe(navigatedTo(MockComponent)).subscribe((event) => {
      expect(event).not.toBe(mockActivationEndEvent);
    });
  });
});
