'use strict';

const script = document.createElement('script');
script.setAttribute("type", "module");
  console.log(chrome);
script.setAttribute("src", chrome.runtime.getURL('src/index.mjs'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);
