
const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 1. ПЕРЕХОД К ПИСЬМАМ
document.getElementById("yesBtn").addEventListener("click", () => {
  showScreen("apology");
});

// 2. УБЕГАЮЩИЕ КНОПКИ «НЕТ»
function makeButtonRun(button) {
  if (!button) return;

  function runAway() {
    const maxX = Math.max(0, window.innerWidth - button.offsetWidth - 20);
    const maxY = Math.max(0, window.innerHeight - button.offsetHeight - 20);

    button.style.position = "fixed";
    button.style.zIndex = "1000";
    button.style.left = Math.random() * maxX + "px";
    button.style.top = Math.random() * maxY + "px";
  }

  button.addEventListener("pointerenter", runAway);
  button.addEventListener("touchstart", event => {
    event.preventDefault();
    runAway();
  }, { passive: false });
}

makeButtonRun(document.getElementById("noBtn"));
makeButtonRun(document.getElementById("dateNoBtn"));

// 3. ТЕКСТЫ ТРЁХ ПИСЕМ
const messages = [
  `Кызым, прости меня, пожалуйста. Я понимаю, что иногда был эгоистичным, пытался всё контролировать и решать за тебя. Я хотел защитить тебя, но теперь понимаю: забота не означает, что я должен решать всё вместо тебя. Мне жаль, что я причинял тебе боль.

Я понимаю, что мои намерения не отменяют того, что ты чувствовала. Я не хочу оправдывать свои поступки или делать вид, что ничего не произошло. Я хочу признать свои ошибки и научиться относиться к тебе так, как ты заслуживаешь.`,

  `Я хочу научиться слушать тебя, уважать твои чувства и твои решения. Ты заслуживаешь любви, доверия и спокойствия рядом со мной. Я не хочу ограничивать тебя или заставлять поступать так, как удобно мне. Мне важно, чтобы рядом со мной ты могла оставаться собой, свободно говорить о своих чувствах и знать, что твоё мнение действительно важно.

Я понимаю, что одних обещаний недостаточно. Я хочу работать над собой, быть терпеливее, внимательнее и показывать своими поступками, что я действительно меняюсь.`,

  `Ты очень дорога мне, Кызым. Я ценю наши моменты, наши воспоминания и всё хорошее, что между нами было. Мне жаль, что своими действиями я мог заставить тебя сомневаться во мне и в наших отношениях.

Я не прошу тебя забыть всё, что произошло, или простить меня сразу. Ты имеешь право чувствовать то, что чувствуешь, и принимать собственные решения. Я лишь надеюсь, что однажды смогу поступками показать, что способен стать лучше.

Я хочу, чтобы между нами были доверие, уважение, понимание и искренность. Если ты дашь мне шанс, я постараюсь беречь его и не воспринимать твоё доверие как должное.

Спасибо, что прочитала мои слова до конца. Я искренне хочу всё исправить и стать человеком, рядом с которым тебе будет хорошо и спокойно.

Прости меня, Кызым. Ты очень дорога мне. 💙`
];

messages.forEach((message, index) => {
  document.getElementById(`message${index}`).textContent = message;
});

// 4. ПЕРЕВОРОТ ФОТОГРАФИЙ
const cards = [...document.querySelectorAll(".photo-card")];
const readBtn = document.getElementById("readBtn");
const photoHint = document.getElementById("photoHint");
const decision = document.getElementById("decision");

let currentCard = null;

cards.forEach(card => {
  card.addEventListener("click", () => {
    if (card.classList.contains("read")) return;

    if (currentCard === card && card.classList.contains("flipped")) {
      card.classList.remove("flipped", "selected");
      currentCard = null;
      readBtn.hidden = true;
      photoHint.textContent =
        "Нажми на фотографию, чтобы снова прочитать письмо.";
      return;
    }

    cards.forEach(item => {
      item.classList.remove("flipped", "selected");
    });

    currentCard = card;
    card.classList.add("selected", "flipped");
    readBtn.hidden = false;
    photoHint.textContent =
      "Прочитай письмо на обратной стороне фотографии 💙";
  });
});

// 5. ПОСЛЕ ПРОЧТЕНИЯ ПИСЬМО УБИРАЕТСЯ
readBtn.addEventListener("click", () => {
  if (!currentCard) return;

  currentCard.classList.add("read");
  currentCard.classList.remove("flipped", "selected");
  currentCard.disabled = true;
  currentCard = null;
  readBtn.hidden = true;

  const unreadCards = cards.filter(
    card => !card.classList.contains("read")
  );

  if (unreadCards.length === 0) {
    photoHint.hidden = true;
    decision.hidden = false;
  } else {
    photoHint.hidden = false;
    photoHint.textContent =
      `Осталось прочитать писем: ${unreadCards.length} 💌`;
  }
});

// 6. ВТОРОЙ ШАНС
const notForgiveBtn = document.getElementById("notForgiveBtn");
const forgiveBtn = document.getElementById("forgiveBtn");
let choiceAnimationStarted = false;

notForgiveBtn.addEventListener("click", () => {
  if (choiceAnimationStarted) return;

  choiceAnimationStarted = true;
  decision.classList.add("choosing");
  notForgiveBtn.disabled = true;

  const message = document.getElementById("decisionMessage");
  message.textContent =
    "Я очень надеюсь, что ты дашь нам шанс 💙";
  message.hidden = false;
});

notForgiveBtn.addEventListener("animationend", event => {
  if (event.animationName === "rejectShrink") {
    notForgiveBtn.hidden = true;
  }
});

forgiveBtn.addEventListener("animationend", event => {
  if (
    event.animationName !== "forgiveGrow" &&
    event.animationName !== "forgiveGrowMobile"
  ) return;

  forgiveBtn.style.transform =
    window.innerWidth <= 700 ? "scale(1.16)" : "scale(1.42)";
});

