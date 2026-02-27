// Presentation Controller
class PresentationController {
  constructor() {
    this.slides = [];
    this.currentSlide = 0;
    this.container = document.getElementById('slides-container');
    this.currentSlideEl = document.getElementById('current-slide');
    this.totalSlidesEl = document.getElementById('total-slides');
    this.progressFill = document.getElementById('progress-fill');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    
    this.init();
  }
  
  async init() {
    await this.loadSlides();
    this.setupEventListeners();
    this.render();
  }
  
  async loadSlides() {
    try {
      const response = await fetch('/api/slides');
      this.slides = await response.json();
      this.totalSlidesEl.textContent = this.slides.length;
      this.updateProgress();
    } catch (error) {
      console.error('Failed to load slides:', error);
      this.slides = this.getFallbackSlides();
      this.totalSlidesEl.textContent = this.slides.length;
      this.updateProgress();
    }
  }
  
  getFallbackSlides() {
    return [
      {
        type: 'title',
        title: '双报告展示',
        subtitle: 'OpenClaw 数字员工报告 & AI 芯片行业报告',
        footer: '2026 年 2 月'
      }
    ];
  }
  
  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      }
    });
    
    // Button clicks
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
    
    this.handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        this.next();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        this.prev();
      }
    };
  }
  
  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.render();
    }
  }
  
  next() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
      this.render();
    }
  }
  
  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide = index;
      this.render();
    }
  }
  
  updateProgress() {
    const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
    this.progressFill.style.width = `${progress}%`;
    this.currentSlideEl.textContent = this.currentSlide + 1;
    
    // Update button states
    this.prevBtn.disabled = this.currentSlide === 0;
    this.nextBtn.disabled = this.currentSlide === this.slides.length - 1;
  }
  
  render() {
    this.container.innerHTML = '';
    
    this.slides.forEach((slide, index) => {
      const slideEl = this.createSlideElement(slide, index);
      this.container.appendChild(slideEl);
    });
    
    this.updateProgress();
  }
  
  createSlideElement(slide, index) {
    const slideEl = document.createElement('div');
    slideEl.className = `slide slide-${slide.type}`;
    
    if (index === this.currentSlide) {
      slideEl.classList.add('active');
    } else if (index < this.currentSlide) {
      slideEl.classList.add('prev');
    }
    
    switch (slide.type) {
      case 'title':
        slideEl.innerHTML = `
          <h1>${slide.title}</h1>
          <div class="subtitle">${slide.subtitle}</div>
          <div class="footer">${slide.footer}</div>
        `;
        break;
        
      case 'section':
        slideEl.innerHTML = `
          <div class="section-number">${slide.title.split(' ')[1]}</div>
          <h2>${slide.title}</h2>
          <div class="subtitle">${slide.subtitle}</div>
          <div class="icon">${slide.icon}</div>
        `;
        break;
        
      case 'content':
        let contentHtml = `<h2>${slide.title}</h2>`;
        
        if (slide.columns) {
          contentHtml += `<div class="columns-container">`;
          slide.columns.forEach(col => {
            contentHtml += `
              <div class="column">
                <h3>${col.title}</h3>
                <ul>
                  ${col.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            `;
          });
          contentHtml += `</div>`;
        } else if (slide.points) {
          contentHtml += `
            <ul class="points">
              ${slide.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
          `;
        }
        
        if (slide.highlight) {
          contentHtml += `<div class="highlight">${slide.highlight}</div>`;
        }
        
        slideEl.innerHTML = contentHtml;
        break;
    }
    
    return slideEl;
  }
}

// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PresentationController();
});
