import type { TrafficLight } from "../TrafficLight.ts";
import { State } from "./State.ts";

// AmberState - traffic should prepare to stop; the only way out is goRed()

export class AmberState extends State {
  public override goRed(trafficLight: TrafficLight): void {
    console.log("The light changes to RED");
    trafficLight.setState(trafficLight.getRedState());
  }

  public override goGreen(_trafficLight: TrafficLight): void {
    console.log("You can't go GREEN from AMBER - the light must go RED first");
  }

  public override goAmber(_trafficLight: TrafficLight): void {
    console.log("The light is already AMBER");
  }

  public override toString(): string {
    return "AMBER";
  }
}
