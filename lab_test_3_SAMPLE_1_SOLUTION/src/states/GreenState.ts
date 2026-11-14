import { State } from "./State.ts";
import { TrafficLight } from "../TrafficLight.ts";

export class GreenState extends State {
    public goFlashing(trafficLightSystem: TrafficLight){
        console.log("changing from RED to Flashing");
        const newState = trafficLightSystem.getFlashingState();
        trafficLightSystem.setState(newState);
    }

    public goAmber(trafficLightSystem: TrafficLight){
        console.log("changing from GREEN to AMBER");
        const newState = trafficLightSystem.getAmberState();
        trafficLightSystem.setState(newState);
    };

    public goGreen(trafficLightSystem: TrafficLight){
        console.log("Cannot change fropm Green to Green!");
    };

    public goRed(trafficLightSystem: TrafficLight){
        console.log("Cannot change fropm Green to Red!");
    };


     public toString(){  return "GREEN";}

}