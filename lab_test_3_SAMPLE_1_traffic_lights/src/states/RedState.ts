import type { TrafficLight } from "../TrafficLight.ts";
import { State } from "./State.ts";

// RedState - traffic must stop; the only way out is goGreen()

export class RedState extends State {
  // an event that does not change the state ignores the light it is given, so its parameter is named _trafficLight

  public override goRed(_trafficLight: TrafficLight): void {
    console.log("The light is already RED");
  }

  public override goGreen(trafficLight: TrafficLight): void {
    console.log("The light changes to GREEN");
    trafficLight.setState(trafficLight.getGreenState());
  }

  public override goAmber(_trafficLight: TrafficLight): void {
    console.log("You can't go AMBER from RED - the light must go GREEN first");
  }

  public override toString(): string {
    return "RED";
  }
}
