const chapterList = document.getElementById("chapter-list");
const chapterReader = document.getElementById("chapter-reader");

const chapterNumber = document.getElementById("chapter-number");
const chapterTitle = document.getElementById("chapter-title");
const chapterContent = document.getElementById("chapter-content");

const previousButton = document.getElementById("previous-chapter");
const nextButton = document.getElementById("next-chapter");
const backButton = document.getElementById("back-to-chapters");

let currentChapter = 0;


/* =========================
   CREATE CHAPTER LIST
========================= */

function createChapterList() {

    chapterList.innerHTML = "";

    chapters.forEach((chapter, index) => {

        const button = document.createElement("button");

        button.className = "chapter-card";

        button.innerHTML = `
            <span class="chapter-index">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <span class="chapter-name">
                ${chapter.title}
            </span>

            <span class="chapter-arrow">
                →
            </span>
        `;

        button.addEventListener("click", () => {
            openChapter(index);
        });

        chapterList.appendChild(button);
    });
}


/* =========================
   OPEN CHAPTER
========================= */

function openChapter(index) {

    if (index < 0 || index >= chapters.length) {
        return;
    }

    currentChapter = index;

    const chapter = chapters[index];

    chapterNumber.textContent =
        `CHAPTER ${String(index + 1).padStart(2, "0")}`;

    chapterTitle.textContent = chapter.title;

    chapterContent.innerHTML = chapter.content
        .trim()
        .split("\n\n")
        .map(paragraph => `<p>${paragraph}</p>`)
        .join("");

    chapterList.style.display = "none";
    chapterReader.style.display = "block";

    updateNavigation();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   NAVIGATION
========================= */

function updateNavigation() {

    previousButton.disabled = currentChapter === 0;

    nextButton.disabled =
        currentChapter === chapters.length - 1;
}


previousButton.addEventListener("click", () => {

    if (currentChapter > 0) {
        openChapter(currentChapter - 1);
    }

});


nextButton.addEventListener("click", () => {

    if (currentChapter < chapters.length - 1) {
        openChapter(currentChapter + 1);
    }

});


/* =========================
   BACK TO CHAPTER LIST
========================= */

backButton.addEventListener("click", () => {

    chapterReader.style.display = "none";
    chapterList.style.display = "flex";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   START
========================= */

chapterReader.style.display = "none";

createChapterList();