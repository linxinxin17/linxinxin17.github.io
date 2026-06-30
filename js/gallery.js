/**
 * Gallery Filtering Logic
 * Handles filtering of gallery items based on data-category attributes.
 * Supports multiple selections.
 */

// Store active filters
let activeFilters = new Set(['all']);

function filterGallery(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    
    // Update active filters logic
    if (category === 'all') {
        // If 'all' is clicked, clear everything else and select 'all'
        activeFilters.clear();
        activeFilters.add('all');
    } else {
        // If a specific category is clicked
        
        // If 'all' was previously active, remove it
        if (activeFilters.has('all')) {
            activeFilters.delete('all');
        }
        
        // Toggle the clicked category
        if (activeFilters.has(category)) {
            activeFilters.delete(category);
        } else {
            activeFilters.add(category);
        }
        
        // If no categories are left selected, revert to 'all'
        if (activeFilters.size === 0) {
            activeFilters.add('all');
        }
    }
    
    // Update Buttons UI
    buttons.forEach(btn => {
        // We need to identify which category this button represents.
        // We parse the onclick attribute: onclick="filterGallery('category')"
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/'([^']+)'/);
            if (match) {
                const btnCategory = match[1];
                if (activeFilters.has(btnCategory)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        }
    });

    // Filter Items
    items.forEach(item => {
        const itemCategories = item.dataset.category.split(',').map(c => c.trim());
        
        // Show item if 'all' is active OR if ANY of the item's categories are in the active set
        const shouldShow = activeFilters.has('all') || itemCategories.some(cat => activeFilters.has(cat));
        
        if (shouldShow) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
