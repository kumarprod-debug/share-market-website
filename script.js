const apiKey = "a34Acd6cb5msh33789bb5ade5caap1567b5jsn15a169906934";
const proxyUrl = "https://api.allorigins.win/raw?url=";
const defaultStocks = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS"];
const stockCards = document.getElementById("stockCards");

async function fetchStock(symbol) {
  const url = `${proxyUrl}https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}&region=IN`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    },
  };
  const res = await fetch(url, options);
  return res.json();
}

async function loadStocks() {
  stockCards.innerHTML = "";
  for (let stock of defaultStocks) {
    const data = await fetchStock(stock);
    const name = data.price?.shortName || stock;
    const price = data.price?.regularMarketPrice?.raw || "N/A";
    const change = data.price?.regularMarketChangePercent?.fmt || "0%";
    const color = change.startsWith("-") ? "text-red-500" : "text-green-600";

    stockCards.innerHTML += `
      <div class="card">
        <h3 class="text-lg font-bold">${name}</h3>
        <p class="text-2xl font-semibold text-green-700">₹${price}</p>
        <p class="${color}">${change}</p>
        <p class="text-sm text-gray-500">${stock}</p>
      </div>`;
  }
}

loadStocks();

// Chart placeholder
const ctx = document.getElementById("stockChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "Stock Movement (Sample Data)",
      data: [110, 115, 112, 118, 120],
      borderWidth: 2,
      borderColor: "#2563eb",
      fill: false
    }]
  },
  options: { responsive: true }
});
