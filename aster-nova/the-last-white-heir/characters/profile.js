
const profileRecords = {
  caelis: {
    eyebrow: "THE WHITE THRONE",
    public: [
      ["Date of birth", "01/01/xx08"],
      ["Age", "15"],
      ["Nation", "White Nation"],
      ["Hobbies", "Learning magic, reading books, and travelling under a false name."],
      ["Personality", "Calm, composed, and observant."],
      ["Abilities", "Master of All"],
      ["Family", "Has two younger siblings."],
      ["Maternal lineage", "Directly related to the Indigo Nation royal family. His mother was the younger sister of its king."],
      ["Personal note", "Prefers spending time in the city among his people rather than remaining in the palace behind a desk."]
    ],
    restricted: "An unusual ability is recorded under this name. Its true nature and origin remain sealed.",
    volume: "VOLUME I"
  },

  kaelis: {
    eyebrow: "THE HIDDEN SHADOW",
    public: [
      ["Date of birth", "25/02/xx08"],
      ["Age", "15"],
      ["Nation", "White Nation"],
      ["Title / role", "Subordinate to Caelis; works as his spy."],
      ["Hobbies", "Finding new ways to be useful to Caelis and decorating the royal palace garden."],
      ["Ability", "Master of Disguise"],
      ["Connection", "Close childhood friend of Caelis."],
      ["Personality", "Cheerful."],
      ["Other details", "A noble who calls Caelis “Elis.” Her family identity is not publicly known."]
    ],
    restricted: "The origin of this skill is classified. The record does not disclose its source.",
    volume: "VOLUME I"
  },

  thalen: {
    eyebrow: "THE KING'S GUARD",
    public: [
      ["Date of birth", "30/07/xx03"],
      ["Age", "20"],
      ["Nation", "White Nation"],
      ["Title / role", "Bodyguard of Caelis."],
      ["Hobbies", "Sword-fighting with Kaelis and Eryx."],
      ["Abilities", "Masterful in both magic and swordsmanship."],
      ["Connection", "Caelis personally asked him to become his guard."],
      ["Personality", "Muscle-brain."],
      ["Other details", "A commoner with no royal or noble connections."]
    ],
    volume: "VOLUME I"
  },

  eryx: {
    eyebrow: "THE ARGENT MARSHAL",
    public: [
      ["Date of birth", "08/06/xx04"],
      ["Age", "18"],
      ["Nation", "White Nation"],
      ["Title / role", "Commander of all forces in the White Nation."],
      ["Hobbies", "Spending time training new soldiers."],
      ["Abilities", "Exceptionally strong in swordsmanship and White magic."],
      ["Connection", "A noble of the White Nation and son of the previous commander-in-chief."],
      ["Personality", "Calm, composed, and a strong leader."],
      ["Other details", "Calls Caelis “Cael” and is a top student at Aetherion Concord Academy."]
    ],
    volume: "VOLUME I"
  },

  merchant: {
    eyebrow: "AN UNIDENTIFIED FIGURE",
    public: [
      ["Title", "Merchant of Death"],
      ["Role", "Information trader."],
      ["Known background", "Raised in an orphanage alongside other orphans who later became influential names in the underworld."]
    ],
    restricted: "Further records are unavailable. Identity and background remain unconfirmed.",
    volume: "VOLUME I"
  }
};

const volumeTwoRecords = {
  kid: {
    public: [
      ["Role", "Assistant of the Merchant of Death"],
      ["Nation", "White Nation"]
    ]
  },
  serine: {
    public: [
      ["Role", "Servant in the White Nation"],
      ["Connection", "Blue — Broken Connection"]
    ]
  },
  selwyn: {
    public: [
      ["Role", "Advisor"],
      ["Nation", "White Nation"]
    ]
  },
  thalena: {
    public: [
      ["Role", "Princess of the Blue Nation"],
      ["Nation", "Blue Nation"]
    ]
  },
  lythor: {
    public: [
      ["Role", "Prince of the Indigo Nation"],
      ["Nation", "Indigo Nation"]
    ]
  }
};

const nationThemes = {
  "nation-white": "theme-white",
  "nation-blue": "theme-blue",
  "nation-indigo": "theme-indigo",
  "nation-mystery": "theme-mystery",
  "nation-impure": "theme-impure",
  "nation-broken": "theme-broken"
};

function addDetail(container, label, value) {
  const item = document.createElement("article");
  item.className = "detail-item";

  const heading = document.createElement("h2");
  heading.className = "detail-label";
  heading.textContent = label;

  const content = document.createElement("p");
  content.className = "detail-value";
  content.textContent = value;

  item.append(heading, content);
  container.appendChild(item);
}

function addLockedDetail(container, label) {
  const item = document.createElement("article");
  item.className = "detail-item detail-locked";

  const heading = document.createElement("h2");
  heading.className = "detail-label";
  heading.textContent = label;

  const content = document.createElement("p");
  content.className = "detail-value";

  const lock = document.createElement("span");
  lock.className = "lock-mark";
  lock.textContent = "◇";

  content.append(lock, document.createTextNode(" CLASSIFIED"));
  item.append(heading, content);
  container.appendChild(item);
}

function showRestricted(message) {
  const panel = document.getElementById("profileRestricted");
  document.getElementById("restrictedText").textContent = message;
  panel.hidden = false;
}

function renderProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("character");

  const character = (window.characterData || []).find(
    item => item.id === id
  );

  const main = document.getElementById("profileMain");
  const details = document.getElementById("profileDetails");

  if (!character) {
    document.getElementById("profileName").textContent = "Record Not Found";
    document.getElementById("profileRole").textContent =
      "This character record could not be located.";
    return;
  }

  const record = profileRecords[id];
  const lockedRecord = volumeTwoRecords[id];

  const theme = nationThemes[character.nationClass] || "theme-mystery";
  main.classList.add(theme);

  document.title = `${character.name} | The Last White Heir`;

  document.getElementById("profileName").textContent = character.name;
  document.getElementById("profileRole").textContent = character.role || "";
  document.getElementById("profileNation").textContent =
    character.nation || "UNCONFIRMED";

  document.getElementById("profileVolume").textContent =
    record?.volume || `VOLUME ${character.volume || "?"}`;

  document.getElementById("profileEyebrow").textContent =
    record?.eyebrow || "SEALED CHARACTER RECORD";

  const image = document.getElementById("profileImage");
  const fallback = document.getElementById("artFallback");

  if (character.image) {
    image.src = character.image;
    image.alt = `Artwork of ${character.name}`;
    image.addEventListener("error", () => {
      image.hidden = true;
      fallback.hidden = false;
      fallback.textContent = character.name;
    }, { once: true });
  } else {
    image.hidden = true;
    fallback.hidden = false;
    fallback.textContent = "DESIGN SEALED";
  }

  const publicDetails = record?.public || lockedRecord?.public || [];

  publicDetails.forEach(([label, value]) => {
    addDetail(details, label, value);
  });

  if (lockedRecord) {
    [
      "Date of birth",
      "Age",
      "Hobbies",
      "Abilities",
      "Relationships",
      "Personality",
      "Personal history"
    ].forEach(label => addLockedDetail(details, label));

    showRestricted("Additional information is sealed until its authorized reveal.");
  } else if (record?.restricted) {
    showRestricted(record.restricted);
  }

  if (!record && !lockedRecord) {
    addDetail(details, "Record status", character.status || "Unconfirmed");
  }
}

document.addEventListener("DOMContentLoaded", renderProfile);
