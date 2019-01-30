// Why this file?

// Jest framework runs inside the console,
// and the console doesn’t have access to the window object (only browsers have it).
// That’s why Jest uses a library called JSDom to mock the window object.
// I assume that JSDom doesn’t contain the implementation of the requestAnimationFrame method yet,
// so Jest throws up the following warning:
// React depends on requestAnimationFrame.
// Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills

// When facebook fixes this issue, this file can be removed.

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};