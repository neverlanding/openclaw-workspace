// 幻灯片控制器
class SlidesController {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.progressFill = document.getElementById('progressFill');
    this.pageNumber = document.getElementById('pageNumber');
    
    // 触摸相关
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;
    
    // 初始化
    this.init();
  }
  
  init() {
    // 显示第一张幻灯片
    this.showSlide(0);
    
    // 绑定事件
    this.bindEvents();
    
    // 更新进度条和页码
    this.updateProgress();
  }
  
  bindEvents() {
    // 键盘事件
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        this.next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.goToSlide(this.totalSlides - 1);
      }
    });
    
    // 滚轮事件
    let scrollTimeout;
    document.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      // 防止快速滚动
      if (scrollTimeout) return;
      
      if (e.deltaY > 0 || e.deltaX > 0) {
        this.next();
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        this.prev();
      }
      
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 100);
    }, { passive: false });
    
    // 触摸事件
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    }, { passive: true });
    
    // 点击事件（左右区域）
    document.addEventListener('click', (e) => {
      const screenWidth = window.innerWidth;
      const clickX = e.clientX;
      
      if (clickX < screenWidth * 0.3) {
        this.prev();
      } else if (clickX > screenWidth * 0.7) {
        this.next();
      }
    });
  }
  
  handleSwipe() {
    const diffX = this.touchStartX - this.touchEndX;
    const diffY = this.touchStartY - this.touchEndY;
    
    // 判断是水平滑动还是垂直滑动
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // 水平滑动
      if (Math.abs(diffX) > 50) { // 阈值
        if (diffX > 0) {
          this.next(); // 向左滑动，下一页
        } else {
          this.prev(); // 向右滑动，上一页
        }
      }
    }
  }
  
  showSlide(index) {
    // 隐藏所有幻灯片
    this.slides.forEach((slide, i) => {
      slide.classList.remove('active');
    });
    
    // 显示目标幻灯片
    this.slides[index].classList.add('active');
    this.currentIndex = index;
    
    // 更新进度条和页码
    this.updateProgress();
  }
  
  next() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.showSlide(this.currentIndex + 1);
    }
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.showSlide(this.currentIndex - 1);
    }
  }
  
  goToSlide(index) {
    if (index >= 0 && index < this.totalSlides) {
      this.showSlide(index);
    }
  }
  
  updateProgress() {
    // 更新进度条
    const progress = ((this.currentIndex + 1) / this.totalSlides) * 100;
    this.progressFill.style.width = `${progress}%`;
    
    // 更新页码
    this.pageNumber.textContent = `${this.currentIndex + 1} / ${this.totalSlides}`;
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new SlidesController();
  console.log('🎯 摩尔定律 PPT 已加载，共 10 页');
});
