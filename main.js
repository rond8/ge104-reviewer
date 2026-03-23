const pairs = [
  {term:"Communication",definition:"The process of creating, interpreting, and negotiating meaning"},
  {term:"Sender/Source",definition:"The person that is delivering a message to a recipient"},
  {term:"Message",definition:"This refers to the information, ideas, or thoughts that the sender is relaying"},
  {term:"Encoding",definition:"The process of converting a message or idea into words, actions, or forms that can be understood"},
  {term:"Channel",definition:"The medium or the means of communication"},
  {term:"Decoding",definition:"The interpretation of the message performed by the receiver"},
  {term:"Receiver",definition:"The recipient of the message or the person who decodes it"},
  {term:"Feedback",definition:"The reactions, responses, or information provided by the receiver back to the sender"},
  {term:"Linear Model",definition:"A one-way communication model often used for mass communication where there is no feedback"},
  {term:"Transactional Model",definition:"A dynamic process where people create shared meaning through simultaneous and instant feedback"},
  {term:"Interactional Model",definition:"Known as the convergence model, where understanding is achieved through slower feedback turns"},
  {term:"Communication Ethics",definition:"The values and morals that govern interactions, considered the most important communication principle for businesses"},
  {term:"Active Listening",definition:"An ethical principle involving giving full attention to understand the speaker's message"},
  {term:"Non-Judgmental Speaking",definition:"The practice of speaking without bias or harsh criticism toward others"},
  {term:"Preferred Communication Channel",definition:"Considering the specific medium the receiver favors to ensure effective message delivery"},
  {term:"Confidentiality",definition:"An ethical requirement to respect the privacy of shared information"},
  {term:"Globalization",definition:"The process of interaction and integration among people, companies, and governments of different nations"},
  {term:"World Englishes",definition:"Widely accepted varieties of English used in different parts of the world"},
  {term:"Inner Circle",definition:"Countries like the US and UK where English is spoken as a native language"},
  {term:"Outer Circle",definition:"Countries like the Philippines and India where English is used as a second language for government or business"},
  {term:"Expanding Circle",definition:"Countries like Japan and China where English is used primarily as a foreign language for international communication"},
  {term:"Standard English",definition:"The conventional vocabulary and usage of educated speakers and writers"},
  {term:"Standard Philippine English",definition:"A variety that follows Standard American usages for spelling, punctuation, and date formatting"},
  {term:"Colloquial Usages",definition:"Informal words like \"lol,\" \"gonna,\" or \"btw\" that should be avoided in formal writing"},
  {term:"Cultural Sensitivity",definition:"Communicating in a way that is respectful of diversity"},
  {term:"Racism",definition:"A form of discrimination against person/s based on their race"},
  {term:"Bias-Free Language",definition:"Language characterized by non-discriminatory words and phrases in academic and professional settings"},
  {term:"Sexism",definition:"Prejudice and discrimination based on sex or gender"},
  {term:"Gender-Neutral Language",definition:"Words that avoid gender bias, such as using \"manufactured\" instead of \"man-made\""},
  {term:"Identity-First Language",definition:"Phrasing that identifies the disability or trait first, such as \"the blind student\""},
  {term:"Person-First Language",definition:"Phrasing that puts the person before the trait, such as \"the student, who is visually impaired\""},
  {term:"Political Correctness",definition:"Using terms like \"informal settlers\" instead of \"squatters\" to avoid social class discrimination"},
  {term:"Ageism",definition:"Discrimination based on age or the assumption that older people are less capable"},
  {term:"Public Speaking",definition:"The act and art of making a speech before a large audience"},
  {term:"Ethos",definition:"The credibility and trustworthiness of a speaker influenced by their expertise and reputation"},
  {term:"Pathos",definition:"Appealing to the emotions, values, and concerns of the audience to tailor a message"},
  {term:"Hand Gestures",definition:"The use of appropriate physical movements so a speaker is not considered rude by the audience"},
  {term:"TED Talks",definition:"Short, powerful presentations from Technology-Entertainment Design devoted to spreading ideas"},
  {term:"Content",definition:"Considered \"king\" in presentations, meaning the ideas shared must be substantial and passionate"},
  {term:"Personal Anecdotes",definition:"Stories used by speakers as effective ways to connect with an audience"}
];

