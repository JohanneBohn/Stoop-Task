const jsPsych = initJsPsych();
jsPsych.run([{
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>Works?</p>"
}]);