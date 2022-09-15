const selectTag = document.querySelectorAll("select");
const TBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeBtn = document.querySelector(".exchange");
const iconsBtn = document.querySelectorAll(".icons > i");

let text = window.localStorage.getItem("text");
if (text) fromText.value = text;

selectTag.forEach((i, idx) => {
  for (const country_code in countries) {
    let selected = "";
    if (idx == 0 && country_code == "en-GB") selected = "selected";
    else if (idx == 1 && country_code == "hi-IN") selected = "selected";
    let opt = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    i.insertAdjacentHTML("beforeend", opt);
  }
});

exchangeBtn.addEventListener("click", () => {
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;

  let tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

TBtn.addEventListener("click", () => {
  let text = fromText.value;
  window.localStorage.setItem("text", text);
  let transFrom = selectTag[0].value;
  let transTo = selectTag[1].value;
  if (text) {
    toText.setAttribute("placeholder", "Translating...");
  } else {
    toText.value = "Empty text";
    return;
  }
  //   mymemory api
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${transFrom}|${transTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
      console.log(apiUrl);
    });
});

function talkToMe(lang, text) {
  var msg = new SpeechSynthesisUtterance();
  console.log(lang);
  msg.lang = lang;
  msg.rate = 1;
  msg.text = text;
  window.speechSynthesis.speak(msg);
}

iconsBtn.forEach((item) => {
  item.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      if (target.id == "from") {
        talkToMe(selectTag[0].value, fromText.value);
      } else {
        talkToMe(selectTag[1].value, toText.value);
      }
    }
  });
});
