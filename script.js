const apiKey = "a344cd6cb5msh33789bb5ade5caap1567b5jsn15a169906934";
const stocks = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"];

async function fetchStockData() {
  const container = document.getElementById("stock-container");
  container.innerHTML = "<p>Loading data...</p>";

  const promises = stocks.map(async (symbol) => {
    const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/financial-data`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    const price = data.financialData.currentPrice.fmt;
    const name = symbol.replace(".NS", "");

    return `
      <div class="stock-card">
        <h3>${name}</h3>
        <p><strong>Price:</strong> ₹${price}</p>
        <p><strong>Exchange:</strong> NSE</p>
      </div>
    `;
  });

  const results = await Promise.all(promises);
  container.innerHTML = results.join("");
}

fetchStockData();
