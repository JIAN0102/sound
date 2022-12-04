export function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.round(time - minutes * 60 || 0);

  return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
}

export function isMobile() {
  return !!window.navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}
