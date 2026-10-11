document.addEventListener("DOMContentLoaded", () => {
const sealedCards = document.querySelectorAll(".sealed-card");

if (!sealedCards.length) return;

// Create the message overlay
const overlay = document.createElement("div");
overlay.className = "sealed-message-overlay";

overlay.innerHTML = `
<div class="sealed-message-box" role="dialog"
aria-modal="true" aria-labelledby="sealed-message-title">

  <div class="message-symbol" aria-hidden="true">◇</div>

  <p class="message-eyebrow">ARCHIVE RESTRICTION</p>

  <h2 id="sealed-message-title">Record Sealed</h2>

  <p class="message-description"></p>

  <span class="message-status">ACCESS DENIED</span>

  <button type="button" class="message-close">
    Close Record
  </button>
</div>

`;

document.body.appendChild(overlay);

const description = overlay.querySelector(".message-description");
const closeButton = overlay.querySelector(".message-close");

let previousFocus = null;

const messages = {
"Book of Watcher": {
title: "Knowledge Restricted",
text: "The record you seek is not available at this point in the archive. Its contents will remain sealed until the appropriate time."
},

"Old Diary": {
  title: "The Time Has Not Come",
  text: "This record remains closed. The identity behind these pages and the knowledge they contain have not yet been made available."
}

};

function openMessage(card) {
const heading = card.querySelector("h3");
const artifactName = heading
? heading.textContent.trim()
: "";

const message = messages[artifactName];

if (!message) return;

previousFocus = document.activeElement;

overlay.querySelector("#sealed-message-title").textContent =
  message.title;

description.textContent = message.text;

overlay.classList.add("is-visible");
document.body.classList.add("message-open");

closeButton.focus();

}

function closeMessage() {
overlay.classList.remove("is-visible");
document.body.classList.remove("message-open");

if (previousFocus && typeof previousFocus.focus === "function") {
  previousFocus.focus();
}

}

sealedCards.forEach((card) => {
card.setAttribute("role", "button");
card.setAttribute("tabindex", "0");
card.setAttribute("aria-haspopup", "dialog");

card.addEventListener("click", () => {
  openMessage(card);
});

card.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openMessage(card);
  }
});

});

closeButton.addEventListener("click", closeMessage);

overlay.addEventListener("click", (event) => {
if (event.target === overlay) {
closeMessage();
}
});

document.addEventListener("keydown", (event) => {
if (
event.key === "Escape" &&
overlay.classList.contains("is-visible")
) {
closeMessage();
}
});
});