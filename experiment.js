const jsPsych = initJsPsych();

const stimulus = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p class="word" style="color: blue">RED</p>`,
    choices: "NO_KEYS",
    trial_duration: 2000
};

const colors = {
    red: { hex: "#d00000", key: "e" },
    green: { hex: "#008000", key: "f" },
    blue: { hex: "#0040ff", key: "j" },
    purple: { hex: "#8000a0", key: "o" }
};

const names = Object.keys(colors);

const keys = names.map(n => colors[n].key);

const mappingText = names
    .map(n => `${colors[n].key.toUpperCase()} = ${n}`)
    .join(" &nbsp;|&nbsp; ");

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>A color word will appear in the middle of the screen.</p>
                <p>Press the key for the <b>color of the ink</b>, and ignore what the word says.</b></p>
                <p>Respond as quickly and as accurately as you can.</p>
                <p>Press any key to begin.</p>`,
    on_finish: () => {
        const m = document.getElementById("mapping");
       m.innerHTML = mappingText;
       m.hidden = false; 
    }
};


jsPsych.run([instructions, stimulus])