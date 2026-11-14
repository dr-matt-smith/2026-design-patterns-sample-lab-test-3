import { State } from "./State.ts";
import { TrafficLight } from "../TrafficLight.ts";

export class AmberState extends State {
    public goFlashing(trafficLightSystem: TrafficLight){
        console.log("changing from RED to Flashing");
        const newState = trafficLightSystem.getFlashingState();
        trafficLightSystem.setState(newState);
    }

    public goRed(trafficLightSystem: TrafficLight){
        console.log("changing from AMBER to RED");
        const newState = trafficLightSystem.getRedState();
        trafficLightSystem.setState(newState);

//        trafficLightSystem.setState(trafficLightSystem.getRedState());
    };

    public goGreen(trafficLightSystem: TrafficLight){
        console.log("Cannot change from Amber to Green!");
    };

    public goAmber(trafficLightSystem: TrafficLight){
        console.log("Cannot change fropm Amber to Amber!");
    };

     public toString(){  return "AMBER";}
   
}