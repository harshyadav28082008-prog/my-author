/* =========================================
   THE ROYAL SUMMIT
   Nine royal records
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("kingModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    const kingCards = document.querySelectorAll(
        ".king-card[data-king]"
    );

    const closeButtons = document.querySelectorAll(
        "[data-close-modal]"
    );

    let previousFocus = null;

    /*
       Royal records remain sealed until their
       individual character profiles are ready.
    */

    const royalRecords = {

        arctavian: {
            name: "ARCTAVIAN VALEFYRA",
            nation: "RED NATION"
        },

        solarius: {
            name: "SOLARIUS AURELLION",
            nation: "ORANGE NATION"
        },

        aurelius: {
            name: "AURELIUS SOLARIN",
            nation: "YELLOW NATION"
        },

        thalan: {
            name: "THALAN VERDANTHALE",
            nation: "GREEN NATION"
        },

        marcellus: {
            name: "MARCELLUS AZURION",
            nation: "BLUE NATION"
        },

        valearion: {
            name: "VALEARION AMETHYRIAN",
            nation: "VIOLET NATION"
        },

        vorian: {
            name: "VORIAN NOCTIVANE",
            nation: "INDIGO NATION"
        },

        ravencourt: {
            name: "RAVENCOURT UMBROSYNE",
            nation: "BLACK NATION"
        }

    };

    /*
       OPEN A SEALED ROYAL RECORD
    */

    function openModal(kingKey, trigger) {

        const record = royalRecords[kingKey];

        if (!record || !modal) {
            return;
        }

        previousFocus = trigger || document.activeElement;

        modalTitle.textContent = record.name;

        modalMessage.textContent =
            "Kings were made to stand in the light. " +
            "You will find no darkness in " +
            record.name.split(" ")[0] +
            " here—only a truth that has not yet " +
            "been revealed.";

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const closeButton = modal.querySelector(
            ".modal-close"
        );

        if (closeButton) {
            closeButton.focus();
        }
    }

    /*
       CLOSE THE MODAL
    */

    function closeModal() {

        if (
            !modal ||
            !modal.classList.contains("is-open")
        ) {
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }

        previousFocus = null;
    }

    /*
       CONNECT THE EIGHT SEALED CARDS
    */

    kingCards.forEach((card) => {

        card.addEventListener("click", () => {

            const kingKey = card.dataset.king;

            openModal(kingKey, card);

        });

    });

    /*
       CLOSE BUTTON AND BACKDROP
    */

    closeButtons.forEach((button) => {

        button.addEventListener("click", closeModal);

    });

    /*
       ESCAPE KEY
    */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }

    });

});