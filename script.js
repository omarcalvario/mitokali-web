(() => {
  const button = document.querySelector('.menu'), nav = document.querySelector('.nav');
  if (button && nav) {
    button.type = 'button';
    button.setAttribute('aria-controls', nav.id || 'site-navigation');
    nav.id = nav.id || 'site-navigation';
    nav.setAttribute('aria-label', 'Navegación principal');
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('.service-menu').forEach(menu => menu.setAttribute('aria-label', 'Navegación de servicios'));
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('aria-label', `${link.textContent.trim()} (abre en una nueva ventana)`);
  });
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { if (typeof window.gtag === 'function') window.gtag('event', 'click_service', { service: link.dataset.service, destination: link.href }); }));
  const pageHero = document.querySelector('.page-hero');
  if (pageHero && location.pathname.includes('/eventos/')) pageHero.style.backgroundImage = "url('../imagenes-banner/Mitokali%20Eventos.jpg')";
  const fallback = { 'mitokali_restaurante.png': 'mitokali%2520restaurante.png', 'banner_mitokali_foodtruck_.png': 'food%2520truck%2520cuadro.png', 'mitokali_industrial.png': 'thumbnail_industrial.png', 'mitokali_ejecutivo.png': 'thumbnail_logistica.png' };
  Object.entries(fallback).forEach(([missing, replacement]) => { if (pageHero?.style.backgroundImage.includes(missing)) pageHero.style.backgroundImage = `url('../downloaded_site/mitokali.com/images/tarjetas/${replacement}')`; });
  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const message = form.querySelector('.form-message');
    const required = [...form.querySelectorAll('[required]')];
    const invalid = required.filter(field => !field.value.trim());
    required.forEach(field => {
      field.toggleAttribute('aria-invalid', !field.value.trim());
      if (!field.value.trim()) field.setAttribute('aria-describedby', 'form-error');
      else field.removeAttribute('aria-describedby');
    });
    if (invalid.length) {
      message.id = 'form-error';
       message.textContent = 'Completa tu nombre y teléfono para continuar.';
      invalid[0].focus();
      return;
    }
    if (typeof window.gtag === 'function') window.gtag('event', 'form_submit', { form_id: 'contacto', service: form.service.value });
    message.removeAttribute('id');
    message.textContent = 'Gracias. Recibimos tu solicitud y te contactaremos pronto.';
    form.reset();
    required.forEach(field => field.removeAttribute('aria-invalid'));
  });
  const serviceCatalog = {
    eventos: [
      ['Eventos empresariales y ejecutivos', 'Soluciones de alimentos para juntas, congresos, lanzamientos y reuniones de trabajo.'],
      ['Banquetes', 'Menús y servicio para celebraciones sociales, familiares y corporativas.'],
      ['Catering', 'Propuesta gastronómica a la medida para llevar el servicio a tu sede.'],
      ['Desayunos ejecutivos', 'Opciones prácticas y bien presentadas para iniciar reuniones y capacitaciones.'],
      ['Logística y montaje de eventos', 'Coordinación de mobiliario, servicio y tiempos para que todo suceda con fluidez.'],
      ['Box Lunch', 'Alimentos individuales, prácticos y listos para servir donde los necesites.'],
      ['Coffee Break', 'Pausas de sabor con bebidas, bocadillos y opciones para tu agenda.'],
      ['Graduaciones', 'Paquetes especiales para celebrar un logro importante con familia y amistades.'],
      ['Comedor Industrial', 'Servicio de alimentación para equipos de trabajo y operaciones de empresa.'],
      ['Cenas Navideñas', 'Menús de temporada para convivios y cierres de año empresariales.']
    ],
    restaurante: [
      ['Fuente de Sodas', 'Bebidas, antojos y opciones rápidas para disfrutar durante el día.'],
      ['Comida Mexicana Tradicional', 'Platillos con sabor mexicano servidos en un ambiente contemporáneo.'],
      ['Menú ejecutivo', 'Comidas completas y prácticas para el ritmo de tu jornada.'],
      ['Suc. Tec de Monterrey Puebla', 'Sucursal ubicada dentro del Tec de Monterrey Campus Puebla.'],
      ['Suc. UVP Campus Tehuacán', 'Sucursal para atender a la comunidad de la UVP Campus Tehuacán.']
    ],
    'food-trucks': [
      ['Food Trucks', 'Cocina en movimiento para festivales, celebraciones y activaciones de marca.'],
      ['Box Lunch', 'Comidas individuales para eventos con servicio ágil y fácil de distribuir.']
    ],
    industrial: [
      ['Comedores Industriales', 'Operación de comedor para empresas, con menús pensados para el bienestar de tu equipo.'],
      ['Box Lunch', 'Opciones individuales para turnos, capacitaciones y actividades fuera de comedor.']
    ],
    'menu-ejecutivo': [
      ['Desayunos ejecutivos', 'Opciones prácticas y bien presentadas para iniciar reuniones y capacitaciones.'],
      ['Menú ejecutivo', 'Comidas completas y prácticas para el ritmo de tu jornada.'],
      ['Box Lunch', 'Alimentos individuales, prácticos y listos para servir donde los necesites.']
    ]
  };
  const serviceRoutes = [
    ['eventos', 'Eventos'],
    ['restaurante', 'Restaurante'],
    ['food-trucks', 'Food Trucks'],
    ['industrial', 'Industrial'],
    ['menu-ejecutivo', 'Menú Ejecutivo']
  ];
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentService = pathParts.at(-1) === 'index.html' ? pathParts.at(-2) : pathParts.at(-1);
  const internalPath = serviceRoutes.some(([route]) => location.pathname.includes(`/${route}/`));
  const routePrefix = internalPath ? '../' : '';
  document.querySelectorAll('header .brand').forEach(brand => {
    if (brand.querySelector('img')) return;
    brand.textContent = '';
    const logo = document.createElement('img');
    logo.src = `${routePrefix}assets/mitokali.svg`;
    logo.alt = 'Mitokali';
    brand.append(logo);
  });
  document.querySelectorAll('.nav').forEach(navigation => {
    if (!navigation.querySelector('a[aria-current="page"]')) {
      const homeLink = document.createElement('a');
      homeLink.href = `${routePrefix}index.html`;
      homeLink.textContent = 'Inicio';
      navigation.prepend(homeLink);
    }
    const aboutLink = [...navigation.querySelectorAll(':scope > a')].find(link => link.textContent.trim() === 'Nosotros');
    if (aboutLink) aboutLink.textContent = 'Quiénes somos';
  });
  if (serviceCatalog[currentService]) {
    const list = document.querySelector('.detail-list');
    if (list) list.innerHTML = serviceCatalog[currentService].map(([name, description]) => `<li><strong>${name}</strong><span>${description}</span></li>`).join('');
    const navigation = document.querySelector('.service-menu .container');
    if (navigation) navigation.innerHTML = '<span>Explora servicios</span>' + Object.entries({ eventos: 'Eventos', restaurante: 'Restaurante', 'food-trucks': 'Food Trucks', industrial: 'Industrial', 'menu-ejecutivo': 'Menú Ejecutivo' }).filter(([route]) => route !== currentService).map(([route, label]) => `<a href="../${route}/index.html">${label}</a>`).join('');
  }
  const select = document.querySelector('#service');
  if (select && location.pathname.endsWith('/index.html')) select.innerHTML = '<option value="">Selecciona una opción</option><option>Mitokali Eventos</option><option>Mitokali Restaurante</option><option>Mitokali Food Truck</option><option>Mitokali Industrial</option><option>Menú Ejecutivo</option>';
  const serviceTiles = [...document.querySelectorAll('[data-service-card]')];
  if (serviceTiles.length) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      serviceTiles.forEach(tile => tile.classList.add('is-visible'));
    } else {
      document.documentElement.classList.add('js');
      const revealServices = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealServices.unobserve(entry.target);
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      serviceTiles.forEach((tile, index) => {
        tile.style.setProperty('--tile-index', index % 2);
        revealServices.observe(tile);
      });
    }
  }
  const eventsIntro = document.querySelector('.events-services-section .services-story-intro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (eventsIntro && window.gsap && window.ScrollTrigger && !reducedMotion) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    const revealTargets = [eventsIntro.querySelector('h2'), eventsIntro.querySelector(':scope > p:last-child')].filter(Boolean);
    const revealWords = revealTargets.flatMap(element => {
      const text = element.textContent.trim();
      element.setAttribute('aria-label', text);
      element.replaceChildren(...text.match(/\S+\s*/g).map(word => {
        const span = document.createElement('span');
        span.className = 'services-scroll-word';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = word;
        return span;
      }));
      return [...element.querySelectorAll('.services-scroll-word')];
    });
    if (revealWords.length) {
      document.documentElement.classList.add('has-scroll-text');
      window.gsap.context(() => {
        window.gsap.fromTo(revealWords, { color: '#e0e0e0' }, {
          color: '#171717',
          stagger: { each: 0.035 },
          ease: 'none',
          scrollTrigger: {
            trigger: eventsIntro,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true
          }
        });
      }, eventsIntro);
    }
  }
  const hero = document.querySelector('.figma-hero');
  if (hero) {
    const slides = [...hero.querySelectorAll('.figma-hero-slide')];
    const controls = [...hero.querySelectorAll('.figma-hero-dots button')];
    const number = hero.querySelector('.figma-hero-number');
    const title = hero.querySelector('#hero-title');
    const subtitle = hero.querySelector('.figma-hero-card > p');
    let current = 0;
    let timer;
    const showSlide = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
      controls.forEach((control, controlIndex) => {
        const active = controlIndex === current;
        control.classList.toggle('is-active', active);
        control.toggleAttribute('aria-current', active);
      });
      if (number) number.textContent = `${current + 1} / ${slides.length}`;
      if (title) title.textContent = slides[current].dataset.title;
      if (subtitle) subtitle.textContent = slides[current].dataset.subtitle;
    };
    const restart = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => showSlide(current + 1), 5000);
    };
    controls.forEach((control, index) => control.addEventListener('click', () => { showSlide(index); restart(); }));
    hero.addEventListener('mouseenter', () => window.clearInterval(timer));
    hero.addEventListener('mouseleave', restart);
    showSlide(0);
    restart();
  }
})();
