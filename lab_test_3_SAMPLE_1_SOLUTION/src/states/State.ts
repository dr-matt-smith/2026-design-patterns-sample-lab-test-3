import { TrafficLight } from "../TrafficLight.ts";

export abstract class State {
    public goRed(trafficLightSystem: TrafficLight){};
    public goGreen(trafficLightSystem: TrafficLight){};
    public goAmber(trafficLightSystem: TrafficLight){};
    public goFlashing(trafficLightSystem: TrafficLight){};
}