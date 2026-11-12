import { HasQuarterState } from "./states/HasQuarterState.ts";
import { NoQuarterState } from "./states/NoQuarterState.ts";
import { SoldOutState } from "./states/SoldOutState.ts";
import { SoldState } from "./states/SoldState.ts";
import type { State } from "./states/State.ts";

// GumballMachine - the book's SECOND version: the State pattern
//
// The machine (the "context") holds one object for each state, and a reference to the CURRENT one.
// Every action is simply passed on (delegated) to the current state object - no if-chains here.
// The state objects decide what happens, and call setState() to move the machine to the next state.

export class GumballMachine {
  private soldOutState: State;
  private noQuarterState: State;
  private hasQuarterState: State;
  private soldState: State;

  private state: State;
  private count: number;

  constructor(numberGumballs: number) {
    this.soldOutState = new SoldOutState(this);
    this.noQuarterState = new NoQuarterState(this);
    this.hasQuarterState = new HasQuarterState(this);
    this.soldState = new SoldState(this);

    this.count = numberGumballs;
    if (numberGumballs > 0) {
      this.state = this.noQuarterState;
    } else {
      this.state = this.soldOutState;
    }
  }

  // -------------------------------------------------------------------------------------------
  // Actions - each one is delegated to the current state, which prints what happened
  // -------------------------------------------------------------------------------------------

  public insertQuarter(): void {
    this.state.insertQuarter();
  }

  public ejectQuarter(): void {
    this.state.ejectQuarter();
  }

  // dispense() is an internal action: the customer can't ask for it, it follows turning the crank
  public turnCrank(): void {
    this.state.turnCrank();
    this.state.dispense();
  }

  public refill(count: number): void {
    this.count += count;
    console.log(`The gumball machine was just refilled; its new count is: ${this.count}`);
    this.state.refill();
  }

  // -------------------------------------------------------------------------------------------
  // Used by the state objects
  // -------------------------------------------------------------------------------------------

  public setState(state: State): void {
    this.state = state;
  }

  public releaseBall(): void {
    console.log("A gumball comes rolling out the slot...");
    if (this.count !== 0) {
      this.count = this.count - 1;
    }
  }

  public getSoldOutState(): State {
    return this.soldOutState;
  }

  public getNoQuarterState(): State {
    return this.noQuarterState;
  }

  public getHasQuarterState(): State {
    return this.hasQuarterState;
  }

  public getSoldState(): State {
    return this.soldState;
  }

  // -------------------------------------------------------------------------------------------
  // Queries - ask the machine about itself
  // -------------------------------------------------------------------------------------------

  public getCount(): number {
    return this.count;
  }

  public getState(): State {
    return this.state;
  }

}
