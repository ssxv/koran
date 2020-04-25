export interface Transition {
    from: string;
    to: string;
}
export interface TransitionsMap {
    [transitionName: string]: Transition;
}

export class Transitional {

    private transitionsMap: TransitionsMap;
    private stateField: string;

    constructor(
        transitions: TransitionsMap,
        stateField: string,
    ) {
        this.transitionsMap = transitions;
        this.stateField = stateField;
    }

    private getTransition(transitionName: string): Transition | null {
        return this.transitionsMap[transitionName];
    }

    can(transitionName: string): boolean {
        const transition = this.getTransition(transitionName);
        if (transition) {
            return transition.from === this[this.stateField];
        }
        return false;
    }

    do(transitionName: string) {
        if (!this.can(transitionName)) {
            throw new Error(`Invalid state to perform this transition`);
        }
        const transition = this.getTransition(transitionName);
        this[this.stateField] = transition.to;
    }
}
