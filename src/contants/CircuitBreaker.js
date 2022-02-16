export CircuitBreakerOptions = {
    openBreakerTimeoutInMs?: number;
    closedBreakerTimeoutInMs?: number;
    minFailedRequestThreshold?: number;
    percentageFailedRequestsThreshold?: number;
}

enum CircuitBreakerState {
    OPENED = "OPENED",
    CLOSED = "CLOSED",
    HALF = "HALF"
}

export class CircuitBreaker<PAYLOAD> {
    options: Required<CircuitBreakerOptions>;
    state = CircuitBreakerState.OPENED;

    constructor(
        private request: (...args: any[]) => Promise<PAYLOAD>,
        opts?: CircuitBreakerOptions
    ) {
        this.options = {
            openBreakerTimeoutInMs: opts?.openBreakerTimeoutInMs || 10000,
            closedBreakerTimeoutInMs: opts?.closedBreakerTimeoutInMs || 5000,
            minFailedRequestThreshold: opts?.minFailedRequestThreshold || 15,
            percentageFailedRequestsThreshold: opts?.percentageFailedRequestsThreshold || 50,
        };
    }

    async fire(...args: any[]) {
        // handle request invocation
    }

    private success(response: PAYLOAD) {
        // handle successful requests
    }

    private fail(e: any, args: any[]) {
        // handle failed requests
    }
}