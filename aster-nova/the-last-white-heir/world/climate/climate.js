const months = [
  "Dawnrise",
  "Suncrest",
  "Greensky",
  "Bloomfall",
  "Emberlight",
  "Highsun",
  "Heatfall",
  "Mistrise",
  "Stormcall",
  "Frostwane",
  "Deepsnow",
  "Nightend"
];

const climates = [
  {
    id: "white",
    name: "White Nation",
    symbol: "❄",
    summary: "Cold Island Kingdom",
    description:
      "Latitude ~40°, cold ocean currents, snowy winters",
    months: [
      "Cold winds, light snow",
      "Cloudy, icy rain begins",
      "First melt, foggy seas",
      "Cool, windy, rainfall increases",
      "Mild days, cold nights, clear skies",
      "Cool summer; storms from eastern sea",
      "Sea mist thickens; temperature holds steady",
      "Early frost returns",
      "Violent sea storms",
      "Heavy snowfall",
      "Deep winter, blizzards",
      "Harsh winds, frozen seas"
    ]
  },
  {
    id: "blue",
    name: "Blue Nation",
    symbol: "●",
    summary: "Lower Jaw Coast · Wet & Rainy",
    description:
      "Temperate, maritime, rainfall all year",
    months: [
      "Cool mornings, steady rain",
      "Mild temperatures, constant drizzle",
      "Heavy river flow, waterfalls strongest",
      "Warm rainfall, dense clouds",
      "Clearer skies, sea breeze pleasant",
      "Humid storms from the south",
      "Warmest month; sea winds strong",
      "Rain returns with mist",
      "Coastal cyclones but moderate",
      "Cool evenings, soft rain",
      "Cold rain, never snow",
      "Fog cycles dominate mornings"
    ]
  },
  {
    id: "indigo",
    name: "Indigo Nation",
    symbol: "✦",
    summary: "Upper Jaw Highlands",
    description:
      "Cold highlands, fog & wind",
    months: [
      "Light snow on peaks",
      "Melting begins in valleys",
      "Mountain fog all month",
      "Windy but sunny",
      "Cold dry winds",
      "Warmest month; peaks remain cold",
      "Afternoon mountain storms",
      "Winds strengthen, temperatures drop",
      "Sudden storms, lightning",
      "Early snowfall",
      "Mountain freeze, avalanches possible",
      "Ice fog dominates"
    ]
  },
  {
    id: "red",
    name: "Red Nation",
    symbol: "◆",
    summary: "Hot Desert",
    description:
      "Scorching, dry, sandstorms",
    months: [
      "Cold desert nights, warm days",
      "Heat rises sharply",
      "Dust storms begin",
      "Slight humidity; rare desert flowers",
      "Temperature spikes",
      "Hottest month; deadly heat",
      "Lightning storms (dry thunder)",
      "Heat eases slightly",
      "Rare rainfall; violent when it comes",
      "Warm days, cold nights",
      "Coldest desert period (still mild)",
      "Strong desert winds"
    ]
  },
  {
    id: "yellow",
    name: "Yellow Nation",
    symbol: "✧",
    summary: "Oasis Basin",
    description:
      "Semi-arid, gentle heat, seasonal blooms",
    months: [
      "Cool, fresh mornings",
      "Warmth increases",
      "Oasis water peaks",
      "Flowering season; ideal climate",
      "Warm, manageable temperatures",
      "Hot but bearable; shaded areas thrive",
      "Occasional storms",
      "Cooling begins",
      "Rainfall feeds oases",
      "Cold nights",
      "Mild winter, misty mornings",
      "Clear skies, pleasant days"
    ]
  },
  {
    id: "orange",
    name: "Orange Nation",
    symbol: "▲",
    summary: "Canyonland",
    description:
      "Warm steppe, high winds, thunderstorms",
    months: [
      "Crisp mornings, windy afternoons",
      "Stable, warm",
      "River canyons full",
      "Canyon blooms",
      "Warm winds, dry air",
      "Hot, dust-filled storms",
      "Violent thunderstorms",
      "Windy season starts",
      "Lightning storms common",
      "Cool evenings",
      "Light snowfall in higher canyons",
      "Strong canyon winds"
    ]
  },
  {
    id: "black",
    name: "Black Nation",
    symbol: "⬟",
    summary: "Volcanic Tropical Land",
    description:
      "Humid, warm, ash rains",
    months: [
      "Warm, light rain",
      "Humidity increases",
      "Growing season begins",
      "Continuous rainfall",
      "Warm storms, volcanic ash drifts",
      "Hot, humid, active lava vents",
      "Occasional major eruptions",
      "Cooling breezes",
      "Typhoon-like rains",
      "Mild, constant mist",
      "No snow; cooler tropical climate",
      "Warm nights, ash-laden winds"
    ]
  },
  {
    id: "violet",
    name: "Violet Nation",
    symbol: "◈",
    summary: "Misty Highlands & Coast",
    description:
      "Cool, misty, stable climate",
    months: [
      "Light mist",
      "Cool, steady weather",
      "Forest bloom begins",
      "Ideal climate, mild sunshine",
      "Pleasant temperatures",
      "Warm breezes",
      "Afternoon storms",
      "Cold mist returns",
      "Mountain fog, lightning",
      "Light snow at high elevations",
      "Cold and foggy",
      "Calm, misty mornings"
    ]
  },
  {
    id: "green",
    name: "Green Nation",
    symbol: "❋",
    summary: "Great Forest Continent",
    description:
      "Tropical + subtropical forest, rainfall all year",
    months: [
      "Morning rain",
      "Hot, humid",
      "Forest canopy thickens",
      "Peak growth season",
      "Thunderstorms daily",
      "Very hot, heavy rain",
      "Stormy, rivers overflow",
      "Moist but cooler",
      "Cyclone season",
      "Warm rain",
      "No snow; warm, gentle rains",
      null
    ]
  }
];

