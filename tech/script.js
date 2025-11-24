/* Shared interactions for all pages: nav toggle, year update, simple form handling, class filter */

document.addEventListener('DOMContentLoaded', () => {
  // NAV toggle (supports multiple header navs)
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click', () => {
      const parent = btn.closest('.header-inner');
      const nav = parent.querySelector('.main-nav');
      nav.classList.toggle('open');
    });
  });

  // Auto-year in footers (each page uses different IDs)
  const years = [
    'year','yearAlt','yearClasses','yearTrainers','yearContact'
  ];
  const y = new Date().getFullYear();
  years.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // Contact form (basic client-side validation + message)
  const formFull = document.getElementById('contactFormFull');
  if(formFull){
    formFull.addEventListener('submit', e=>{
      e.preventDefault();
      const name = formFull.querySelector('[name=name]').value.trim();
      const email = formFull.querySelector('[name=email]').value.trim();
      if(!name || !email){
        showFormMsg('Please enter name and a valid email.', true);
        return;
      }
      // Simulate success (replace with real submit)
      showFormMsg('Thanks! We received your request — we will contact you soon.', false);
      formFull.reset();
    });
  }

  function showFormMsg(msg, isError){
    const el = document.getElementById('formMsg');
    if(!el) return;
    el.textContent = msg;
    el.style.color = isError ? '#e11d48' : '';
    setTimeout(()=>{ el.textContent = ''; }, 6000);
  }

  // Classes filter (classes.html)
  const filter = document.getElementById('classFilter');
  const classesGrid = document.getElementById('classesGrid');
  if(filter && classesGrid){
    filter.addEventListener('change', ()=>{
      const val = filter.value;
      const items = classesGrid.querySelectorAll('.class-item');
      items.forEach(it=>{
        if(val === 'all' || it.dataset.type === val) it.style.display = '';
        else it.style.display = 'none';
      });
    });
  }

  // Progressive image loading (optional: images already from picsum)
  document.querySelectorAll('img').forEach(img=>{
    img.loading = 'lazy';
  });
});
