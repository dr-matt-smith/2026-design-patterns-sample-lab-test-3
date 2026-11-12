{
  "name": "Traffic Lights — State pattern design",
  "description": "COMP H3032 Design Patterns · Week 9 State · a 3-state traffic light (RED → GREEN → AMBER → RED) built with the State pattern (variant 2): an «abstract» State superclass, one subclass per state, context passed with each event.",
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
      "text": "# Traffic Lights\n\n### The State pattern\n\n> A traffic light has three **states** and three **events**. The State pattern turns each **state** into its own **class**.\n\n<!--\nSpeaker note: the simplest possible state chart - one cycle, no guards, no decisions.\nCode: src/\n-->\n"
    },
    {
      "name": "The-Idea",
      "x": 240,
      "y": 0,
      "text": "# The idea: localise the behaviour of each state\n\n1. Define an **«abstract» `State` class** with one abstract method per event; each takes the context (the traffic light) as a parameter.\n2. Write **one subclass per state**, implementing *every* event for that state.\n3. The traffic light **delegates** each event to its *current* state object, passing **itself**: `state.goGreen(this)`.\n4. A state object moves the light on by calling **`setState(...)`** on the light it was given.\n\n> Think of a state × event table: the State pattern slices it **by row** (one class per state).\n"
    },
    {
      "name": "State-Classes",
      "x": 480,
      "y": 0,
      "text": "# The State classes\n\n```nomnoml\n#direction: down\n#spacing: 50\n#padding: 10\n#edgeMargin: 6\n#.abstract: fill=#e8f1fb italic\n[<abstract>«abstract» State|goRed(light);goGreen(light);goAmber(light)]\n[«abstract» State] <:- [RedState|goRed(light);goGreen(light);goAmber(light)]\n[«abstract» State] <:- [GreenState|goRed(light);goGreen(light);goAmber(light)]\n[«abstract» State] <:- [AmberState|goRed(light);goGreen(light);goAmber(light)]\n```\n\nEvery state subclass **extends** `State` and overrides **every** abstract event method. No state stores the traffic light: it arrives as a parameter with each event.\n\n<style scoped>\nsection { font-size: 24px; }\nsvg[data-nomnoml] { max-height: 420px; }\n</style>\n"
    },
    {
      "name": "Class-Diagram",
      "x": 720,
      "y": 0,
      "text": "# The design (nomnoml)\n\n```nomnoml\n#direction: down\n#spacing: 40\n#padding: 10\n#edgeMargin: 6\n#.abstract: fill=#e8f1fb italic\n[TrafficLight|- state: State|goRed();goGreen();goAmber();setState(state)]\n[<abstract>«abstract» State|goRed(light);goGreen(light);goAmber(light)]\n[TrafficLight] state o-> [«abstract» State]\n[«abstract» State] «use» --> [TrafficLight]\n[«abstract» State] <:- [RedState]\n[«abstract» State] <:- [GreenState]\n[«abstract» State] <:- [AmberState]\n```\n\n<style scoped>section { font-size: 24px; } svg[data-nomnoml] { max-height: 470px; }</style>\n"
    },
    {
      "name": "State-Chart-Diagram",
      "x": 960,
      "y": 0,
      "text": "# State Chart Diagram\n\n```nomnoml\n#direction: right\n#spacing: 110\n#padding: 14\n#edgeMargin: 10\n#gutter: 10\n#arrowSize: 0.7\n#.state: visual=roundrect fill=#fdf6e3 bold\n[<start>start]\n[<state>Red]\n[<state>Green]\n[<state>Amber]\n[start] -> [Red]\n[Red] goGreen -> [Green]\n[Green] goAmber -> [Amber]\n[Amber] goRed -> [Red]\n```\n\nEach box is a **subclass** of `State`; each arrow is a **`setState(...)`** call inside that class.\n"
    },
    {
      "name": "Transition-Table",
      "x": 1200,
      "y": 0,
      "text": "# Every state × every event\n\n| State ↓ / Event → | goGreen | goAmber | goRed |\n|---|---|---|---|\n| **Red** | → Green | ✗ must go GREEN first | ✗ already RED |\n| **Green** | ✗ already GREEN | → Amber | ✗ must go AMBER first |\n| **Amber** | ✗ must go RED first | ✗ already AMBER | → Red |\n\nOnly the **3 green cells** change the state — they are the diagram's arrows. The other **6 cells** are still behaviour the code must handle: the state stays the same, and a message says why.\n\n<style scoped>\nsection { font-size: 22px; }\ntbody tr:nth-child(1) td:nth-child(2),\ntbody tr:nth-child(2) td:nth-child(3),\ntbody tr:nth-child(3) td:nth-child(4) { background-color: #d8f5d0; }\n</style>\n"
    },
    {
      "name": "The-Abstract-State",
      "x": 1440,
      "y": 0,
      "text": "# The «abstract» `State` class\n\n```ts\nexport abstract class State {\n  public abstract goRed(trafficLight: TrafficLight): void;\n  public abstract goGreen(trafficLight: TrafficLight): void;\n  public abstract goAmber(trafficLight: TrafficLight): void;\n}\n```\n\nNo field, no constructor: the context is **passed in** with every event.\nEvery subclass must override **every** abstract method — the compiler checks none is forgotten.\nEach method prints what happened with `console.log`.\nSee `src/states/State.ts`.\n"
    },
    {
      "name": "A-State-Class",
      "x": 1680,
      "y": 0,
      "text": "# One state, one subclass: `RedState`\n\n```ts\nexport class RedState extends State {\n  public override goRed(_trafficLight: TrafficLight): void { console.log(\"The light is already RED\"); }\n\n  public override goGreen(trafficLight: TrafficLight): void {\n    console.log(\"The light changes to GREEN\");\n    trafficLight.setState(trafficLight.getGreenState());\n  }\n\n  public override goAmber(_trafficLight: TrafficLight): void {\n    console.log(\"You can't go AMBER from RED - the light must go GREEN first\");\n  }\n}\n```\n\nNo `if (state === ...)` anywhere — the class **is** the state. `_trafficLight` = a parameter this event doesn't need.\n\n<style scoped>section { font-size: 22px; }</style>\n"
    },
    {
      "name": "The-Light-Delegates",
      "x": 1920,
      "y": 0,
      "text": "# The traffic light just delegates\n\n```ts\nexport class TrafficLight {\n  private state: State;\n  // ... one object for each state, created in the constructor\n\n  public goGreen(): void {\n    this.state.goGreen(this); // pass myself to the state\n  }\n\n  public setState(state: State): void {\n    this.state = state;\n  }\n}\n```\n\nThe **behaviour changes** as the **state object changes**.\nSee `src/TrafficLight.ts`.\n\n<style scoped>section { font-size: 22px; }</style>\n"
    },
    {
      "name": "The-State-Pattern",
      "x": 2160,
      "y": 0,
      "text": "# The State pattern\n\n> **Allow an object to alter its behaviour when its internal state changes. The object will appear to change its class.**\n\n| Pattern role | Traffic light |\n|---|---|\n| **Context** | `TrafficLight` |\n| **State** («abstract» class) | `State` |\n| **ConcreteState** | `RedState`, `GreenState`, `AmberState` |\n\n<style scoped>section { font-size: 26px; }</style>\n"
    }
  ]
}
