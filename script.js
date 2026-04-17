document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchButton");
  const input = document.getElementById("searchInput");
  const result = document.getElementById("results");
  const errorMessage = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");
  const placeholderImage =
    "https://via.placeholder.com/400x400?text=No+Image";

  function setError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }

  function setStatus(message) {
    if (statusMessage) {
      statusMessage.textContent = message;
    }
  }

  function clearError() {
    setError("");
  }

  function clearStatus() {
    setStatus("");
  }

  if (!searchBtn || !input || !result) {
    return;
  }

  searchBtn.addEventListener("click", () => {
    const player = input.value.trim();

    if (!player) {
      result.innerHTML = "";
      clearStatus();
      setError("Enter a player name.");
      return;
    }

    fetchPlayer(player);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });

  async function fetchPlayer(name) {
    result.innerHTML = "";
    clearError();
    setStatus(`Searching for "${name}"...`);
    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(
          name
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch player data.");
      }

      const data = await response.json();
      const players = (data.player || []).filter(
        (player) => player.strSport === "Soccer"
      );

      if (players.length === 0) {
        result.innerHTML = "";
        clearStatus();
        setError("No football players found.");
        return;
      }

      displayPlayers(players);
      setStatus(`${players.length} player${players.length === 1 ? "" : "s"} found.`);
    } catch (error) {
      result.innerHTML = "";
      clearStatus();
      setError(error.message || "Something went wrong.");
    } finally {
      searchBtn.disabled = false;
      searchBtn.textContent = "Search";
    }
  }

  function displayPlayers(players) {
    result.innerHTML = "";

    players.forEach((player) => {
      const card = document.createElement("div");
      card.className = "player-card";

      const imageSrc = player.strThumb || placeholderImage;

      card.innerHTML = `
        <img src="${imageSrc}" alt="${player.strPlayer || "Player"}">
        <h3>${player.strPlayer || "Unknown Player"}</h3>
        <p>Team: ${player.strTeam || "N/A"}</p>
        <p>Position: ${player.strPosition || "N/A"}</p>
        <p>Nationality: ${player.strNationality || "N/A"}</p>
        <p>Date of Birth: ${formatDate(player.dateBorn)}</p>
      `;

      result.appendChild(card);
    });
  }

  function formatDate(dateString) {
    if (!dateString) {
      return "N/A";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
});
