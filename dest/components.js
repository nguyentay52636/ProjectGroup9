export function handleLoadingAndHide() {
    function handleLoading(percent) {
      let progress = document.querySelector('.loading__inner-progress');
      let textPercent = document.querySelector('.loading__percent');
      progress.style.width = `${percent}%`;
      textPercent.innerText = `${percent}%`;
    }
  
    function hideLoading() {
      const loading = document.querySelector('.loading');
      const body = document.querySelector('body');
      loading.classList.add('--is-loaded');
      body.classList.remove('--disable-scroll');
    }
  
    function initLoading() {
      let loadedCount = 0;
      let imgs = document.querySelectorAll('img').length;
      let body = document.querySelector('body');
  
      let imgLoad = imagesLoaded(body);
  
      imgLoad.on('progress', (instance) => {
        loadedCount++;
        let percent = Math.floor((loadedCount / imgs) * 100);
        handleLoading(percent);
      });
  
      imgLoad.on('always', (instance) => {
        console.log('always');
      });
  
      imgLoad.on('done', (instance) => {
        console.log('done');
        hideLoading();
        // handleCarousel();
      });
  
      imgLoad.on('fail', function (instance) {
        console.log('fail');
      });
    }
  
    initLoading();
  }
  