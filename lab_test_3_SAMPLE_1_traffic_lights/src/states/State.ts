import type { TrafficLight } from "../TrafficLight.ts";

// State - the «abstract» superclass every traffic light state extends
//
// The context (the TrafficLight) is NOT stored here: it is passed in as a parameter with every event,
// so a state object holds no reference to the light, and calls trafficLight.setState(...) on the one it is given.
//
// One abstract method per EVENT. Each concrete state subclass answers every event in its own way,
// so there are no "which state am I in?" if-chains: the traffic light just asks
// its current state object to handle the event (it DELEGATES to it), passing itself along.

export abstract class State {
  public abstract goRed(trafficLight: TrafficLight): void;
  public abstract goGreen(trafficLight: TrafficLight): void;
  public abstract goAmber(trafficLight: TrafficLight): void;
  public abstract toString(): string;
}
