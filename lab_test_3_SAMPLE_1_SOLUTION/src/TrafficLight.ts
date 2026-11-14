import { State } from "./states/State.ts";
import { RedState } from "./states/RedState.ts";
import { GreenState } from "./states/GreenState.ts";
import { AmberState } from "./states/AmberState.ts";
import { FlashingAmberState } from "./states/FlashingAmberState.ts";
 
export class TrafficLight {
    private redState: State;
    private greenState: State;
    private amberState: State;
    private flashingState: State;

    private state: State;

    constructor() {
        this.redState = new RedState();
        this.greenState = new GreenState();
        this.amberState = new AmberState();
        this.flashingState = new FlashingAmberState();

        this.state = this.redState;
    }

    public getRedState(): State { return this.redState; }
    public getGreenState(): State { return this.greenState; }
    public getAmberState(): State { return this.amberState; }
    public getFlashingState(): State { return this.flashingState; }


    public goRed() {
        this.state.goRed(this);
    }

    public goGreen() {
        this.state.goGreen(this);
    }

    public goAmber() {
        this.state.goAmber(this);
    }

    public goFlashing() {
        this.state.goFlashing(this);
    }

    // change the state
    public setState(state: State){
        this.state = state;
    }

    public getState():string {
        return this.state;
    }
}