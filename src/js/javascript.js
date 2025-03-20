// Lazy loading للصور
document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
const customIcon = L.icon({
    iconUrl: 'path/to/icon.png',
    iconSize: [25, 41], // حجم الأيقونة
    iconAnchor: [12, 41], // نقطة تثبيت الأيقونة
});

const marker = L.marker([country.countryInfo.lat, country.countryInfo.long], { icon: customIcon }).addTo(map);