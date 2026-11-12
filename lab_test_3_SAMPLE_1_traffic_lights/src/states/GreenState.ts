import type { TrafficLight } from "../TrafficLight.ts";
import { State } from "./State.ts";

// GreenState - traffic may go; the only way out is goAmber()

export class GreenState extends State {
  public override goRed(_trafficLight: TrafficLight): void {
    console.log("You can't go RED from GREEN - the light must go AMBER first");
  }

  public override goGreen(_trafficLight: TrafficLight): void {
    console.log("The light is already GREEN");
  }

  public override goAmber(trafficLight: TrafficLight): void {
    console.log("The light changes to AMBER");
    trafficLight.setState(trafficLight.getAmberState());
  }

  public override toString(): string {
    return "GREEN";
  }
}
