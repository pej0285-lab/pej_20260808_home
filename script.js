const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    siteNav.addEventListener('click', (event) => {
        if (event.target.matches('a')) {
            siteNav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', '메뉴 열기');
        }
    });
}

const filterButtons = document.querySelectorAll('.filter-chip');
const materialCards = document.querySelectorAll('.material-card');
const materialSearch = document.querySelector('.material-search');
let activeFilter = 'all';

const updateMaterialCards = () => {
    const query = materialSearch ? materialSearch.value.trim().toLowerCase() : '';

    materialCards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        const title = (card.dataset.title || card.textContent).toLowerCase();
        const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
        const matchesSearch = !query || title.includes(query) || card.textContent.toLowerCase().includes(query);

        card.classList.toggle('is-hidden', !matchesFilter || !matchesSearch);
    });
};

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        updateMaterialCards();
    });
});

if (materialSearch) {
    materialSearch.addEventListener('input', updateMaterialCards);
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

revealItems.forEach((item) => observer.observe(item));