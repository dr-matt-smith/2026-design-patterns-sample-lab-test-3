import { AmberState } from "./states/AmberState.ts";
import { GreenState } from "./states/GreenState.ts";
import { RedState } from "./states/RedState.ts";
import type { State } from "./states/State.ts";

// TrafficLight - the State pattern
//
// The traffic light (the "context") holds one object for each state, and a reference to the CURRENT one.
// Every event is simply passed on (delegated) to the current state object, together with the light itself
// (state.goGreen(this)) - no if-chains here. The state objects keep no reference to the light.
// The state objects decide what happens, and call setState() to move the light to the next state.

export class TrafficLight {
  private redState: State;
  private greenState: State;
  private amberState: State;

  private state: State;

  constructor() {
    this.redState = new RedState();
    this.greenState = new GreenState();
    this.amberState = new AmberState();

    // the initial pseudo-state on the state chart points at RED
    this.state = this.redState;
  }

  // -------------------------------------------------------------------------------------------
  // Events - each is delegated to the current state, passing this light along
  // -------------------------------------------------------------------------------------------

  public goRed(): void {
    this.state.goRed(this);
  }

  public goGreen(): void {
    this.state.goGreen(this);
  }

  public goAmber(): void {
    this.state.goAmber(this);
  }

  // -------------------------------------------------------------------------------------------
  // Used by the state objects
  // -------------------------------------------------------------------------------------------

  public setState(state: State): void {
    this.state = state;
  }

  public getRedState(): State {
    return this.redState;
  }

  public getGreenState(): State {
    return this.greenState;
  }

  public getAmberState(): State {
    return this.amberState;
  }

  // -------------------------------------------------------------------------------------------
  // Queries - ask the traffic light about itself
  // -------------------------------------------------------------------------------------------

  public getState(): State {
    return this.state;
  }
}
