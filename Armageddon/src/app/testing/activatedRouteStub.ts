import { Params } from "@angular/router";
import { ReplaySubject } from "rxjs";

export class ActivatedRouteStub {
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    private subject = new ReplaySubject<Params>();

    constructor(initialParams?: Params) {
        this.setParams(initialParams);
    }

    /** The mock paramMap observable */
    readonly params = this.subject.asObservable();

    /** Set the paramMap observable's next value */
    setParams(params: Params = {}) {
        this.subject.next(params);
    }
}