// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6366f1'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Global State
let allModels = [];
let filteredModels = [];
let selectedOrg = 'all';
let selectedType = 'all';

// Language Toggle
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const langText = document.getElementById('langText');
    
    // Update language display
    function updateLangDisplay() {
        const currentLang = i18n.getCurrentLanguage();
        langText.textContent = currentLang === 'zh-CN' ? '中文' : 'English';
    }
    
    // Toggle language
    langToggle.addEventListener('click', () => {
        const currentLang = i18n.getCurrentLanguage();
        const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
        i18n.setLanguage(newLang);
        updateLangDisplay();
    });
    
    // Initialize language display
    updateLangDisplay();
    i18n.updatePageContent();
});

// Listen for language changes to update dynamic content
window.addEventListener('languageChanged', (e) => {
    updateModelCount();
    createFilterButtons();
    renderModels();
});

// Fetch and Initialize
async function init() {
    try {
        const response = await fetch('models.json');
        allModels = await response.json();
        
        // Sort by date (newest first)
        allModels.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        filteredModels = [...allModels];
        
        createFilterButtons();
        renderModels();
        updateModelCount();
        
        // Setup search
        document.getElementById('searchInput').addEventListener('input', handleSearch);
        
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Create Filter Buttons
function createFilterButtons() {
    // Extract unique organizations
    const orgs = ['all', ...new Set(allModels.map(m => m.org))];
    const orgFilters = document.getElementById('orgFilters');
    orgFilters.innerHTML = ''; // Clear existing buttons
    
    orgs.forEach(org => {
        const button = createFilterButton(org, org === 'all' ? i18n.t('filter.all') : org, 'org');
        orgFilters.appendChild(button);
    });
    
    // Extract unique types
    const types = ['all', ...new Set(allModels.flatMap(m => m.tags))];
    const typeFilters = document.getElementById('typeFilters');
    typeFilters.innerHTML = ''; // Clear existing buttons
    
    types.forEach(type => {
        const displayName = {
            'all': i18n.t('filter.all'),
            'LLM': i18n.t('filter.llm'),
            'Multimodal': i18n.t('filter.multimodal'),
            'Vision': i18n.t('filter.vision'),
            'Speech': i18n.t('filter.speech')
        }[type] || type;
        
        const button = createFilterButton(type, displayName, 'type');
        typeFilters.appendChild(button);
    });
}

// Create Filter Button
function createFilterButton(value, label, filterType) {
    const button = document.createElement('button');
    button.className = 'px-4 py-2 rounded-lg font-medium transition-all hover:scale-105';
    button.textContent = label;
    button.dataset.value = value;
    button.dataset.filterType = filterType;
    
    updateButtonStyle(button, value === 'all');
    
    button.addEventListener('click', () => {
        if (filterType === 'org') {
            selectedOrg = value;
            document.querySelectorAll('[data-filter-type="org"]').forEach(btn => {
                updateButtonStyle(btn, btn.dataset.value === value);
            });
        } else {
            selectedType = value;
            document.querySelectorAll('[data-filter-type="type"]').forEach(btn => {
                updateButtonStyle(btn, btn.dataset.value === value);
            });
        }
        
        applyFilters();
    });
    
    return button;
}

// Update Button Style
function updateButtonStyle(button, isActive) {
    if (isActive) {
        button.className = 'px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 bg-primary text-white shadow-lg shadow-primary/50';
    } else {
        button.className = 'px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600';
    }
}

// Apply Filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredModels = allModels.filter(model => {
        const matchesOrg = selectedOrg === 'all' || model.org === selectedOrg;
        const matchesType = selectedType === 'all' || model.tags.includes(selectedType);
        const matchesSearch = !searchTerm || 
            model.name.toLowerCase().includes(searchTerm) ||
            model.org.toLowerCase().includes(searchTerm) ||
            model.description.toLowerCase().includes(searchTerm);
        
        return matchesOrg && matchesType && matchesSearch;
    });
    
    renderModels();
    updateModelCount();
}

// Handle Search
function handleSearch(e) {
    applyFilters();
}

// Update Model Count
function updateModelCount() {
    const countElement = document.getElementById('modelCount');
    countElement.textContent = i18n.t('view.count', {
        current: filteredModels.length,
        total: allModels.length
    });
}

// Render Models
function renderModels() {
    const timelineContainer = document.getElementById('timeline');
    const gridContainer = document.getElementById('grid');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredModels.length === 0) {
        timelineContainer.innerHTML = '';
        gridContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Render Timeline View
    timelineContainer.innerHTML = filteredModels.map((model, index) => {
        const isLeft = index % 2 === 0;
        return createTimelineCard(model, isLeft, index);
    }).join('');
    
    // Render Grid View
    gridContainer.innerHTML = filteredModels.map((model, index) => {
        return createGridCard(model, index);
    }).join('');
    
    // Reinitialize AOS for new elements
    AOS.refresh();
}

// Create Timeline Card
function createTimelineCard(model, isLeft, index) {
    const date = new Date(model.date);
    const locale = i18n.getCurrentLanguage() === 'zh-CN' ? 'zh-CN' : 'en-US';
    const formattedDate = date.toLocaleDateString(locale, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const tags = model.tags.map(tag => {
        const colors = {
            'LLM': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
            'Multimodal': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
            'Vision': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
            'Speech': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
        };
        return `<span class="px-2 py-1 rounded text-xs font-medium ${colors[tag] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}">${tag}</span>`;
    }).join('');
    
    return `
        <div class="timeline-item mb-12 flex ${isLeft ? 'flex-row' : 'flex-row-reverse'}" data-aos="fade-${isLeft ? 'right' : 'left'}" data-aos-delay="${index * 50}">
            <!-- Timeline Line -->
            <div class="flex flex-col items-center mx-8">
                <div class="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/50 animate-pulse"></div>
                <div class="w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
            </div>
            
            <!-- Content Card -->
            <div class="flex-1 max-w-xl">
                <div class="timeline-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group">
                    <div class="flex items-start justify-between mb-3">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                                ${model.name}
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">${model.org}</p>
                        </div>
                        <span class="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 font-mono">
                            ${formattedDate}
                        </span>
                    </div>
                    
                    <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        ${model.description}
                    </p>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex gap-2 flex-wrap">
                            ${tags}
                        </div>
                        <a href="${model.repo}" target="_blank" 
                           class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            ${i18n.t('model.repo')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create Grid Card
function createGridCard(model, index) {
    const date = new Date(model.date);
    const locale = i18n.getCurrentLanguage() === 'zh-CN' ? 'zh-CN' : 'en-US';
    const formattedDate = date.toLocaleDateString(locale, { 
        year: 'numeric', 
        month: 'short',
        day: 'numeric' 
    });
    
    const tags = model.tags.map(tag => {
        const colors = {
            'LLM': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
            'Multimodal': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
            'Vision': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
            'Speech': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
        };
        return `<span class="px-2 py-1 rounded text-xs font-medium ${colors[tag] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}">${tag}</span>`;
    }).join('');
    
    return `
        <div class="grid-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group" 
             data-aos="fade-up" 
             data-aos-delay="${index * 50}">
            <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    ${model.name}
                </h3>
                <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400 font-mono whitespace-nowrap">
                    ${formattedDate}
                </span>
            </div>
            
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">${model.org}</p>
            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                ${model.description}
            </p>
            
            <div class="flex gap-2 flex-wrap mb-4">
                ${tags}
            </div>
            
            <a href="${model.repo}" target="_blank" 
               class="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                ${i18n.t('model.github')}
            </a>
        </div>
    `;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
