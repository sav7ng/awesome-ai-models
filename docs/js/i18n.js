// i18n Translation Configuration
const translations = {
    'zh-CN': {
        // Navigation
        'nav.title': 'Awesome AI Models',
        'nav.subtitle': '开源 AI 模型时间线',
        'nav.theme': '切换主题',
        
        // Header
        'header.title': '开源 AI 模型演进',
        'header.description': '探索改变世界的开源人工智能模型，见证 AI 民主化的历程',
        
        // Search & Filters
        'search.placeholder': '🔍 搜索模型名称或组织...',
        'filter.organization': '组织',
        'filter.type': '类型',
        'filter.all': '全部',
        'filter.llm': '大语言模型',
        'filter.multimodal': '多模态',
        'filter.vision': '视觉',
        'filter.speech': '语音',
        
        // View Toggle
        'view.timeline': '📅 时间线',
        'view.grid': '📊 网格',
        'view.count': '显示 {current} / {total} 个模型',
        
        // Model Card
        'model.repo': 'Repo',
        'model.github': 'GitHub',
        
        // Empty State
        'empty.title': '未找到匹配的模型',
        
        // Footer
        'footer.tagline': 'Made with ❤️ for the Open Source AI Community',
        'footer.copyright': '© 2024 Awesome AI Models.',
        'footer.contribute': '在 GitHub 上贡献',
        
        // Language
        'lang.name': '中文',
        'lang.switch': '切换语言'
    },
    'en': {
        // Navigation
        'nav.title': 'Awesome AI Models',
        'nav.subtitle': 'Open Source AI Models Timeline',
        'nav.theme': 'Toggle Theme',
        
        // Header
        'header.title': 'Open Source AI Evolution',
        'header.description': 'Explore open source AI models that are changing the world, witness the journey of AI democratization',
        
        // Search & Filters
        'search.placeholder': '🔍 Search models or organizations...',
        'filter.organization': 'Organization',
        'filter.type': 'Type',
        'filter.all': 'All',
        'filter.llm': 'LLM',
        'filter.multimodal': 'Multimodal',
        'filter.vision': 'Vision',
        'filter.speech': 'Speech',
        
        // View Toggle
        'view.timeline': '📅 Timeline',
        'view.grid': '📊 Grid',
        'view.count': 'Showing {current} / {total} models',
        
        // Model Card
        'model.repo': 'Repo',
        'model.github': 'GitHub',
        
        // Empty State
        'empty.title': 'No matching models found',
        
        // Footer
        'footer.tagline': 'Made with ❤️ for the Open Source AI Community',
        'footer.copyright': '© 2024 Awesome AI Models.',
        'footer.contribute': 'Contribute on GitHub',
        
        // Language
        'lang.name': 'English',
        'lang.switch': 'Switch Language'
    }
};

// i18n Manager
class I18n {
    constructor() {
        this.currentLang = this.getStoredLanguage() || this.detectLanguage();
        this.translations = translations;
    }
    
    // Detect browser language
    detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('zh') ? 'zh-CN' : 'en';
    }
    
    // Get stored language preference
    getStoredLanguage() {
        return localStorage.getItem('language');
    }
    
    // Set language
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        this.updatePageContent();
    }
    
    // Get translation
    t(key, params = {}) {
        let text = this.translations[this.currentLang]?.[key] || key;
        
        // Replace placeholders
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }
    
    // Update all page content
    updatePageContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type !== 'submit') {
                element.placeholder = translation;
            } else if (element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', translation);
            } else {
                element.textContent = translation;
            }
        });
        
        // Update all elements with data-i18n-html attribute (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.t(key);
        });
        
        // Trigger custom event for dynamic content update
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { lang: this.currentLang } 
        }));
    }
    
    // Get current language
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    // Get available languages
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
}

// Initialize i18n
const i18n = new I18n();

// Export for use in other scripts
window.i18n = i18n;
