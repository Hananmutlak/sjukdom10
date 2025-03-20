const apiKey = '8cf220f2e3f548b78aa38afc2f12b039';
const newsContainer = document.getElementById('newsContainer');

async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${apiKey}`;

    try {
        newsContainer.innerHTML = `<p>Loading news...</p>`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        newsContainer.innerHTML = `<p class="error">Error fetching news: ${error.message}</p>`;
    }
}

function displayNews(articles) {
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = "<p>No news articles found.</p>";
        return;
    }

    newsContainer.innerHTML = articles
        .slice(0, 12) // عرض 12 مقالة
        .map(article => `
            <div class="news-article">
                <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
                <div class="news-content">
                    <h3><a href="${article.url}" target="_blank">${article.title || "No title available"}</a></h3>
                    <p>${article.description ? article.description.substring(0, 80) + '...' : "No description available."}</p>
                    <p><strong>Source:</strong> ${article.source.name || "Unknown"} | <strong>Date:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');
}

// تحميل الأخبار عند فتح الصفحة
fetchNews();
document.addEventListener('DOMContentLoaded', () => {
    // إدارة القائمة على الجوال
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
        }
    });

    // إدارة نموذج التواصل
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 3000);

        contactForm.reset();
    });

    // إزالة الجراثيم عند النقر عليها
    document.querySelectorAll('.germ').forEach(germ => {
        germ.addEventListener('click', function() {
            this.style.animation = 'germFloat 0.5s ease-out';
            setTimeout(() => this.remove(), 500);
        });
    });
});