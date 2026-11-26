const jsPsych = initJsPsych();

const stimulus = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p class="word" style="color: blue">RED</p>',
    choices: "NO_KEYS",
    trial_duration: 2000
};

jsPsych.run([stimulus])