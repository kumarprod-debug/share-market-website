// ✅ Replace with your RapidAPI Key
const apiKey = "a34Acd6cb5msh33789bb5ade5caap1567b5jsn15a169906934";

// ✅ Use alternate CORS proxy (more reliable for GitHub Pages)
const proxyUrl = "https://api.allorigins.win/raw?url=";

// ✅ Default stock list to show at start
const defaultStocks = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"];

// Function to fetch stock data
async function fetchStockData(symbols) {
  const container = document.getElementById("stock-container");
  container.innerHTML = "<p>Loading data...</p>";

  try {
    const promises = symbols.map(async (symbol) => {
      const url = `${proxyUrl}https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/financial-data`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      const name = symbol.replace(".NS", "");
      const price = data?.financialData?.currentPrice?.fmt || "N/A";
      const target = data?.financialData?.targetMeanPrice?.fmt || "N/A";
      const recommendation = data?.financialData?.recommendationKey || "N/A";

      return `
        <div class="stock-card">
          <h3>${name}</h3>
          <p><strong>Price:</strong> ₹${price}</p>
          <p><strong>Target:</strong> ₹${target}</p>
          <p><strong>Recommendation:</strong> ${recommendation.toUpperCase()}</p>
        </div>
      `;
    });

    const results = await Promise.all(promises);
    container.innerHTML = results.join("");
  } catch (error) {
    console.error("Error loading stock data:", error);
    container.innerHTML = `<p style="color:red;">⚠️ Unable to load stock data. Check your API key or network.</p>`;
  }
}

// ✅ Search functionality
document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("stock-input").value.trim().toUpperCase();
  if (input) {
    const symbol = input.endsWith(".NS") ? input : `${input}.NS`;
    fetchStockData([symbol]);
  } else {
    alert("Please enter a stock symbol (e.g., RELIANCE or INFY)");
  }
});

// ✅ Press Enter to search
document.getElementById("stock-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("search-btn").click();
  }
});

// ✅ Default load
fetchStockData(defaultStocks);
