export const setupAnimations = () => {
  // Tab switching with animation
  const tabs = document.querySelectorAll('nav button');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => {
        t.classList.remove('active-tab');
        t.style.transform = 'scale(1)';
      });
      
      // Add active class to clicked tab with animation
      this.classList.add('active-tab');
      this.style.transform = 'scale(1.05)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
    });
  });
  
  // Animate progress bars on load
  setTimeout(() => {
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = '75%';
    
    // Animate all progress bars
    document.querySelectorAll('.animate-progress').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }, 300);
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.card-hover');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Notification bell animation
  const bell = document.querySelector('.fa-bell');
  if (bell) {
    setInterval(() => {
      bell.classList.add('animate-shake');
      setTimeout(() => {
        bell.classList.remove('animate-shake');
      }, 500);
    }, 10000);
  }
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('button, a');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });
};