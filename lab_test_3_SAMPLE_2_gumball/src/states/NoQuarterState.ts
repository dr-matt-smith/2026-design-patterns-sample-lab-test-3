import type { GumballMachine } from "./GumballMachine.ts";
import type { State } from "./State.ts";

// NoQuarterState - the machine is waiting for a customer to insert a quarter

export class NoQuarterState implements State {
  constructor(private gumballMachine: GumballMachine) {}

  public insertQuarter(): void {
    console.log("You inserted a quarter");
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }

  public ejectQuarter(): void {
    console.log("You haven't inserted a quarter");
  }

  public turnCrank(): void {
    console.log("You turned, but there's no quarter");
  }

  public dispense(): void {
    console.log("You need to pay first");
  }

  public refill(): void {}

  public toString(): string {
      return "NO_QUARTER";
  }



}
