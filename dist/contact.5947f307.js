const e=document.getElementById("newsContainer");(async function t(){try{e.innerHTML="<p>Loading news...</p>";let t=await fetch("https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=8cf220f2e3f548b78aa38afc2f12b039");if(!t.ok)throw Error(`HTTP error! Status: ${t.status}`);let n=await t.json();!function(t){if(!t||0===t.length){e.innerHTML="<p>No news articles found.</p>";return}e.innerHTML=t.slice(0,12).map(e=>`
            <div class="news-article">
                <img src="${e.urlToImage||"https://via.placeholder.com/300"}" alt="News Image">
                <div class="news-content">
                    <h3><a href="${e.url}" target="_blank">${e.title||"No title available"}</a></h3>
                    <p>${e.description?e.description.substring(0,80)+"...":"No description available."}</p>
                    <p><strong>Source:</strong> ${e.source.name||"Unknown"} | <strong>Date:</strong> ${new Date(e.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `).join("")}(n.articles)}catch(t){e.innerHTML=`<p class="error">Error fetching news: ${t.message}</p>`}})(),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".menu-icon"),t=document.querySelector(".nav-links");e.addEventListener("click",()=>{t.classList.toggle("active")}),document.addEventListener("click",e=>{e.target.closest("nav")||t.classList.remove("active")});let n=document.getElementById("contactForm");n.addEventListener("submit",e=>{e.preventDefault();let t=document.createElement("div");t.className="success-message",t.textContent="Thank you for contacting us! We will get back to you soon.",document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3),n.reset()}),document.querySelectorAll(".germ").forEach(e=>{e.addEventListener("click",function(){this.style.animation="germFloat 0.5s ease-out",setTimeout(()=>this.remove(),500)})})});
//# sourceMappingURL=contact.5947f307.js.map
