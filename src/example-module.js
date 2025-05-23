// Example of using MiVue as an ES module
import MiVue from '../dist/mivue.esm.js';

// Initialize your app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new MiVue({
    el: '#app',
    data: {
      message: 'Hello from ES Module import!',
      count: 0
    },
    methods: {
      increment() {
        this.count++;
      }
    }
  });
  
  // You can also access the app instance programmatically
  console.log('App initialized with message:', app.message);
  
  // Or add global event listeners
  document.getElementById('external-button')?.addEventListener('click', () => {
    app.count += 10;
    console.log('Count updated externally to:', app.count);
  });
}); 