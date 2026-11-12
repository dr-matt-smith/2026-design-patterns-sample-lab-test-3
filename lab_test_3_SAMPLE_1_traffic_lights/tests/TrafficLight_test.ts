import { assertEquals } from "@std/assert";
import { TrafficLight } from "../src/TrafficLight.ts";

// Runs an event with console.log silenced, and returns what it printed.
function quietly(event: () => void): string {
  const original = console.log;
  const lines: string[] = [];
  console.log = (...args: unknown[]) => lines.push(args.join(" "));
  try {
    event();
  } finally {
    console.log = original;
  }
  return lines.join("\n");
}

Deno.test("a new traffic light starts RED", () => {
  assertEquals(`${new TrafficLight().getState()}`, "RED");
});

Deno.test("goGreen, goAmber, goRed go round the cycle RED -> GREEN -> AMBER -> RED", () => {
  const light = new TrafficLight();
  quietly(() => light.goGreen());
  assertEquals(`${light.getState()}`, "GREEN");
  quietly(() => light.goAmber());
  assertEquals(`${light.getState()}`, "AMBER");
  quietly(() => light.goRed());
  assertEquals(`${light.getState()}`, "RED");
});

Deno.test("invalid events leave the state unchanged and say so", () => {
  const light = new TrafficLight(); // RED
  assertEquals(quietly(() => light.goAmber()), "You can't go AMBER from RED - the light must go GREEN first");
  assertEquals(quietly(() => light.goRed()), "The light is already RED");
  assertEquals(`${light.getState()}`, "RED");

  quietly(() => light.goGreen()); // GREEN
  assertEquals(quietly(() => light.goRed()), "You can't go RED from GREEN - the light must go AMBER first");
  assertEquals(quietly(() => light.goGreen()), "The light is already GREEN");
  assertEquals(`${light.getState()}`, "GREEN");

  quietly(() => light.goAmber()); // AMBER
  assertEquals(quietly(() => light.goGreen()), "You can't go GREEN from AMBER - the light must go RED first");
  assertEquals(quietly(() => light.goAmber()), "The light is already AMBER");
  assertEquals(`${light.getState()}`, "AMBER");
});
