
(() => {
    const restrictedSection = document.getElementById("sealed-record");

    if (!restrictedSection) {
        console.error("Royal Library: sealed-record section not found.");
        return;
    }

    let noticeShown = false;

    function returnToPreviousPage() {
        // Prefer browser history to preserve the visitor's actual route.
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback when the library page was opened directly.
            window.location.href = "../index.html";
        }
    }

    function showLibraryNotice() {
        if (noticeShown) return;
        noticeShown = true;

        document.body.style.overflow = "hidden";

        const notice = document.createElement("div");
        notice.className = "library-pop-notice";

        notice.innerHTML = `
            <div class="library-pop-panel" role="alertdialog"
                 aria-modal="true" aria-labelledby="library-pop-title">

                <div class="library-pop-symbol">◇</div>

                <p class="library-pop-label">
                    ROYAL LIBRARY · RESTRICTED
                </p>

                <h2 id="library-pop-title">Access Interrupted</h2>

                <p class="library-pop-message">
                    Casualty interrupted.
                </p>

                <p class="library-pop-alpha">
                    Alpha Wolf is here.
                </p>

                <div class="library-pop-divider"></div>

                <p class="library-pop-description">
                    The available record ends here.
                </p>

                <button class="library-pop-button" type="button">
                    Return
                </button>
            </div>
        `;

        document.body.appendChild(notice);

        notice.querySelector(".library-pop-button")
            .addEventListener("click", returnToPreviousPage);

        window.setTimeout(returnToPreviousPage, 3000);
    }

    function checkBoundary() {
        if (noticeShown) return;

        const position = restrictedSection.getBoundingClientRect();

        if (position.top < window.innerHeight * 0.8) {
            showLibraryNotice();
        }
    }

    window.addEventListener("scroll", checkBoundary, { passive: true });
    window.addEventListener("resize", checkBoundary);
    checkBoundary();
})();
