export default class Resources {
  constructor() {
    this.resourceCache = {};
    this.readyCallbacks = [];
  }
  
  load(data) {
    if (Array.isArray(data)) {
      data.forEach(url => {
        this.loadUrl(url);
      })
    } else {
        this.loadUrl(url)
    }
  }
  
  loadUrl(url) {
    if (this.resourceCache[url]) {
      return;
    } else {
      const img = new Image();
      
      img.addEventListener('load', () => {
        this.resourceCache[url] = img;

        if(this.isReady()) {
          this.readyCallbacks.forEach(func => func());
        }
      });
      this.resourceCache[url] = false;
      img.src = url;
    }    
  }
  
  get(url) {
    return this.resourceCache[url];
  }
  
  isReady() {
    let ready = true;
    for (let url in this.resourceCache) {
      if(this.resourceCache.hasOwnProperty(url) && !this.resourceCache[url]) {
        ready = false;
      }
    }
    return ready;
  }
  
  onReady(func) {
    this.readyCallbacks.push(func);
  }
}
