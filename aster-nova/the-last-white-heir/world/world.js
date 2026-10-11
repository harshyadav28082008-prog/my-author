
const nations = [
  {
    id: "red",
    name: "Red Nation",
    capital: "Ignisar",
    x: 276.9, y: 221.9,
    color: "#d34c45",
    glow: "rgba(211,76,69,0.8)",
    description: "A nation in the northwestern lands of the known world.",
    page: "nations/red.html"
  },
  {
    id: "orange",
    name: "Orange Nation",
    capital: "Aurevahn",
    x: 492.2, y: 253.1,
    color: "#e9944a",
    glow: "rgba(233,148,74,0.8)",
    description: "A northwestern nation close to the Great Ember Desert.",
    page: "nations/orange.html"
  },
  {
    id: "yellow",
    name: "Yellow Nation",
    capital: "Solmere",
    x: 200.8, y: 316.9,
    color: "#e4c75d",
    glow: "rgba(228,199,93,0.8)",
    description: "A northwestern nation whose lands lie near the Dunecrest Mountains.",
    page: "nations/yellow.html"
  },
  {
    id: "black",
    name: "Black Nation",
    capital: "Noctra",
    x: 377.6, y: 634.4,
    color: "#77716c",
    glow: "rgba(119,113,108,0.8)",
    description: "A southwestern nation near Mount Varkos and the region's waterways.",
    page: "nations/black.html"
  },
  {
    id: "violet",
    name: "Violet Nation",
    capital: "Amethyst",
    x: 535.3, y: 740.6,
    color: "#ad78d2",
    glow: "rgba(173,120,210,0.8)",
    description: "A southwestern nation bordering the wider known world.",
    page: "nations/violet.html"
  },
  {
    id: "indigo",
    name: "Indigo Nation",
    capital: "Viranthor",
    x: 865.9, y: 203.1,
    color: "#6865bc",
    glow: "rgba(104,101,188,0.8)",
    description: "A northeastern nation linked to an ancient royal lineage.",
    page: "nations/indigo.html"
  },
  {
    id: "blue",
    name: "Blue Nation",
    capital: "Aquilume",
    x: 1008.2, y: 335,
    color: "#579de0",
    glow: "rgba(87,157,224,0.8)",
    description: "A northeastern nation with its own royal house and history.",
    page: "nations/blue.html"
  },
  {
    id: "green",
    name: "Green Nation",
    capital: "Eryndale",
    x: 999.1, y: 648.8,
    color: "#70ad73",
    glow: "rgba(112,173,115,0.8)",
    description: "A nation of the southeastern continent, near the Emerald Expanse.",
    page: "nations/green.html"
  },
  {
    id: "white",
    name: "White Nation",
    capital: "Aurellion",
    x: 1267.7, y: 198.8,
    color: "#f0eee5",
    glow: "rgba(240,238,229,0.8)",
    description: "The homeland of the last White heir. Its royal bloodline and unusual place in the known world hold secrets yet to be uncovered.",
    page: "nations/white.html"
  },
  {
  id: "central-island",
  name: "Heart Isle [Central island]",
  capital: "Undisclosed",
  x: 702.1, y: 448.8,
  color: "#d8c49a",
  glow: "rgba(216,196,154,0.8)",
  description: "A mysterious island at the heart of the known world. Its secrets remain undiscovered.",
  page: "nations/central-island.html"
},
  {
    id: "forbidden-island",
    name: "Forbidden Island",
    capital: "Unknown",
    x: 1267.7, y: 446.9,
    color: "#9b5365",
    glow: "rgba(155,83,101,0.8)",
    description: "A forbidden island on the edge of the known world. The secrets it holds remain unexplored.",
    page: "nations/forbidden-island.html"
  }
];


const mapHotspots = document.getElementById("mapHotspots");
const nationPanel = document.getElementById("nationOverlay");
const nationRegion = document.getElementById("nationRegion");
const nationName = document.getElementById("nationName");
const nationCapital = document.getElementById("nationCapital");
const nationDescription = document.getElementById("nationDescription");
const exploreNation = document.getElementById("exploreNation");
const closePanel = document.getElementById("closePanel");

function selectNation(nation) {
  document.querySelectorAll(".nation-marker").forEach(marker => {
    marker.setAttribute(
      "aria-pressed",
      String(marker.dataset.nation === nation.id)
    );
  });

  nationPanel.style.setProperty("--nation-color", nation.color);
  nationPanel.style.setProperty("--nation-glow", nation.glow);

  nationRegion.textContent = "NATION DOSSIER";
  nationName.textContent = nation.name;
  nationCapital.textContent = nation.capital;
  nationDescription.textContent = nation.description;

  exploreNation.href = nation.page;
  exploreNation.setAttribute("aria-label", `Explore ${nation.name}`);

  nationPanel.classList.add("is-open");
  nationPanel.setAttribute("aria-hidden", "false");
}

function closeNationPanel() {
  nationPanel.classList.remove("is-open");
  nationPanel.setAttribute("aria-hidden", "true");

  document.querySelectorAll(".nation-marker").forEach(marker => {
    marker.setAttribute("aria-pressed", "false");
  });
}

function buildMarkers() {
  if (!mapHotspots) {
    console.error("Map hotspots container was not found.");
    return;
  }

  nations.forEach(nation => {
    const marker = document.createElement("button");

    marker.type = "button";
    marker.className = "nation-marker";
    marker.dataset.nation = nation.id;

    marker.style.setProperty("--x", `${nation.x / 1400 * 100}%`);
    marker.style.setProperty("--y", `${nation.y / 900 * 100}%`);
    marker.style.setProperty("--nation-color", nation.color);
    marker.style.setProperty("--nation-glow", nation.glow);

    marker.setAttribute("aria-label", `Open ${nation.name} details`);
    marker.setAttribute("aria-pressed", "false");
    marker.title = nation.name;

    marker.addEventListener("click", () => selectNation(nation));

    mapHotspots.appendChild(marker);
  });
}

closePanel.addEventListener("click", closeNationPanel);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeNationPanel();
  }
});

buildMarkers();
