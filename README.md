# MedTrak-Farkle

**Original submission notes:** I did not have time to implement the features I originally planned, due to the fact that relative unfamiliarity with Javascript/HTML made me need to spend a good mount of time checking syntax,functions etc, and figuring out what would be feasible for me to do in this amount of time.

## What I started but abandoned due to time awareness, less critical:

- ~~displaying the score where the graphics imply it should be~~
- have the Farkle message (if a dice roll results in score of 0) display on screen instead of to console, same for '5 turns' message

## The plan for what I would keep working on/implement if given the opportunity, most critical:

- ~~modified, single player Farkle game of chance~~, where the challenge is to see if you can beat 5,000 points in 5 turns or less (to be adjusted as necessary)
- ~~currently the program autocalculates your max score for each roll of the dice with the player having to click anything, I would finish implementing the functionality that requires the player to click before a particular die is including in the score for that turn~~
- ultimately make a more complicated multiplayer game that also accounts for the choice a player has in terms of either banking their points for a particular roll and passing, or going again, which I laid the groundwork for and mapped out in a pseudocode diagram

---

## Improvements made since the original submission

### Game features functionality and .js changes

- Dice only get counted towards score if they are clicked
- Score for each dice roll and turn totalcounted, as well as final cumulative score over all 5 rounds
- TODO: Make it so score is not cumulative over turn, sums up separate roll scores separately

### GUI

- Background gradient and bank button color/hover now both colorblind friendly
  (palettes taken from https://davidmathlogic.com/colorblind/)
- Changed fonts styles and sizes
- Dice go transparent when clicked, reset at the end of each turn
- Hover transparency on buttons
- Buttons get double outline
- Score displays to correct place, also displays turn count in matching style
- Separate button to calculate score for each roll and to bank total points for that turn

## Next steps ideas, most critical

- When you get Farkle on a dice roll, get 0 points for that turn and turn is over automatically.
- Instead of implementing human multiplayer, a good intermediary step idea was to play against the computer: each turn, will roll the dice for the "computer player" also and calculate max score for the computer. The goal would be to beat the computer in 5 turns, and although less robust than multiple human players, still implements a more interactive element to make it a true competitive game of chance.
- If I started from beginning again, would try to implement a MVC architecture to be more organized and scalable and implement classes more in general.

## Next steps ideas, less critical

- Display rules/guidelines on screen to make usage clear for human user (especially for current state of play: i.e., must always click calculate roll score before banking points, roll scores are cumulative over turn, objective is to beat xxxx points by end of 5 turns).
