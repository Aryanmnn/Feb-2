// ---------- Screen navigation ----------
const screens = {
  propose: document.getElementById("screen-propose"),
  valentine: document.getElementById("screen-valentine"),
  gifts: document.getElementById("screen-gifts"),
  letter: document.getElementById("screen-letter"),
  memories: document.getElementById("screen-memories"),
  quiz: document.getElementById("screen-quiz"),
  final: document.getElementById("screen-final"),
};

function go(name){
  Object.values(screens).forEach(s => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

document.querySelectorAll("[data-go]").forEach(btn=>{
  btn.addEventListener("click", ()=> go(btn.dataset.go));
});

// ---------- No button dodge ----------
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const btnRow = document.getElementById("btnRow");

let noCount = 0;
const noTexts = ["NO", "Think again 😭", "Are you sure 😡?", "See This 😤", "Okay last chance 😳"];

function moveNo(){
  const rect = btnRow.getBoundingClientRect();

  // move within the button row area
  const maxX = rect.width - noBtn.offsetWidth;
  const maxY = 80; // small vertical movement looks cute

  const x = Math.max(0, Math.random()*maxX);
  const y = (Math.random()*maxY) - (maxY/2);

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  noCount++;
  noBtn.textContent = noTexts[Math.min(noCount, noTexts.length-1)];
}

// on hover + on click, it dodges
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  moveNo();
});

// YES goes to valentine
yesBtn.addEventListener("click", ()=> go("valentine"));

// ---------- Gift opens ----------
document.querySelectorAll("[data-open]").forEach(btn=>{
  btn.addEventListener("click", ()=> go(btn.dataset.open));
});

// ---------- Quiz ----------
const quiz = [
  {
    q: "Who is the absolute 'Boss' in this relationship 😏?",
    options: ["Obviously You", "Me", "My Mom"],
    correct: 0,
    wrong: "Ohoo, please try again 😌"
  },
  {
    q: "What fights a lot in this relationship 😳?",
    options: ["Always You", "No One", "Me"],
    correct: 1,
    wrong: "Nope 😝 (hint: we are cute not fighters)"
  },
  {
    q: "Where do I plan to spend the rest of my life 😚?",
    options: ["Paris", "In Your Heart", "On Mars"],
    correct: 1,
    wrong: "Wrong answer 😭 try again"
  }
];

let qi = 0;
const qText = document.getElementById("qText");
const answers = document.getElementById("answers");
const hint = document.getElementById("hint");

function renderQuiz(){
  const item = quiz[qi];
  qText.textContent = item.q;
  hint.textContent = "";
  answers.innerHTML = "";

  item.options.forEach((opt, idx)=>{
    const b = document.createElement("button");
    b.className = "ans";
    b.textContent = opt;
    b.addEventListener("click", ()=>{
      if(idx === item.correct){
        qi++;
        if(qi >= quiz.length){
          qText.textContent = "Yay! You passed the test! 🥺💞";
          answers.innerHTML = "";
          hint.textContent = "";
        }else{
          renderQuiz();
        }
      }else{
        hint.textContent = item.wrong;
      }
    });
    answers.appendChild(b);
  });
}

document.querySelector('[data-open="quiz"]')?.addEventListener("click", ()=>{
  qi = 0;
  renderQuiz();
});

// if user reaches quiz from other route
document.querySelectorAll('[data-go="quiz"]').forEach(b=>{
  b.addEventListener("click", ()=>{
    qi=0; renderQuiz();
  });
});