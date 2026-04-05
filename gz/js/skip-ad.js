// 等待广告页面加载完成
setTimeout(() => {
  let skipBtn = document.querySelector('.skip-btn, .ad-close, [class*=skip]');
  if (skipBtn) skipBtn.click();
}, 500);
