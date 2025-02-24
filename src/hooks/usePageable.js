import { useEffect } from 'react';
import Pageable from 'pageable';

export const usePageable = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const handlePrevent = (e) => e.preventDefault();

    // Store event listeners and instance in variables
    const wheelListener = (e) => handlePrevent(e);
    const touchListener = (e) => handlePrevent(e);

    try {
      const instance = new Pageable(container, {
        animation: 800,
        delay: 0,
        throttle: 50,
        orientation: 'vertical',
        pips: false,
        onFinish: () => {
          document.body.style.overflow = '';
        },
        onBeforeStart: () => {
          document.body.style.overflow = 'hidden';
        }
      });

      container.addEventListener('wheel', wheelListener, { passive: false });
      container.addEventListener('touchmove', touchListener, { passive: false });

      return () => {
        try {
          // Remove event listeners first
          container.removeEventListener('wheel', wheelListener);
          container.removeEventListener('touchmove', touchListener);
          
          // Then destroy the instance
          if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
          }
          
          // Reset styles
          if (container) {
            container.style = '';
          }
          document.body.style.overflow = '';
          
          // Clean up any remaining pageable-specific classes
          const pages = container.querySelectorAll('.pg-page');
          pages.forEach(page => {
            page.classList.remove('pg-page', 'pg-active');
          });
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      };
    } catch (error) {
      console.error('Pageable initialization error:', error);
      return () => {
        container.removeEventListener('wheel', wheelListener);
        container.removeEventListener('touchmove', touchListener);
      };
    }
  }, [containerRef]);
}; 