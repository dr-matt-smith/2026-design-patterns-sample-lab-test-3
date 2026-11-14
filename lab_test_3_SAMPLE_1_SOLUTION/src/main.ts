import { TrafficLight } from "./TrafficLight.ts";

// main.ts - a simple text menu for the traffic light, run in the terminal
//
//   deno run src/main.ts

const light = new TrafficLight();

function showMenu(): void {
  console.log("\n1 - goGreen");
  console.log("2 - goAmber");
  console.log("3 - goRed");
  console.log("4 - goFlashing");
  console.log("q - quit");
}

function isValidChoice(choice: string): boolean {
  return choice === "1" || choice === "2" || choice === "3" || choice === "4" ||choice === "q";
}

function showStatus(): void {
  console.log(`---------------------------`);
  console.log(`State: ${light.getState()}`);
}

while (true) {
  showStatus();
  showMenu();
  const choice = (prompt(">") ?? "q").trim().toLowerCase();

  if (!isValidChoice(choice)) {
    console.log(`Invalid choice "${choice}" - please enter 1, 2, 3 or q`);
    continue;
  }

  if (choice === "q") {
    break;
  }

  if (choice === "1") {
    light.goGreen();
  } else if (choice === "2") {
    light.goAmber();
  } else if (choice === "3") {
    light.goRed();
  } else if (choice === "4") {
    light.goFlashing();
  }
}

console.log("Goodbye!");
