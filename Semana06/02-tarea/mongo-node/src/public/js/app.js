document.querySelectorAll('form[data-confirm]').forEach(form => { form.addEventListener('submit', event => { if (!window.confirm(form.dataset.confirm)) event.preventDefault(); }); });
document.querySelectorAll('.post-image').forEach(img => { img.addEventListener('error', () => { img.hidden = true; }); });
