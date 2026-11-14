# Question 1

## the state machine diagram to implement

Traffic light state machine diagram
![](README_images/traffic_light_statechart.svg)


NOTES:
1. Each State object should return its name in CAPS in a `toString()` method
    - e.g.
        ```typescript
        public toString(): string {
            return "RED";
        }
        ```


1. your system should log to the console appropriate messages when each event is processed 
    - An event that is valid should change state
        - and print a message saying it's changing to the new state.
    - An event that is NOT valid in the current state must leave the state unchanged
        - and print a message saying why.

    - e.g. 
        - `The light changes to AMBER`
        - `The light is already GREEN`





## the state pattern variant to demonstrate

![](README_images/state_v2_abstract_param.svg)

## `main.ts` - sample text-driven menu

You have been provided with a sample main.ts for a text-driven menu to interactively drive your implementation

The terminal output should look something like the following:

```bash
question1 % deno run src/main.ts
---------------------------
State: RED

1 - goGreen
2 - goAmber
3 - goRed
q - quit
> 2
You can't go AMBER from RED - the light must go GREEN first
---------------------------
State: RED

1 - goGreen
2 - goAmber
3 - goRed
q - quit
> 1
The light changes to GREEN
---------------------------
State: GREEN

1 - goGreen
2 - goAmber
3 - goRed
q - quit
> 
```

# Question 2

Create a copy of your question 1 project, naming the copy `question2`. 
Then in your `question2` project implement the following additional functionality:

- add a new state 'FlashingAmber', used when the lights are out of order
- add a new event `goFlashing()`: from ANY of the RED, GREEN or AMBER states it moves the light to 'FlashingAmber'
- from 'FlashingAmber', `goRed()` moves the light back to RED; every other event leaves it flashing
- add a menu option to `main.ts` for the new event