const nationGrid = document.getElementById("nationGrid");
const nationSelection = document.getElementById("nationSelection");
const climateDetails = document.getElementById("climateDetails");

const detailRegion = document.getElementById("detailRegion");
const detailName = document.getElementById("detailName");
const detailDescription = document.getElementById("detailDescription");
const monthGrid = document.getElementById("monthGrid");

const backToNations = document.getElementById("backToNations");
const backToNationsBottom =
  document.getElementById("backToNationsBottom");

function buildNationGrid() {
  climates.forEach((nation, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "nation-card";
    button.dataset.nation = nation.id;

    const number = document.createElement("span");
    number.className = "nation-index";
    number.textContent = `NATION ${String(index + 1).padStart(2, "0")}`;

    const symbol = document.createElement("span");
    symbol.className = "nation-symbol";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = nation.symbol;

    const name = document.createElement("h3");
    name.textContent = nation.name;

    const summary = document.createElement("p");
    summary.className = "nation-climate";
    summary.textContent = nation.summary;

    const link = document.createElement("span");
    link.className = "open-climate";
    link.textContent = "View Monthly Climate ↗";

    button.append(number, symbol, name, summary, link);

    button.addEventListener("click", () => {
      openClimate(nation);
    });

    nationGrid.appendChild(button);
  });
}

function openClimate(nation) {
  climateDetails.style.setProperty(
    "--nation-color",
    getNationColor(nation.id)
  );

  detailRegion.textContent = nation.summary;
  detailName.textContent = nation.name;
  detailDescription.textContent = nation.description;

  monthGrid.replaceChildren();

  months.forEach((month, index) => {
    const card = document.createElement("article");
    card.className = "month-card";

    const number = document.createElement("span");
    number.className = "month-number";
    number.textContent =
      `MONTH ${String(index + 1).padStart(2, "0")}`;

    const heading = document.createElement("h3");
    heading.textContent = month;

    const description = document.createElement("p");

    if (nation.months[index]) {
      description.textContent = nation.months[index];
    } else {
      card.classList.add("unspecified");
      description.textContent =
        "Climate description not provided yet.";
    }

    card.append(number, heading, description);
    monthGrid.appendChild(card);
  });

  nationSelection.hidden = true;
  climateDetails.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function getNationColor(id) {
  const colors = {
    white: "#e5eaf4",
    blue: "#579de0",
    indigo: "#8581df",
    red: "#d34c45",
    yellow: "#e4c75d",
    orange: "#e9944a",
    black: "#aaa19b",
    violet: "#ad78d2",
    green: "#70ad73"
  };

  return colors[id] || "#a9c8ef";
}

function showAllNations() {
  climateDetails.hidden = true;
  nationSelection.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

backToNations.addEventListener("click", showAllNations);
backToNationsBottom.addEventListener("click", showAllNations);

buildNationGrid();