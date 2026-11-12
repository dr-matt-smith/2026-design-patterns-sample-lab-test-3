{
  "name": "Gumball Machine — Version 2 Design (State pattern)",
  "description": "COMP H3032 Design Patterns · Week 9 State · the Mighty Gumball controller refactored with the State pattern: one class per state.",
  "navigation": {
    "show": true,
    "style": "arrows-name",
    "position": "top-right",
    "showNumber": true
  },
  "sequenceArrows": {
    "show": true,
    "style": "dashed",
    "color": "#ffcc00",
    "alpha": 0.55
  },
  "nodes": [
    {
      "name": "Start",
      "x": 0,
      "y": 0,
      "text": "# Mighty Gumball, Inc.\n\n### Version 2 design — the State pattern\n\n*\"Where the Gumball Machine is Never Half Empty\"*\n\n> Version 1 worked, but every action was an if-chain over every state. Version 2 turns each **state** into its own **class**.\n\n<!--\nSpeaker note: same machine, same behaviour, same messages as version 1 - only the design changes.\nCode: gumball_2_state/src/\n-->\n"
    },
    {
      "name": "The-Idea",
      "x": 240,
      "y": 0,
      "text": "# The idea: localise the behaviour of each state\n\n1. Define a **`State` interface** with one method per action.\n2. Write **one class per state**, implementing *every* action for that state.\n3. The machine **delegates** each action to its *current* state object.\n4. A state object moves the machine on by calling **`setState(...)`**.\n\n> Version 1 sliced the state × action table **by column** (one method per action).\n> Version 2 slices it **by row** (one class per state).\n"
    },
    {
      "name": "State-Classes",
      "x": 480,
      "y": 0,
      "text": "# The State classes (HFDP ch. 10)\n\n```nomnoml\n#direction: down\n#spacing: 50\n#padding: 10\n#edgeMargin: 6\n#.interface: fill=#e8f1fb italic\n#.new: fill=#ffe9a8 bold\n[<interface>«interface» State|insertQuarter();ejectQuarter();turnCrank();dispense();refill()]\n[«interface» State] <:-- [SoldState|insertQuarter();ejectQuarter();turnCrank();dispense();refill()]\n[«interface» State] <:-- [SoldOutState|insertQuarter();ejectQuarter();turnCrank();dispense();refill()]\n[«interface» State] <:-- [NoQuarterState|insertQuarter();ejectQuarter();turnCrank();dispense();refill()]\n[«interface» State] <:-- [HasQuarterState|insertQuarter();ejectQuarter();turnCrank();dispense();refill()]\n```\n\nEvery state class implements **every** action of the `State` interface. *(The code also adds `refill()`.)*\n\n<style scoped>\nsection { font-size: 24px; }\nsvg[data-nomnoml] { max-height: 420px; }\n</style>\n"
    },
    {
      "name": "Class-Diagram",
      "x": 720,
      "y": 0,
      "text": "# The design (nomnoml)\n\n```nomnoml\n#direction: down\n#spacing: 40\n#padding: 10\n#edgeMargin: 6\n#.interface: fill=#e8f1fb italic\n#.new: fill=#ffe9a8 bold\n[GumballMachine|- state: State;- count: number|insertQuarter();ejectQuarter();turnCrank();refill(count);setState(state);releaseBall()]\n[<interface>«interface» State|insertQuarter();ejectQuarter();turnCrank();dispense();refill()]\n[GumballMachine] state o-> [«interface» State]\n[«interface» State] <:-- [NoQuarterState]\n[«interface» State] <:-- [HasQuarterState]\n[«interface» State] <:-- [SoldState]\n[«interface» State] <:-- [SoldOutState]\n```\n\n<style scoped>section { font-size: 24px; } svg[data-nomnoml] { max-height: 470px; }</style>\n"
    },
    {
      "name": "State-Chart-Diagram",
      "x": 960,
      "y": 0,
      "text": "# State Chart Diagram\n\n```nomnoml\n#direction: right\n#spacing: 110\n#padding: 14\n#edgeMargin: 10\n#gutter: 10\n#arrowSize: 0.7\n#.state: visual=roundrect fill=#fdf6e3 bold\n#.decision: visual=rhomb fill=#f3efb0\n[<start>start]\n[<decision>​]\n[<state>No Quarter]\n[<state>Has Quarter]\n[<state>Sold]\n[<state>Sold Out]\n[start] -> [​]\n[No Quarter] \\[gumballs \\> 0\\] <- [​]\n[​] \\[gumballs == 0\\] -> [Sold Out]\n[No Quarter] inserts quarter -> [Has Quarter]\n[Has Quarter] ejects quarter -> [No Quarter]\n[Has Quarter] turns crank -> [Sold]\n[Sold] dispense -> [​]\n[Sold Out] refill -> [No Quarter]\n```\n\nEach box is now a **class**; each arrow is a **`setState(...)`** call inside that class.\n\n<!--\nNew since version 1: the refill transition, SoldOut -> NoQuarter.\n-->\n"
    },
    {
      "name": "Transition-Table",
      "x": 1200,
      "y": 0,
      "text": "# Every state × every action\n\n| State ↓ / Action → | insert quarter | eject quarter | turn crank | dispense | refill |\n|---|---|---|---|---|---|\n| **No Quarter** | → Has Quarter | ✗ no quarter | ✗ no quarter | ✗ pay first | – |\n| **Has Quarter** | ✗ already one | → No Quarter | → Sold | ✗ | – |\n| **Sold** | ✗ wait | ✗ already turned | ✗ turning twice | ◇ [gumballs > 0] → No Quarter<br>◇ [gumballs == 0] → Sold Out | – |\n| **Sold Out** | ✗ sold out | ✗ no quarter | ✗ no gumballs | ✗ | → No Quarter |\n\nOnly the **5 green cells** change the state — they are the diagram's arrows. The other **15 cells** are still behaviour the code must handle.\n\nSame table as version 1 (plus **refill**) — but now each **row** is one class.\n\n**◇** = a decision diamond on the state chart: the guard in [ ] picks the next state.\n\n<style scoped>\nsection { font-size: 19px; }\n/* the state-change cells (row, column) - light green */\ntbody tr:nth-child(1) td:nth-child(2),\ntbody tr:nth-child(2) td:nth-child(3),\ntbody tr:nth-child(2) td:nth-child(4),\ntbody tr:nth-child(3) td:nth-child(5),\ntbody tr:nth-child(4) td:nth-child(6) { background-color: #d8f5d0; }\n</style>\n"
    },
    {
      "name": "The-State-Interface",
      "x": 1440,
      "y": 0,
      "text": "# The `State` interface\n\n```ts\nexport interface State {\n  insertQuarter(): void;\n  ejectQuarter(): void;\n  turnCrank(): void;\n  dispense(): void;\n  refill(): void;\n}\n```\n\nEvery state must answer **every** action — the compiler checks none is forgotten.\nEach method prints what happened with `console.log` — like the book's `System.out.println`.\nSee `src/State.ts`.\n"
    },
    {
      "name": "A-State-Class",
      "x": 1680,
      "y": 0,
      "text": "# One state, one class: `HasQuarterState`\n\n```ts\nexport class HasQuarterState implements State {\n  constructor(private gumballMachine: GumballMachine) {}\n\n  public insertQuarter(): void { console.log(\"You can't insert another quarter\"); }\n\n  public ejectQuarter(): void {\n    console.log(\"Quarter returned\");\n    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());\n  }\n\n  public turnCrank(): void {\n    console.log(\"You turned...\");\n    this.gumballMachine.setState(this.gumballMachine.getSoldState());\n  }\n\n  public dispense(): void { console.log(\"No gumball dispensed\"); }\n  public refill(): void {}\n}\n```\n\nNo `if (state === ...)` anywhere — the class **is** the state.\n\n<style scoped>section { font-size: 22px; }</style>\n"
    },
    {
      "name": "The-Machine-Delegates",
      "x": 1920,
      "y": 0,
      "text": "# The machine just delegates\n\n```ts\nexport class GumballMachine {\n  private state: State;\n  // ... one object for each state, created in the constructor\n\n  public insertQuarter(): void {\n    this.state.insertQuarter();\n  }\n\n  public turnCrank(): void {\n    this.state.turnCrank();\n    this.state.dispense();\n  }\n\n  public setState(state: State): void {\n    this.state = state;\n  }\n}\n```\n\nSame calls from `main.ts` as version 1 — the **behaviour changes** as the **state object changes**.\nSee `src/GumballMachine.ts`.\n\n<style scoped>section { font-size: 22px; }</style>\n"
    },
    {
      "name": "The-State-Pattern",
      "x": 2160,
      "y": 0,
      "text": "# The State pattern\n\n> **Allow an object to alter its behaviour when its internal state changes. The object will appear to change its class.**\n\n| Pattern role | Gumball machine |\n|---|---|\n| **Context** | `GumballMachine` |\n| **State** (interface) | `State` |\n| **ConcreteState** | `NoQuarterState`, `HasQuarterState`, `SoldState`, `SoldOutState` |\n\n<style scoped>section { font-size: 26px; }</style>\n"
    },
    {
      "name": "Design-Questions",
      "x": 2400,
      "y": 0,
      "text": "# Was it worth it?\n\n- ✓ Each state's behaviour is in **one place** (its own class).\n- ✓ The if-chains are gone; each state is **closed for modification**, the machine **open for extension**.\n- ✗ More classes — five files instead of one.\n- ✗ States know about each other (`getSoldState()` …) — the transitions are spread across the classes.\n\n> Now the change request arrives: **1 in 10 customers wins a free gumball.** How much code changes? → **version 3**.\n"
    }
  ]
}