let selectedTerm = null;
let time = 0;
let timerInterval;

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    document.getElementById("timer").textContent = time;
  }, 1000);
}

// Create Terms
function createTerms() {
  const termsDiv = document.getElementById("terms");
  termsDiv.innerHTML = "";

  const shuffled = shuffle([...pairs]);
  shuffled.forEach(pair => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = pair.term;

    // Use original index for matching
    const originalIndex = pairs.findIndex(p => p.term === pair.term);
    div.dataset.index = originalIndex;

    // Tap to select term
    div.addEventListener("click", () => {
      document.querySelectorAll(".item.selected").forEach(e => e.classList.remove("selected"));
      selectedTerm = div;
      div.classList.add("selected");
    });

    termsDiv.appendChild(div);
  });
}

// Create Definitions
function createDefinitions() {
  const defsDiv = document.getElementById("definitions");
  defsDiv.innerHTML = "";

  const shuffled = shuffle([...pairs]);
  shuffled.forEach(pair => {
    const dz = document.createElement("div");
    dz.className = "dropzone";
    dz.textContent = pair.definition;

    // Use original index for matching
    const originalIndex = pairs.findIndex(p => p.definition === pair.definition);
    dz.dataset.correct = originalIndex;

    // Tap to place selected term into definition
    dz.addEventListener("click", () => {
      if (!selectedTerm) return;

      // If dropzone already has an item, return it to terms
      const existing = dz.querySelector(".item");
      if (existing) {
        document.getElementById("terms").appendChild(existing);
      }

      dz.appendChild(selectedTerm);
      selectedTerm.classList.remove("selected");
      selectedTerm = null;

      checkSingle(dz);
      updateScore();
      checkWin();
    });

    // Double-click to remove answer from definition
    dz.addEventListener("dblclick", () => {
      const item = dz.querySelector(".item");
      if (!item) return;

      document.getElementById("terms").appendChild(item);
      dz.classList.remove("correct", "incorrect");
      document.getElementById("winMessage").style.display = "none";
      updateScore();
    });

    defsDiv.appendChild(dz);
  });
}

// Check a single dropzone for correctness
function checkSingle(dz) {
  const item = dz.querySelector(".item");
  if (!item) return;

  if (item.dataset.index == dz.dataset.correct) {
    dz.classList.add("correct");
    dz.classList.remove("incorrect");
  } else {
    dz.classList.add("incorrect");
    dz.classList.remove("correct");
  }
}

// Update score display
function updateScore() {
  let score = 0;
  document.querySelectorAll(".dropzone").forEach(dz => {
    if (dz.classList.contains("correct")) score++;
  });
  document.getElementById("score").textContent = score;
}

// Check if user has matched all correctly
function checkWin() {
  const dropzones = document.querySelectorAll(".dropzone");
  let correct = 0;
  let filled = 0;

  dropzones.forEach(dz => {
    const item = dz.querySelector(".item");
    if (item) {
      filled++;
      if (item.dataset.index == dz.dataset.correct) correct++;
    }
  });

  if (filled === dropzones.length && correct === dropzones.length) {
    launchConfetti();
    document.getElementById("winMessage").style.display = "block";
  }
}

// Confetti animation on perfect score
function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Reset game state and UI
function resetGame() {
  clearInterval(timerInterval);
  time = 0;
  selectedTerm = null;

  document.getElementById("timer").textContent = 0;
  document.getElementById("score").textContent = 0;
  document.getElementById("winMessage").style.display = "none";

  init();
}

// Initialize game: create terms, definitions and start timer
function init() {
  createTerms();
  createDefinitions();
  startTimer();
}

init();