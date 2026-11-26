const jsPsych = initJsPsych();

const COLORS = {
    red: { hex: "#d00000", key: "e" },
    green: { hex: "#008000", key: "f" },
    blue: { hex: "#0040ff", key: "j" },
    purple: { hex: "#8000a0", key: "o" }
};

const NAMES = Object.keys(COLORS);

const KEYS = NAMES.map(n => COLORS[n].key);

const mappingText = NAMES
    .map(n => `${COLORS[n].key.toUpperCase()} = ${n}`)
    .join(" &nbsp;|&nbsp; ");

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>A color word will appear in the middle of the screen.</p>
                <p>Press the key for the <b>color of the ink</b>, and ignore what the word says.</p>
                <p>Respond as quickly and as accurately as you can.</p>
                <p>Press any key to begin.</p>`,
    on_finish: () => {
        const m = document.getElementById("mapping");
        m.innerHTML = mappingText;
        m.hidden = false; 
    }
};

function makeTrialList(congruentReps, incongruentReps) {
    // Creates the list of all the word.ink combinations.
    const list = [];
    for (const word of NAMES) {
        for (const ink of NAMES) {
            const condition = word === ink ? "congruent" : "incongruent";
            const reps = condition === "congruent" ? congruentReps : incongruentReps;
            for (let i = 0; i < reps; i++) list.push({ word, ink, condition });
        }
    }
    return list;
}

function orderTrials(list) {
    // Randomized the order under the Stroop condition (not the same word or the same color twice in a row).
    for (let attempt = 0; attempt < 1000; attempt++) {
        const remaining = [...list];
        const sequence = [];
        while (remaining.length > 0) {
            const prev = sequence[sequence.length - 1];
            const allowed = remaining.filter(t => !prev || (t.word !== prev.word && t.ink !== prev.ink));
            if (allowed.length === 0) break;
            const pick = allowed[Math.floor(Math.random() * allowed.length)];
            sequence.push(pick);
            remaining.splice(remaining.indexOf(pick), 1);
    }
    if (sequence.length === list.length) return sequence;
  }
  return jsPsych.randomization.shuffle(list);
}

const trials = orderTrials(makeTrialList(3,1))


let trialNumber = 0;


const blank_screen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p class="word">+</p>',
    choices: "NO_KEYS",
    trial_duration: 500
};

function stroopTrial(task) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: () => {
            const word = jsPsych.evaluateTimelineVariable("word");
            const ink = jsPsych.evaluateTimelineVariable("ink");
            return `<p class="word" style="color: ${COLORS[ink].hex}">${word.toUpperCase()}</p>`;
    },
        choices: KEYS,
        response_ends_trial: true,
    data: {
        task: task,
        word: jsPsych.timelineVariable("word"),
        ink: jsPsych.timelineVariable("ink"),
        condition: jsPsych.timelineVariable("condition")
    },
    on_finish: (data) => {
        data.key = data.response;
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, COLORS[data.ink].key);
        if (task === "stroop") data.trial_number = ++trialNumber;
        }
    };
}

const main = {
    timeline: [blank_screen, stroopTrial("stroop")],
    timeline_variables: trials
};


jsPsych.run([instructions, main])