import { State } from "./State.ts";
import { TrafficLight } from "../TrafficLight.ts";

export class RedState extends State {
    public goFlashing(trafficLightSystem: TrafficLight){
        console.log("changing from RED to Flashing");
        const newState = trafficLightSystem.getFlashingState();
        trafficLightSystem.setState(newState);
    }


    public goGreen(trafficLightSystem: TrafficLight){
        console.log("changing from RED to GREEN");
        const newState = trafficLightSystem.getGreenState();
        trafficLightSystem.setState(newState);
    };

    public goAmber(trafficLightSystem: TrafficLight){
        console.log("Cannot change fropm Red to Amber!");
    };

    public goRed(trafficLightSystem: TrafficLight){
        console.log("Cannot change fropm Red to Red!");
    };

    public toString(){  return "RED";}
}