forgiveBtn.addEventListener("click", () => {
  showScreen("invitation");
});

// 7. ПРИГЛАШЕНИЕ
document.getElementById("dateYesBtn").addEventListener("click", () => {
  showScreen("datePage");
});

// КНОПКИ «НАЗАД»
document.querySelectorAll(".back-btn").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.back);
  });
});

// 8. КАЛЕНДАРЬ НОЯБРЯ 2026
const dateInput = document.getElementById("date");
const dateError = document.getElementById("dateError");
const calendarDays = document.getElementById("calendarDays");
const calendarMonth = document.getElementById("calendarMonth");
const calendarYear = document.getElementById("calendarYear");
const selectedDateText = document.getElementById("selectedDateText");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const monthNamesGenitive = [
  "января", "февраля", "марта", "апреля",
  "мая", "июня", "июля", "августа",
  "сентября", "октября", "ноября", "декабря"
];

let calendarViewYear = 2026;
let calendarViewMonth = 10; // Ноябрь

function renderCalendar() {
  calendarMonth.textContent = monthNames[calendarViewMonth];
  calendarYear.textContent = calendarViewYear;
  calendarDays.replaceChildren();

  const firstDay = new Date(
    calendarViewYear, calendarViewMonth, 1
  );

  // Понедельник — первый день недели
  const offset = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(
    calendarViewYear, calendarViewMonth + 1, 0
  ).getDate();

  for (let i = 0; i < offset; i++) {
    const empty = document.createElement("span");
    empty.className = "calendar-day empty";
    empty.setAttribute("aria-hidden", "true");
    calendarDays.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.textContent = day;

    const dateString =
      `${calendarViewYear}-${String(calendarViewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    button.setAttribute(
      "aria-label",
      `${day} ${monthNamesGenitive[calendarViewMonth]} ${calendarViewYear}`
    );

    const isAllowed =
      calendarViewYear === 2026 && calendarViewMonth === 10;

    button.disabled = !isAllowed;

    const weekday = new Date(
      calendarViewYear, calendarViewMonth, day
    ).getDay();

    if (weekday === 0 || weekday === 6) {
      button.classList.add("weekend");
    }

    if (dateInput.value === dateString) {
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }

    button.addEventListener("click", () => {
      if (!isAllowed) return;

      dateInput.value = dateString;
      dateError.hidden = true;

      selectedDateText.textContent =
        `${day} ${monthNamesGenitive[calendarViewMonth]} ${calendarViewYear} 💙`;

      renderCalendar();
    });

    calendarDays.appendChild(button);
  }

  // Для свидания доступен только ноябрь 2026 года
  prevMonthBtn.disabled = true;
  nextMonthBtn.disabled = true;
}

prevMonthBtn.addEventListener("click", () => {
  if (calendarViewMonth === 0) {
    calendarViewMonth = 11;
    calendarViewYear--;
  } else {
    calendarViewMonth--;
  }

  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  if (calendarViewMonth === 11) {
    calendarViewMonth = 0;
    calendarViewYear++;
  } else {
    calendarViewMonth++;
  }

  renderCalendar();
});

renderCalendar();

// ПЕРЕХОД ОТ ДАТЫ КО ВРЕМЕНИ
document.getElementById("dateNextBtn").addEventListener("click", () => {
  if (!dateInput.value) {
    dateError.textContent =
      "Выбери день в календаре — пусть это будет наш особенный день 💙";
    dateError.hidden = false;
    return;
  }

  dateError.hidden = true;
  showScreen("timePage");
});

// 9. ВЫБОР ВРЕМЕНИ
const timeInput = document.getElementById("time");

document.getElementById("timeNextBtn").addEventListener("click", () => {
  if (!timeInput.value) {
    alert("Выбери время нашей встречи 💙");
    return;
  }

  showScreen("placePage");
});

// 10. ВЫБОР МЕСТА
const placeError = document.getElementById("placeError");

document.getElementById("placeNextBtn").addEventListener("click", () => {
  const places = [
    ...document.querySelectorAll('input[name="place"]:checked')
  ];

  if (places.length === 0) {
    placeError.textContent = "Выбери хотя бы одно место 💙";
    placeError.hidden = false;
    return;
  }

  placeError.hidden = true;
  showScreen("drinkPage");
});

// 11. ВЫБОР НАПИТКОВ И ФИНАЛ
const drinkError = document.getElementById("drinkError");

document.getElementById("confirmBtn").addEventListener("click", () => {
  const date = dateInput.value;
  const time = timeInput.value;

  const places = [
    ...document.querySelectorAll('input[name="place"]:checked')
  ].map(item => item.value);

  const drinks = [
    ...document.querySelectorAll('input[name="drink"]:checked')
  ].map(item => item.value);

  if (drinks.length === 0) {
    drinkError.textContent = "Выбери, что будем пить 🥤";
    drinkError.hidden = false;
    return;
  }

  drinkError.hidden = true;

  const [year, month, day] = date.split("-").map(Number);
  const formattedDate =
    `${day} ${monthNamesGenitive[month - 1]} ${year}`;

  const summary = document.getElementById("summary");
  summary.replaceChildren();

  const details = [
    ["📅 Дата:", formattedDate],
    ["🕒 Время:", time],
    ["📍 Место:", places.join(", ")],
    ["🥤 Напитки:", drinks.join(", ")]
  ];

  details.forEach(([label, value]) => {
    const line = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = label + " ";
    line.append(strong, document.createTextNode(value));
    summary.appendChild(line);
  });

  showScreen("final-screen");
});
