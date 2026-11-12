import type { GumballMachine } from "./GumballMachine.ts";
import type { State } from "./State.ts";

// HasQuarterState - a quarter is in the machine, waiting for the crank to be turned

export class HasQuarterState implements State {
  constructor(private gumballMachine: GumballMachine) {}

  public insertQuarter(): void {
    console.log("You can't insert another quarter");
  }

  public ejectQuarter(): void {
    console.log("Quarter returned");
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  public turnCrank(): void {
    console.log("You turned...");
    this.gumballMachine.setState(this.gumballMachine.getSoldState());
  }

  public dispense(): void {
    console.log("No gumball dispensed");
  }

  public refill(): void {}

  public toString(): string {
      return "HAS_QUARTER";
  }


}
