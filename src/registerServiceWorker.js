/* ServwceWorker register */
export default function register() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function() {
      console.log('Registration Worked! ');
  })
  .catch(function (err) {
    console.log('Registration Failed!', err);
  });
  } else {
    console.log('Service worker is not supported in this browser');
  }
}
