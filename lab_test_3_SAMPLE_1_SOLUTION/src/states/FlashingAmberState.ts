import { State } from "./State.ts";
import { TrafficLight } from "../TrafficLight.ts";

export class FlashingAmberState extends State {
    public goRed(trafficLightSystem: TrafficLight){
        console.log("changing from FLASHING AMBER to RED");
        const newState = trafficLightSystem.getRedState();
        trafficLightSystem.setState(newState);
    };

    public goGreen(trafficLightSystem: TrafficLight){
        console.log("Cannot change from FLASHING to Green!");
    };

    public goAmber(trafficLightSystem: TrafficLight){
        console.log("Cannot change fropm FLASHING to Amber!");
    };

    public goFlashing(trafficLightSystem: TrafficLight){
        console.log("Cannot change fropm FLASHING to FLASHING!");
    }

     public toString(){  return "FLASHING AMBER";}
   
}