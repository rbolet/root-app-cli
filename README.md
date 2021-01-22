# Root coding challenge

_**Aside / disclaimer**: I think there was a bit of misunderstanding between the email communication etc outside of the actual given instructions ... my understanding was that the idea was to submit something "full stack" ... in short I made the mistake of starting off with a set of assumptions and the basic gist of what was wanted, and went back later to make sure what I was building hit the all the details of the instructions. Clearly a mistake and I should have carefully read the instructions the first time. The end result is I went overboard, and specifically didn't catch the "no need to persist to disk" until I was already quite a ways into the process. Rather than remove the portions that are beyond the scope of the exercise I have chosen to include them anyway, and am counting on you taking the extra as enthusiasm rather than lack of attention to detail :/_

---

### The app - the "what":

- A simple tool in Node.js that accepts either single lines of commands and text files containing multiple commands, stores drivers and trips in a JSON file, and outputs a summary/average of each driver's trip data.
  - Includes a simple help menu
  - Includes commands to view the current state of the JSON data and the current summary.
  - Includes a "--verbose" flag to view both the JSON data and the summary
- run:
  - via npm script "npm run cli [command] <arguments\>", but this causes problems if/when using flags like --verbose
  - install as npm package and use command "root-trips-cli [command] <arguments\>"

### Thought process - the "why":

- My first (faulty, see above) thought was in any kind of real-world application, the raw data should be retained along with the expected, calculated data. The given expected output includes some aggregating of data, and if it were entered one line at a time but not stored, it wouldn't be very useful. My first instinct was therefore to store it in a database, but since I'm not terribly familiar with any fast database prototyping tools, I chose to persist the data in a JSON file. In a more "real" scenario, I would have added another abstractioin layer to make it relatively simple to swap out a real db for the "fake" JSON one, but since abstraction layers were specifically noted as unnecessary in the instructions, I chose not to.
  - I'm simply not sure how performant this method would be at scale ... I assume rather poor, especially as in order to keep that JSON file the "single source of truth," since I'm unaware of a way to alter parts of a JSON file on disk, inserting to the JSON "database" requires reading the whole file, parsing it to a plain JavaScript object, inserting the new data, then overwriting the entire file again. Rather ... clumsy. But works!
  - So I chose to "represent" the data as a JSON object ... but I chose to persist the raw input data rather than the data as represented in the report, because:
    - The aggregated/calculated data stilly readily accessibly with just a bit of math, something computers do rather well/rapidly
    - The data in its final state as in the report is rounded, and if rounded data was added to rounded data it would become increasingly inaccurate.
- Full disclosure: This is my first real experience working with a cli rather than web-based app, so some decisions via googling a few examples/tutorials of Node.js cli apps and following what seemed best from what I found:
  - Keeping the binary file very small - honestly I don't understand how this may impact performance but it at least made sense to me, so I ran with it.
  - Structure of a index switch statement of commands + seperate command files - struck me as a great way to keep the app modular so it could be interated on in the future
- Project file structure: I do try to keep my files small and functions "pure" and re-usable/modular. As noted above I stole the idea of separate "command" files, and seperation of concerns from there was fairly clear--
  - The simulated db "service" interacting with the JSON "database" file definitely stands apart; In fact it could have been separated further into the direct reading/writing to the file and the "select" and "insert" etc methods.
  - "Collating" and calculating the driver and driver trips data is seperatable from the "Driver" and "Trip" commands, as neither input implies/assumes this data manipulation, perhaps later the same data/inputs would be used for other things. Collating and calculating are different concerns, especially since the order of the process could be changed (and is-- for example trips use some calculation to check that it's within the boundaries ... so the flow for "Driver" is input > collate > calculate > output where "Trip" is input > calculate > collate > calculate > output). "Output" is similarly a separate concern.
- Order of approach/testing:
  - Being able to test each step accurately is also what helped determine which parts of the codebase to write first. The workflow of this little app is pretty clear (user input > do stuff > output) so which steps were dependent on others was also clear. So the "bottom" processes/functions were built and tested first, then when those were working as expected I moved "up" to the step most closely depending on the one I had just ensured worked.
    - Rough order of completion was db service > utility functions > input manipulation ("commands") > input handling (index.js), with tests being written along the way
    - (I know TDD is a thing, and probably wrote tests first a little over half the time, but it's not a habit ingrained in me quite yet.)
  - Wherever possible/practical I used hard-coded inputs for tests so that if the test suite failed it was clear where the problem was (i.e. I trying to avoid using returns from one function as arguments for another in the tests even though that is how the actual app would behave).
- Other bits and pieces:
  - This problem called for a balance between thoroughness and getting it done and turned it, so that guided some choices like input validation-- I tried to address it where it seemed most important or most likely to be wrong, but assumed perfect input in other places for the sake of the exercise. I noted a few specific places where I am aware more input validation may be a good thing. The same could be said about testing for failing conditions, etc.
  - I'm not accustomed to outputing directly to the terminal, so that very last step is not covered well if at all in the tests
  - I made an effort to minimize the use of 3rd party libraries, except in the case of linting because something automatically catching my mistakes early is bae.
  - Choosing the language is a no-brainer for me, I'm only very familiar with JavaScript so far (a tad of PHP) so Node.js since this was a cli tool.
