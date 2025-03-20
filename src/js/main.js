import L from 'leaflet';
import { initMap } from './map.js';
import { renderCharts } from './charts.js';

document.addEventListener('DOMContentLoaded', () => {
    // تهيئة الخريطة والرسوم البيانية
    initMap();
    renderCharts();

    document.addEventListener('DOMContentLoaded', () => {
        const menuIcon = document.querySelector('.menu-icon');
        const navLinks = document.querySelector('.nav-links');
    
        // إدارة فتح وإغلاق القائمة
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navLinks.classList.remove('active');
            }
        });
    });
    // إدارة نموذج التواصل
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting us! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // إدارة ظهور نصائح الوقاية
    const preventionSection = document.getElementById('prevention');
    if (preventionSection) {
        const tips = document.querySelectorAll('.tip');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tips.forEach((tip, index) => {
                        setTimeout(() => {
                            tip.style.opacity = 1;
                            tip.style.animation = 'fadeInUp 1s ease-out forwards';
                        }, index * 200);
                    });
                    observer.unobserve(preventionSection);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(preventionSection);
    }

    // تكبير الصور عند النقر عليها
    document.querySelectorAll('.zoom-target').forEach(img => {
        img.addEventListener('click', function() {
            this.closest('.card-image').classList.toggle('zoomed');
        });
    });

    // إزالة الجراثيم عند النقر عليها
    document.querySelectorAll('.germ').forEach(germ => {
        germ.addEventListener('click', function() {
            this.style.animation = 'germFloat 0.5s ease-out';
            setTimeout(() => this.remove(), 500);
        });
    });
});
