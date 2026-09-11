const activeFilters = new Set(['all']);

function filterGallery(category, buttons, items) {
    if (category === 'all') {
        activeFilters.clear();
        activeFilters.add('all');
    } else {
        activeFilters.delete('all');
        if (activeFilters.has(category)) {
            activeFilters.delete(category);
        } else {
            activeFilters.add(category);
        }
        if (activeFilters.size === 0) activeFilters.add('all');
    }

    buttons.forEach((button) => {
        const active = activeFilters.has(button.dataset.filter);
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });

    items.forEach((item) => {
        const itemCategories = item.dataset.category.split(',').map((value) => value.trim());
        const shouldShow = activeFilters.has('all') || itemCategories.some((value) => activeFilters.has(value));
        item.hidden = !shouldShow;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const filterBar = document.querySelector('.filter-bar');
    if (!filterBar) return;

    const buttons = Array.from(filterBar.querySelectorAll('.filter-btn'));
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    filterBar.setAttribute('role', 'group');

    buttons.forEach((button) => {
        button.type = 'button';
        button.setAttribute('aria-pressed', String(button.classList.contains('active')));
        button.addEventListener('click', () => filterGallery(button.dataset.filter, buttons, items));
    });
});
