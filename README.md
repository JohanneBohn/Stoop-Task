# Stroop-Task
Cog-Sup S1 - Experimental approach - Session 4

Create a simple Stroop task using HTML to structure the page, CSS to control its appearance, and JsPsych to run the experiment. 

In this task, a colour word appears on the screen, and the participant must identify its ink colour while ignoring what the word says. Include two conditions: congruent trials, where the word and ink colour match (for example, “RED” displayed in red), and incongruent trials, where they differ (for example, “RED” displayed in blue). Use four colours, present both conditions equally often, and randomize the trial order. Begin with a short instruction screen explaining the task and the keyboard response mapping. Keep this mapping visible during the experiment. Present one word at a time, wait for a valid response, and then continue to the next trial; each trial should record only one response. Save the trial number, word, ink colour, condition, key pressed, whether the response was correct, and response time in milliseconds measured from the word’s appearance. At the end, provide a button to download these results as a CSV file. 

Develop your experiment in small steps: 
- first create the page, 
- then display a stimulus, 
- add keyboard responses, 
- build the trial sequence, 
- and finally implement data recording and downloading. 

Use Git locally from the beginning and make a commit after each meaningful change, with a message explaining that change; no GitHub account is required. Test each part as you build it, then complete one full run on yourself. Open the downloaded data and check that every trial has a row and that the recorded conditions, responses, and correctness agree. Submit all your HTML, CSS, and JavaScript files, the CSV file from your complete self-run, and an exported Git history showing your commits and the changes they contain.

Link to Stroop paper: https://www.yorku.ca/pclassic/Stroop/#f1