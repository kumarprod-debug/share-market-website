// ✅ Replace this with your API key from https://newsdata.io/register
const apiKey = "YOUR_NEWSDATA_API_KEY";
const newsContainer = document.getElementById("news-container");

async function loadNews() {
  try {
    const res = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&country=in&language=en`);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const articles = data.results
        .slice(0, 10) // show top 10 headlines
        .map(article => `
          <article class="news-card" style="background:white; padding:15px; border-radius:10px; margin-bottom:15px; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
            <h3><a href="${article.link}" target="_blank" style="text-decoration:none; color:#0a66c2;">${article.title}</a></h3>
            <p>${article.description || "No description available."}</p>
            <p style="font-size:0.9em; color:gray;">${new Date(article.pubDate).toLocaleString()}</p>
          </article>
        `)
        .join("");
      newsContainer.innerHTML = articles;
    } else {
      newsContainer.innerHTML = "<p>No news available at the moment.</p>";
    }
  } catch (err) {
    console.error(err);
    newsContainer.innerHTML = `<p style="color:red;">⚠️ Error loading news. Try refreshing the page later.</p>`;
  }
}

loadNews();
