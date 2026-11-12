import type { GumballMachine } from "./GumballMachine.ts";
import type { State } from "./State.ts";

// SoldOutState - no gumballs left; only a refill gets the machine going again

export class SoldOutState implements State {
  constructor(private gumballMachine: GumballMachine) {}

  public insertQuarter(): void {
    console.log("You can't insert a quarter, the machine is sold out");
  }

  public ejectQuarter(): void {
    console.log("You can't eject, you haven't inserted a quarter yet");
  }

  public turnCrank(): void {
    console.log("You turned, but there are no gumballs");
  }

  public dispense(): void {
    console.log("No gumball dispensed");
  }

  public refill(): void {
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  public toString(): string {
    return "SOLD_OUT";
  }


}
