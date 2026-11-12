import { GumballMachine } from "./GumballMachine.ts";

// main.ts - a simple text menu for the gumball machine, run in the terminal
//
//   deno run src/main.ts

const machine = new GumballMachine(2);

function showMenu(): void {
  console.log("\n1 - insert a quarter");
  console.log("2 - eject the quarter");
  console.log("3 - turn the crank");
  console.log("4 - refill with 5 gumballs");
  console.log("q - quit");
}

function isValidChoice(choice: string): boolean {
  return choice === "1" || choice === "2" || choice === "3" || choice === "4" || choice === "q";
}

function showStatus(): void {
  console.log(`---------------------------`);
  console.log(`State: ${machine.getState()}`);
  console.log(`Gumballs: ${machine.getCount()}`);
}

while (true) {
  showStatus();
  showMenu();
  const choice = (prompt(">") ?? "q").trim().toLowerCase();

  if (!isValidChoice(choice)) {
    console.log(`Invalid choice "${choice}" - please enter 1, 2, 3, 4 or q`);
    continue;
  }

  if (choice === "q") {
    break;
  }

  if (choice === "1") {
    machine.insertQuarter();
  } else if (choice === "2") {
    machine.ejectQuarter();
  } else if (choice === "3") {
    machine.turnCrank();
  } else if (choice === "4") {
    machine.refill(5);
  }
}

console.log("Goodbye!");
