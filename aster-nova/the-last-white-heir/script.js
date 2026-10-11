const realmMessages = {
characters:
"The character archive remains sealed for now. We will build its own page next.",

map:
    "The world map is waiting to be charted. Its dedicated page comes later.",

locations:
    "The gates to the Academy and Royal Library will open when we build the location archive.",

artifacts:
    "Some secrets are still hidden. The artifacts and lore archive will be built separately.",

underworld:
    "Beyond the known world lies a realm veiled in darkness. Its secrets are not ready to be revealed.",

game:
    "The time has not yet come. When the destined hour arrives, the gates to the Unwritten Realm shall open."

};

const notice = document.getElementById("realm-notice");
let noticeTimeout;

document.querySelectorAll("[data-realm]").forEach((card) => {
    card.addEventListener("click", (event) => {
        event.preventDefault();

        const realm = card.dataset.realm;
        const message = realmMessages[realm];

        if (!message || !notice) return;

        notice.textContent = message;
        notice.classList.add("visible");

        clearTimeout(noticeTimeout);

        noticeTimeout = setTimeout(() => {
            notice.classList.remove("visible");
        }, 3500);
    });
});
