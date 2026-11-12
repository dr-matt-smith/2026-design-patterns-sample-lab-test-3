import type { GumballMachine } from "./GumballMachine.ts";
import type { State } from "./State.ts";

// SoldState - the crank has been turned, a gumball is on its way out

export class SoldState implements State {
  constructor(private gumballMachine: GumballMachine) {}

  public insertQuarter(): void {
    console.log("Please wait, we're already giving you a gumball");
  }

  public ejectQuarter(): void {
    console.log("Sorry, you already turned the crank");
  }

  public turnCrank(): void {
    console.log("Turning twice doesn't get you another gumball!");
  }

  public dispense(): void {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() > 0) {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    } else {
      console.log("Oops, out of gumballs!");
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    }
  }

  public refill(): void {}

  public toString(): string {
    return "SOLD";
  }

}
