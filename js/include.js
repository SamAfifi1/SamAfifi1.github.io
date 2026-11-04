// Loads shared HTML snippets into any element with a data-include attribute.
// Paths in data-include are relative to the site root, so they are the same on every page.
(function () {
  // Site root = the folder that contains /js/ (works on username.github.io and on project sites)
  var root = new URL('../', document.currentScript.src).href;

  document.querySelectorAll('[data-include]').forEach(function (el) {
    fetch(root + el.getAttribute('data-include'))
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (html) {
        // {{root}} in the snippet becomes the site root, so links work from any folder
        el.outerHTML = html.replace(/\{\{root\}\}/g, root);
      })
      .catch(function (err) {
        console.error('Could not load ' + el.getAttribute('data-include') + ':', err);
      });
  });
})();