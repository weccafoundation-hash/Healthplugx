/**
 * HealthPlugX static site — shared shell + page generator
 * Run: node static/build-pages.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('static')

const providers = [
  {
    id: 'prov_001',
    name: 'Lagos Heart Care Centre',
    type: 'Hospital',
    rating: 4.8,
    reviews: 342,
    city: 'Lagos',
    address: '15 Bourdillon Road, Ikoyi, Lagos, Nigeria',
    phone: '+2347012345678',
    email: 'care@lagosheartcare.com',
    verified: true,
    specialties: ['Cardiology', 'Cardiothoracic Surgery', 'Emergency Medicine'],
    description:
      'A leading cardiovascular specialty hospital offering advanced cardiac diagnostics, interventional cardiology, and emergency cardiac care across West Africa.',
    services: [
      { name: 'Cardiology Consultation', price: 45000 },
      { name: 'ECG & Echo Package', price: 85000 },
    ],
  },
  {
    id: 'prov_002',
    name: 'Accra Wellness Clinic',
    type: 'Clinic',
    rating: 4.6,
    reviews: 198,
    city: 'Accra',
    address: '8 Liberation Road, Airport Residential, Accra, Ghana',
    phone: '+233302123456',
    email: 'hello@accrawellness.gh',
    verified: true,
    specialties: ['General Practice', 'Pediatrics', 'Obstetrics & Gynaecology'],
    description:
      'Family-focused outpatient clinic providing primary care, maternal health, and preventive wellness programmes.',
    services: [
      { name: 'General Consultation', price: 25000 },
      { name: 'Wellness Screening', price: 60000 },
    ],
  },
  {
    id: 'prov_003',
    name: 'MediScan Diagnostics',
    type: 'Diagnostic Laboratory',
    rating: 4.7,
    reviews: 521,
    city: 'Lagos',
    address: '42 Adeola Odeku Street, Victoria Island, Lagos, Nigeria',
    phone: '+2348091122334',
    email: 'book@mediscan.ng',
    verified: true,
    specialties: ['Radiology', 'Pathology', 'Molecular Diagnostics'],
    description:
      'ISO-accredited diagnostic laboratory with advanced imaging, pathology, and home sample collection across Lagos and Abuja.',
    services: [
      { name: 'Full Blood Count', price: 12000 },
      { name: 'MRI Scan', price: 180000 },
    ],
  },
  {
    id: 'prov_004',
    name: 'CarePlus Pharmacy',
    type: 'Pharmacy',
    rating: 4.5,
    reviews: 876,
    city: 'Lagos',
    address: '3 Allen Avenue, Ikeja, Lagos, Nigeria',
    phone: '+2348056677889',
    email: 'orders@careplus.ng',
    verified: true,
    specialties: ['Retail Pharmacy', 'Chronic Care', 'OTC Wellness'],
    description:
      'Licensed retail and online pharmacy with same-day delivery, chronic medication refill programmes, and pharmacist counselling.',
    services: [
      { name: 'Medication Counseling', price: 5000 },
      { name: 'Chronic Refill Plan', price: 15000 },
    ],
  },
  {
    id: 'prov_006',
    name: 'MindSpace Counselling',
    type: 'Mental Health',
    rating: 4.8,
    reviews: 267,
    city: 'Lagos',
    address: '17 Glover Road, Ikoyi, Lagos, Nigeria',
    phone: '+2348093344556',
    email: 'hello@mindspace.ng',
    verified: true,
    specialties: ['Psychiatry', 'Clinical Psychology', 'Counselling'],
    description:
      'Confidential mental health marketplace listings for licensed therapists offering in-person and virtual counselling sessions.',
    services: [
      { name: 'Individual Therapy Session', price: 35000 },
      { name: 'Couples Counselling', price: 50000 },
    ],
  },
  {
    id: 'prov_008',
    name: 'NutriAfrica Consult',
    type: 'Nutrition',
    rating: 4.7,
    reviews: 89,
    city: 'Lagos',
    address: '9 Adeola Hopewell, Victoria Island, Lagos, Nigeria',
    phone: '+2348081122445',
    email: 'plan@nutriafrica.com',
    verified: true,
    specialties: ['Nutrition & Dietetics', 'Diabetes Care', 'Maternal Health'],
    description:
      'Registered dietitians specialising in diabetes, maternal nutrition, sports nutrition, and corporate wellness meal planning.',
    services: [
      { name: 'Nutrition Consultation', price: 30000 },
      { name: 'Corporate Meal Planning', price: 120000 },
    ],
  },
]

function money(n) {
  return '₦' + Number(n).toLocaleString('en-NG')
}

function layout({
  title,
  base = '',
  active = '',
  bodyClass = '',
  main,
  headExtra = '',
  scripts = '',
  solidNav = true,
}) {
  const b = base
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#16A34A" />
  <title>${title} — HealthPlugX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${b}css/landing.css" />
  <link rel="stylesheet" href="${b}css/pages.css" />
  ${headExtra}
</head>
<body class="${bodyClass}" data-base="${b}" data-page="${active}" data-solid-nav="${solidNav ? 'true' : 'false'}">
  <div class="announcement" role="region" aria-label="Announcements">
    <div class="container">
      <p id="announcement-text">Now available in Lagos, Abuja &amp; Port Harcourt</p>
    </div>
  </div>

  <header class="site-header ${solidNav ? 'is-solid' : ''}" id="site-header">
    <div class="container nav-bar">
      <a class="brand" href="${b}index.html" aria-label="HealthPlugX home">
        <span class="brand-mark">HX</span>
        <span class="brand-name">HealthPlugX</span>
      </a>
      <nav class="nav-desktop" aria-label="Primary">
        <a class="nav-link ${active === 'home' ? 'is-active' : ''}" href="${b}index.html">Home</a>
        <a class="nav-link ${active === 'marketplace' ? 'is-active' : ''}" href="${b}marketplace.html">Find Providers</a>
        <a class="nav-link" href="${b}index.html#corporate">Corporate Wellness</a>
        <a class="nav-link" href="${b}index.html#providers">For Providers</a>
        <a class="nav-link ${active === 'about' ? 'is-active' : ''}" href="${b}about.html">About</a>
        <a class="nav-link ${active === 'contact' ? 'is-active' : ''}" href="${b}contact.html">Contact</a>
      </nav>
      <div class="nav-actions">
        <a class="btn btn-ghost btn-sm nav-cta-desktop" href="${b}auth/login.html">Login</a>
        <a class="btn btn-sm btn-primary nav-cta-desktop" href="${b}marketplace.html">Book Appointment</a>
        <button type="button" class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false">
          <svg id="icon-menu" class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 5h16M4 12h16M4 19h16"/></svg>
          <svg id="icon-close" class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="display:none"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
      <a href="${b}index.html" data-close-menu>Home</a>
      <a href="${b}marketplace.html" data-close-menu>Find Providers</a>
      <a href="${b}index.html#corporate" data-close-menu>Corporate Wellness</a>
      <a href="${b}about.html" data-close-menu>About</a>
      <a href="${b}contact.html" data-close-menu>Contact</a>
      <a href="${b}auth/login.html" data-close-menu>Login</a>
      <a class="btn btn-primary" href="${b}marketplace.html" data-close-menu>Book Appointment</a>
    </nav>
  </header>

  <main id="main-content">${main}</main>

  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="${b}index.html">
            <span class="brand-mark">HX</span>
            <span class="brand-name">HealthPlugX</span>
          </a>
          <p class="footer-tagline">Connecting You to Trusted Healthcare</p>
          <p class="footer-note">A technology marketplace. We do not provide medical care.</p>
        </div>
        <div class="footer-cols">
          <div>
            <p class="footer-col-title">Company</p>
            <ul>
              <li><a href="${b}about.html">About</a></li>
              <li><a href="${b}contact.html">Contact</a></li>
              <li><a href="${b}help.html">Help Center</a></li>
            </ul>
          </div>
          <div>
            <p class="footer-col-title">Marketplace</p>
            <ul>
              <li><a href="${b}marketplace.html">Find Providers</a></li>
              <li><a href="${b}marketplace.html">Hospitals</a></li>
              <li><a href="${b}marketplace.html">Laboratories</a></li>
            </ul>
          </div>
          <div>
            <p class="footer-col-title">Partners</p>
            <ul>
              <li><a href="${b}auth/register.html">Become a Provider</a></li>
              <li><a href="${b}index.html#corporate">Corporate Wellness</a></li>
              <li><a href="${b}auth/login.html">Provider Login</a></li>
            </ul>
          </div>
          <div>
            <p class="footer-col-title">Legal</p>
            <ul>
              <li><a href="${b}privacy.html">Privacy</a></li>
              <li><a href="${b}terms.html">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-news">
          <p class="footer-col-title">Get started</p>
          <a class="btn btn-primary" href="${b}marketplace.html" style="width:100%">Browse marketplace</a>
          <a class="btn btn-outline" href="${b}auth/register.html" style="width:100%;margin-top:.75rem">Create account</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} HealthPlugX</p>
        <p>Lagos · Abuja · Nationwide</p>
      </div>
    </div>
  </footer>

  <script src="${b}js/site.js"></script>
  ${scripts}
</body>
</html>`
}

function authLayout({ title, base = '../', active = '', panelTitle, panelBody, main }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — HealthPlugX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${base}css/landing.css" />
  <link rel="stylesheet" href="${base}css/pages.css" />
</head>
<body class="auth-body" data-base="${base}" data-page="${active}">
  <div class="auth-shell">
    <aside class="auth-panel">
      <a class="brand" href="${base}index.html">
        <span class="brand-mark" style="background:#fff;color:var(--primary-dark)">HX</span>
        <span class="brand-name" style="color:#fff">HealthPlugX</span>
      </a>
      <div>
        <p class="auth-kicker">Healthcare marketplace</p>
        <h1>${panelTitle}</h1>
        <p>${panelBody}</p>
        <p class="auth-note">Technology platform · Not a medical care provider</p>
      </div>
    </aside>
    <div class="auth-main">
      <a class="brand auth-mobile-brand" href="${base}index.html">
        <span class="brand-mark" style="background:var(--primary);color:#fff">HX</span>
        <span class="brand-name" style="color:var(--text)">HealthPlugX</span>
      </a>
      <div class="auth-card">${main}</div>
    </div>
  </div>
  <script src="${base}js/site.js"></script>
</body>
</html>`
}

const crumbs = (items, base) =>
  `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((it, i) => {
      const last = i === items.length - 1
      return `<li>${i ? '<span class="crumb-sep" aria-hidden="true">/</span>' : ''}${
        last || !it.href
          ? `<span class="${last ? 'crumb-current' : ''}"${last ? ' aria-current="page"' : ''}>${it.label}</span>`
          : `<a href="${base}${it.href}">${it.label}</a>`
      }</li>`
    })
    .join('')}</ol></nav>`

/* ---------- Pages ---------- */

fs.writeFileSync(
  path.join(root, 'about.html'),
  layout({
    title: 'About',
    active: 'about',
    main: `
    <div class="page-muted">
      <div class="container page-pad">
        ${crumbs([{ label: 'Home', href: 'index.html' }, { label: 'About' }], '')}
        <div class="prose-narrow">
          <p class="eyebrow">About HealthPlugX</p>
          <h1 class="page-h1">Connecting You to Trusted Healthcare</h1>
          <p class="lead">HealthPlugX is a healthcare <strong>technology marketplace</strong>. We help patients, corporate organisations, and verified third-party providers discover, compare, book, and access healthcare services across Nigeria and Africa.</p>
          <p class="body">We are not a hospital, clinic, pharmacy, laboratory, or telemedicine company. Clinical care is always delivered by independent providers listed on our platform.</p>
          <div class="card-grid-2" style="margin-top:3rem">
            <article class="surface-card">
              <h2>Mission</h2>
              <p>To make quality healthcare services easy to discover, compare, book and access through technology.</p>
            </article>
            <article class="surface-card">
              <h2>Vision</h2>
              <p>To become Africa's most trusted healthcare marketplace connecting patients, healthcare providers and corporate organizations.</p>
            </article>
          </div>
          <div class="cta-row" style="margin-top:2.5rem">
            <a class="btn btn-primary btn-lg" href="marketplace.html">Find Providers</a>
            <a class="btn btn-outline btn-lg" href="contact.html">Contact us</a>
          </div>
        </div>
      </div>
    </div>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'contact.html'),
  layout({
    title: 'Contact',
    active: 'contact',
    main: `
    <div class="page-muted">
      <div class="container page-pad">
        ${crumbs([{ label: 'Home', href: 'index.html' }, { label: 'Contact' }], '')}
        <div class="contact-grid">
          <div>
            <h1 class="page-h1" style="font-size:clamp(1.875rem,4vw,2.25rem)">Contact HealthPlugX</h1>
            <p class="body" style="margin-top:.75rem">Questions about bookings, provider partnerships, or corporate wellness? We're here to help.</p>
            <ul class="contact-list">
              <li><a href="mailto:hello@healthplugx.com">hello@healthplugx.com</a></li>
              <li>+234 (0) 800 HEALTHPX</li>
              <li>Victoria Island, Lagos, Nigeria</li>
            </ul>
          </div>
          <div class="surface-card" id="contact-panel">
            <form id="contact-form" class="stack-form" novalidate>
              <div class="form-row-2">
                <div class="field"><label for="name">Full name</label><input id="name" name="name" required /></div>
                <div class="field"><label for="email">Email</label><input id="email" type="email" name="email" required /></div>
              </div>
              <div class="field">
                <label for="type">I am a…</label>
                <select id="type" name="type">
                  <option value="patient">Patient</option>
                  <option value="provider">Healthcare Provider</option>
                  <option value="corporate">Corporate Organisation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="field"><label for="subject">Subject</label><input id="subject" name="subject" required /></div>
              <div class="field"><label for="message">Message</label><textarea id="message" name="message" rows="5" required placeholder="How can we help?"></textarea></div>
              <button type="submit" class="btn btn-primary">Send message</button>
            </form>
            <p class="form-success" id="contact-success" hidden role="status">Thanks — our team will respond within one business day.</p>
          </div>
        </div>
      </div>
    </div>`,
    scripts: `<script>
      document.getElementById('contact-form').addEventListener('submit', function(e){
        e.preventDefault();
        this.hidden = true;
        document.getElementById('contact-success').hidden = false;
      });
    </script>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'help.html'),
  layout({
    title: 'Help Center',
    active: 'help',
    main: `
    <div class="container page-pad prose-narrow">
      <h1 class="page-h1" style="font-size:1.875rem">Help Center</h1>
      <p class="body" style="margin-top:.5rem">Answers about using the HealthPlugX marketplace</p>
      <div class="help-list">
        <details class="help-item" open>
          <summary>Is HealthPlugX a hospital or clinic?</summary>
          <p>No. HealthPlugX is a technology marketplace that connects you with verified third-party healthcare providers. We do not provide medical care.</p>
        </details>
        <details class="help-item">
          <summary>How do I book an appointment?</summary>
          <p>Browse the marketplace, open a provider profile, select a service, choose a date and time, then confirm payment.</p>
        </details>
        <details class="help-item">
          <summary>Are providers verified?</summary>
          <p>Yes. Listed providers undergo licence and credential checks before appearing on the marketplace.</p>
        </details>
        <details class="help-item">
          <summary>How do corporate plans work?</summary>
          <p>Organisations enrol employees, set benefit rules, and track utilisation from the corporate dashboard.</p>
        </details>
      </div>
      <p class="body" style="margin-top:2.5rem">Still need help? <a class="text-link" href="mailto:support@healthplugx.com">support@healthplugx.com</a> · <a class="text-link" href="marketplace.html">Browse marketplace</a></p>
    </div>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'privacy.html'),
  layout({
    title: 'Privacy Policy',
    active: 'privacy',
    main: `
    <article class="container page-pad prose-narrow">
      <h1 class="page-h1" style="font-size:1.875rem">Privacy Policy</h1>
      <p class="meta">Last updated: August 2026</p>
      <div class="legal-body">
        <p>HealthPlugX ("we", "our", or "us") operates a healthcare technology marketplace. We connect users with independent third-party healthcare providers. We do not provide medical care.</p>
        <h2>Information we collect</h2>
        <p>Account details, booking history, device information, and communications you send to us. Payment data is processed by Paystack; we do not store full card numbers.</p>
        <h2>How we use data</h2>
        <p>To operate the marketplace, facilitate bookings between you and providers, improve our platform, send transactional notifications (email, SMS, WhatsApp), and comply with applicable law.</p>
        <h2>Sharing</h2>
        <p>We share necessary booking information with the healthcare provider you select. We do not sell personal data.</p>
        <h2>Contact</h2>
        <p>privacy@healthplugx.com</p>
      </div>
    </article>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'terms.html'),
  layout({
    title: 'Terms of Service',
    active: 'terms',
    main: `
    <article class="container page-pad prose-narrow">
      <h1 class="page-h1" style="font-size:1.875rem">Terms of Service</h1>
      <p class="meta">Last updated: August 2026</p>
      <div class="legal-body">
        <h2>Nature of the platform</h2>
        <p>HealthPlugX is a technology marketplace that enables users to discover, compare, book, and access healthcare services offered by independent, verified third-party providers. HealthPlugX is not a hospital, clinic, pharmacy, laboratory, or telemedicine provider and does not practise medicine or provide clinical care.</p>
        <h2>Provider relationship</h2>
        <p>When you book a service, your care relationship is with the provider, not with HealthPlugX. Providers are solely responsible for the quality and delivery of their services.</p>
        <h2>Accounts</h2>
        <p>You must provide accurate information and keep credentials secure. Role-based access (Patient, Provider, Corporate, Admin) governs available features.</p>
        <h2>Payments</h2>
        <p>Payments are processed via Paystack. Fees and refund policies for clinical services are set by the provider, subject to marketplace rules.</p>
        <h2>Contact</h2>
        <p>legal@healthplugx.com</p>
      </div>
    </article>`,
  }),
)

const providerCards = providers
  .map(
    (p) => `
    <article class="provider-card" data-name="${p.name.toLowerCase()}" data-type="${p.type.toLowerCase()}" data-city="${p.city.toLowerCase()}">
      <div class="provider-card-banner"><span>${p.type}</span></div>
      <div class="provider-card-body">
        <h3>${p.name}${p.verified ? ' <span class="verified" title="Verified">✓</span>' : ''}</h3>
        <p class="meta-line">★ ${p.rating.toFixed(1)} (${p.reviews}) · ${p.city}</p>
        <p class="desc">${p.description.slice(0, 110)}…</p>
        <div class="tags">${p.specialties
          .slice(0, 3)
          .map((s) => `<span>${s}</span>`)
          .join('')}</div>
        <a class="btn btn-primary" href="marketplace/provider-${p.id}.html">View details</a>
      </div>
    </article>`,
  )
  .join('')

fs.writeFileSync(
  path.join(root, 'marketplace.html'),
  layout({
    title: 'Marketplace',
    active: 'marketplace',
    main: `
    <div class="container page-pad">
      ${crumbs([{ label: 'Home', href: 'index.html' }, { label: 'Marketplace' }], '')}
      <div class="marketplace-intro">
        <h1 class="page-h1" style="font-size:1.875rem">Healthcare marketplace</h1>
        <p class="body" style="margin-top:.5rem">Discover and compare verified hospitals, clinics, laboratories, pharmacies, and specialists across Africa.</p>
      </div>
      <form class="market-search" id="market-search" role="search">
        <input type="search" id="market-q" placeholder="Search healthcare providers…" aria-label="Search healthcare providers" />
      </form>
      <div class="market-filters">
        <div class="field"><label for="filter-type">Type</label>
          <select id="filter-type">
            <option value="">All types</option>
            <option>Hospital</option>
            <option>Clinic</option>
            <option>Diagnostic Laboratory</option>
            <option>Pharmacy</option>
            <option>Mental Health</option>
            <option>Nutrition</option>
          </select>
        </div>
        <div class="field"><label for="filter-city">City</label>
          <select id="filter-city">
            <option value="">All cities</option>
            <option>Lagos</option>
            <option>Accra</option>
            <option>Abuja</option>
          </select>
        </div>
      </div>
      <p class="result-count" id="result-count" aria-live="polite">${providers.length} providers found</p>
      <div class="provider-grid" id="provider-grid">${providerCards}</div>
      <p class="empty-state" id="market-empty" hidden>No providers found. Try adjusting your search or filters.</p>
    </div>`,
    scripts: `<script src="js/marketplace.js"></script>`,
  }),
)

for (const p of providers) {
  const services = p.services
    .map(
      (s) =>
        `<li class="service-row"><span>${s.name}</span><strong>${money(s.price)}</strong></li>`,
    )
    .join('')
  fs.writeFileSync(
    path.join(root, 'marketplace', `provider-${p.id}.html`),
    layout({
      title: p.name,
      base: '../',
      active: 'marketplace',
      main: `
      <div class="container page-pad">
        ${crumbs(
          [
            { label: 'Home', href: 'index.html' },
            { label: 'Marketplace', href: 'marketplace.html' },
            { label: p.name },
          ],
          '../',
        )}
        <div class="provider-hero">
          <span class="badge">${p.type}</span>
          <h1 class="page-h1">${p.name}${p.verified ? ' <span class="verified">✓</span>' : ''}</h1>
          <p class="meta-line">★ ${p.rating.toFixed(1)} (${p.reviews} reviews) · ${p.address}</p>
          <a class="btn btn-primary btn-lg" href="../marketplace/book-${p.id}.html" style="margin-top:1.5rem">Book an appointment</a>
        </div>
        <div class="provider-detail-grid">
          <div>
            <section class="detail-block">
              <h2>About</h2>
              <p>${p.description}</p>
              <p class="meta">Listed on HealthPlugX marketplace. Care is delivered by this independent third-party provider — not by HealthPlugX.</p>
            </section>
            <section class="detail-block">
              <h2>Services</h2>
              <ul class="service-list">${services}</ul>
            </section>
            <section class="detail-block">
              <h2>Specialties</h2>
              <div class="tags">${p.specialties.map((s) => `<span>${s}</span>`).join('')}</div>
            </section>
          </div>
          <aside class="surface-card sticky-aside">
            <h2>Contact</h2>
            <ul class="contact-list compact">
              <li>${p.phone}</li>
              <li><a href="mailto:${p.email}">${p.email}</a></li>
              <li>${p.city}</li>
            </ul>
            <a class="btn btn-primary" href="../marketplace/book-${p.id}.html" style="width:100%;margin-top:1rem">Book</a>
            <a class="btn btn-outline" href="../marketplace.html" style="width:100%;margin-top:.5rem">Back to marketplace</a>
          </aside>
        </div>
      </div>`,
    }),
  )

  const serviceOpts = p.services
    .map((s, i) => `<option value="${i}" data-price="${s.price}">${s.name} — ${money(s.price)}</option>`)
    .join('')

  fs.writeFileSync(
    path.join(root, 'marketplace', `book-${p.id}.html`),
    layout({
      title: `Book · ${p.name}`,
      base: '../',
      active: 'marketplace',
      main: `
      <div class="container page-pad">
        ${crumbs(
          [
            { label: 'Home', href: 'index.html' },
            { label: 'Marketplace', href: 'marketplace.html' },
            { label: p.name, href: `marketplace/provider-${p.id}.html` },
            { label: 'Book' },
          ],
          '../',
        )}
        <div class="book-wrap" id="book-wrap">
          <h1 class="page-h1" style="font-size:1.75rem">Book with ${p.name}</h1>
          <p class="body" style="margin-top:.5rem">Select a service and preferred time. Payment is simulated (Paystack placeholder).</p>
          <form class="surface-card stack-form" id="book-form" style="margin-top:2rem;max-width:32rem">
            <div class="field">
              <label for="service">Service</label>
              <select id="service" required><option value="">Select a service</option>${serviceOpts}</select>
            </div>
            <div class="field"><label for="date">Date</label><input id="date" type="date" required /></div>
            <div class="field">
              <label for="time">Time</label>
              <select id="time" required>
                <option value="">Select time</option>
                <option>09:00</option><option>10:30</option><option>12:00</option>
                <option>14:00</option><option>15:30</option><option>17:00</option>
              </select>
            </div>
            <div class="field"><label for="notes">Notes (optional)</label><textarea id="notes" rows="3" placeholder="Symptoms, preferences…"></textarea></div>
            <p class="meta" id="book-price">Select a service to see price</p>
            <button type="submit" class="btn btn-primary btn-lg">Confirm booking</button>
            <p class="meta">Demo: you will be asked to sign in if needed — continue to see success state.</p>
          </form>
        </div>
        <div class="book-success surface-card" id="book-success" hidden style="max-width:32rem;text-align:center;padding:2.5rem;margin-top:2rem">
          <h2>Booking requested</h2>
          <p class="body" style="margin-top:.75rem">Your appointment request with ${p.name} has been submitted. Payment was initialized via Paystack (placeholder).</p>
          <a class="btn btn-primary" href="../auth/login.html" style="margin-top:1.5rem">Go to dashboard (demo)</a>
        </div>
      </div>`,
      scripts: `<script>
        var form=document.getElementById('book-form');
        var svc=document.getElementById('service');
        var price=document.getElementById('book-price');
        svc.addEventListener('change',function(){
          var opt=svc.selectedOptions[0];
          price.textContent=opt&&opt.dataset.price?'Total: ₦'+Number(opt.dataset.price).toLocaleString('en-NG'):'Select a service to see price';
        });
        form.addEventListener('submit',function(e){
          e.preventDefault();
          document.getElementById('book-wrap').hidden=true;
          document.getElementById('book-success').hidden=false;
        });
      </script>`,
    }),
  )
}

/* Auth pages */
fs.mkdirSync(path.join(root, 'auth'), { recursive: true })

fs.writeFileSync(
  path.join(root, 'auth', 'login.html'),
  authLayout({
    title: 'Login',
    active: 'login',
    panelTitle: 'Welcome back',
    panelBody:
      'Sign in to manage bookings, explore verified providers, and access your HealthPlugX dashboard.',
    main: `
      <h1>Welcome back</h1>
      <p class="auth-sub">Sign in to your HealthPlugX marketplace account.</p>
      <form class="stack-form" id="login-form" style="margin-top:2rem" novalidate>
        <div class="field"><label for="email">Email</label><input id="email" type="email" value="john.adeyemi@email.com" required /></div>
        <div class="field"><label for="password">Password</label><input id="password" type="password" value="Demo@1234" required /></div>
        <div class="auth-row">
          <label class="check"><input type="checkbox" checked /> Remember me</label>
          <a class="text-link" href="forgot-password.html">Forgot password?</a>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%">Login</button>
      </form>
      <p class="auth-footer">Don't have an account? <a class="text-link" href="register.html">Register</a></p>
      <div class="demo-box">
        <p><strong>Demo accounts (password: Demo@1234)</strong></p>
        <ul>
          <li>Patient — john.adeyemi@email.com</li>
          <li>Provider — admin@lifecare.ng</li>
          <li>Corporate — hr@zenithmfg.ng</li>
          <li>Admin — admin@healthplugx.com</li>
        </ul>
      </div>
      <script>
        document.getElementById('login-form').addEventListener('submit',function(e){
          e.preventDefault();
          window.location.href='../marketplace.html';
        });
      </script>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'auth', 'register.html'),
  authLayout({
    title: 'Register',
    active: 'register',
    panelTitle: 'Join the marketplace',
    panelBody:
      'Create an account as a patient, healthcare provider, or corporate organisation. HealthPlugX connects you — we do not provide medical care.',
    main: `
      <h1>Create your account</h1>
      <p class="auth-sub">Choose how you want to use HealthPlugX.</p>
      <div class="role-cards" id="role-step">
        <button type="button" class="role-card" data-role="patient"><strong>Patient</strong><span>Find &amp; book care</span></button>
        <button type="button" class="role-card" data-role="provider"><strong>Provider</strong><span>List your practice</span></button>
        <button type="button" class="role-card" data-role="corporate"><strong>Corporate</strong><span>Employee wellness</span></button>
      </div>
      <button type="button" class="btn btn-primary" id="role-continue" style="width:100%;margin-top:1rem" disabled>Continue</button>
      <form class="stack-form" id="register-form" hidden style="margin-top:1.5rem">
        <div class="form-row-2">
          <div class="field"><label>First name</label><input name="first" required /></div>
          <div class="field"><label>Last name</label><input name="last" required /></div>
        </div>
        <div class="field"><label>Email</label><input type="email" required /></div>
        <div class="field"><label>Phone</label><input type="tel" placeholder="+234…" required /></div>
        <div class="field"><label>Password</label><input type="password" required minlength="8" /></div>
        <label class="check"><input type="checkbox" required /> I accept the <a class="text-link" href="../terms.html">Terms</a> and <a class="text-link" href="../privacy.html">Privacy Policy</a></label>
        <button type="submit" class="btn btn-primary" style="width:100%">Create account</button>
        <button type="button" class="btn btn-ghost" id="back-role" style="width:100%">Back</button>
      </form>
      <p class="auth-footer">Already have an account? <a class="text-link" href="login.html">Login</a></p>
      <script>
        var role=null;
        var cards=document.querySelectorAll('.role-card');
        var cont=document.getElementById('role-continue');
        cards.forEach(function(c){c.addEventListener('click',function(){
          cards.forEach(function(x){x.classList.remove('is-selected')});
          c.classList.add('is-selected'); role=c.dataset.role; cont.disabled=false;
        })});
        cont.addEventListener('click',function(){
          document.getElementById('role-step').hidden=true; cont.hidden=true;
          document.getElementById('register-form').hidden=false;
        });
        document.getElementById('back-role').addEventListener('click',function(){
          document.getElementById('register-form').hidden=true;
          document.getElementById('role-step').hidden=false; cont.hidden=false;
        });
        document.getElementById('register-form').addEventListener('submit',function(e){
          e.preventDefault(); window.location.href='verify-otp.html';
        });
      </script>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'auth', 'forgot-password.html'),
  authLayout({
    title: 'Forgot password',
    panelTitle: 'Reset securely',
    panelBody: 'We will send a reset link so you can get back to discovering trusted healthcare partners.',
    main: `
      <h1>Forgot password</h1>
      <p class="auth-sub">Enter your email and we'll send a secure reset link.</p>
      <form class="stack-form" id="forgot-form" style="margin-top:2rem">
        <div class="field"><label for="email">Email</label><input id="email" type="email" required /></div>
        <button type="submit" class="btn btn-primary" style="width:100%">Send reset link</button>
      </form>
      <div id="forgot-done" hidden>
        <div class="demo-box" style="margin-top:2rem">If an account exists for that email, a reset link has been sent.</div>
        <a class="btn btn-primary" href="reset-password.html" style="width:100%;margin-top:1rem">Continue to reset password</a>
        <p class="meta" style="text-align:center;margin-top:.75rem">Demo flow: continue without opening email.</p>
      </div>
      <p class="auth-footer"><a class="text-link" href="login.html">Back to login</a></p>
      <script>
        document.getElementById('forgot-form').addEventListener('submit',function(e){
          e.preventDefault(); this.hidden=true; document.getElementById('forgot-done').hidden=false;
        });
      </script>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'auth', 'reset-password.html'),
  authLayout({
    title: 'Reset password',
    panelTitle: 'Choose a strong password',
    panelBody: 'Protect your HealthPlugX account with a unique password you do not reuse elsewhere.',
    main: `
      <h1>Reset password</h1>
      <p class="auth-sub">Enter your new password below.</p>
      <form class="stack-form" id="reset-form" style="margin-top:2rem">
        <div class="field"><label>New password</label><input type="password" required minlength="8" /></div>
        <div class="field"><label>Confirm password</label><input type="password" required minlength="8" /></div>
        <button type="submit" class="btn btn-primary" style="width:100%">Update password</button>
      </form>
      <script>
        document.getElementById('reset-form').addEventListener('submit',function(e){
          e.preventDefault(); window.location.href='login.html';
        });
      </script>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'auth', 'verify-otp.html'),
  authLayout({
    title: 'Verify OTP',
    panelTitle: 'Verify your email',
    panelBody: 'A quick verification keeps accounts secure and bookings trustworthy across the marketplace.',
    main: `
      <h1>Enter verification code</h1>
      <p class="auth-sub">We sent a 6-digit code to your email. Demo code: <strong>123456</strong></p>
      <form class="stack-form" id="otp-form" style="margin-top:2rem">
        <div class="field"><label for="otp">OTP</label><input id="otp" inputmode="numeric" maxlength="6" placeholder="123456" required /></div>
        <p class="form-error" id="otp-error" hidden role="alert">Invalid code. Use 123456 for demo.</p>
        <button type="submit" class="btn btn-primary" style="width:100%">Verify</button>
      </form>
      <script>
        document.getElementById('otp-form').addEventListener('submit',function(e){
          e.preventDefault();
          var v=document.getElementById('otp').value.trim();
          if(v!=='123456'){ document.getElementById('otp-error').hidden=false; return; }
          window.location.href='complete-profile.html';
        });
      </script>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'auth', 'complete-profile.html'),
  authLayout({
    title: 'Complete profile',
    panelTitle: 'Almost there',
    panelBody:
      'A complete profile helps us personalise your marketplace experience — still without providing medical care ourselves.',
    main: `
      <h1>Complete your profile</h1>
      <p class="auth-sub">A few details so we can tailor your marketplace experience.</p>
      <form class="stack-form" id="profile-form" style="margin-top:2rem">
        <div class="field"><label>City</label>
          <select required><option>Lagos</option><option>Abuja</option><option>Port Harcourt</option><option>Ibadan</option></select>
        </div>
        <div class="field"><label>Preferred specialty (optional)</label>
          <select><option value="">Any</option><option>General Practice</option><option>Cardiology</option><option>Pediatrics</option></select>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%">Save &amp; continue</button>
      </form>
      <script>
        document.getElementById('profile-form').addEventListener('submit',function(e){
          e.preventDefault(); window.location.href='account-created.html';
        });
      </script>`,
  }),
)

fs.writeFileSync(
  path.join(root, 'auth', 'account-created.html'),
  authLayout({
    title: 'Account created',
    panelTitle: 'You are in',
    panelBody: "Welcome to Africa's trusted healthcare marketplace.",
    main: `
      <h1>Account created</h1>
      <p class="auth-sub">You're ready to discover and book verified healthcare providers.</p>
      <div class="cta-row" style="margin-top:2rem;flex-direction:column">
        <a class="btn btn-primary" href="../marketplace.html" style="width:100%">Explore marketplace</a>
        <a class="btn btn-outline" href="../index.html" style="width:100%">Back to home</a>
      </div>`,
  }),
)

/* Shared JS */
fs.writeFileSync(
  path.join(root, 'js', 'site.js'),
  `;(function () {
  'use strict'
  var announcements = [
    'Now available in Lagos, Abuja & Port Harcourt',
    'Book healthcare services online in minutes',
    'Corporate Wellness Programs Available',
  ]
  var annEl = document.getElementById('announcement-text')
  if (annEl) {
    var i = 0
    setInterval(function () {
      annEl.classList.add('is-hidden')
      setTimeout(function () {
        i = (i + 1) % announcements.length
        annEl.textContent = announcements[i]
        annEl.classList.remove('is-hidden')
      }, 400)
    }, 5000)
  }

  var header = document.getElementById('site-header')
  var solidAlways = document.body.getAttribute('data-solid-nav') === 'true'
  if (header && !solidAlways) {
    function onScroll() {
      header.classList.toggle('is-solid', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  var toggle = document.getElementById('menu-toggle')
  var mobileNav = document.getElementById('mobile-nav')
  if (toggle && mobileNav) {
    var iconMenu = document.getElementById('icon-menu')
    var iconClose = document.getElementById('icon-close')
    function setMenu(open) {
      mobileNav.classList.toggle('is-open', open)
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
      if (iconMenu) iconMenu.style.display = open ? 'none' : 'block'
      if (iconClose) iconClose.style.display = open ? 'block' : 'none'
      if (open && header) header.classList.add('is-solid')
    }
    toggle.addEventListener('click', function () {
      setMenu(!mobileNav.classList.contains('is-open'))
    })
    document.querySelectorAll('[data-close-menu]').forEach(function (el) {
      el.addEventListener('click', function () {
        setMenu(false)
      })
    })
  }
})()
`,
)

fs.writeFileSync(
  path.join(root, 'js', 'marketplace.js'),
  `;(function () {
  var q = document.getElementById('market-q')
  var type = document.getElementById('filter-type')
  var city = document.getElementById('filter-city')
  var grid = document.getElementById('provider-grid')
  var count = document.getElementById('result-count')
  var empty = document.getElementById('market-empty')
  if (!grid) return

  function filter() {
    var query = (q.value || '').toLowerCase().trim()
    var t = (type.value || '').toLowerCase()
    var c = (city.value || '').toLowerCase()
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.provider-card'))
    var shown = 0
    cards.forEach(function (card) {
      var ok =
        (!query ||
          card.dataset.name.indexOf(query) !== -1 ||
          card.dataset.type.indexOf(query) !== -1 ||
          card.dataset.city.indexOf(query) !== -1) &&
        (!t || card.dataset.type === t) &&
        (!c || card.dataset.city === c)
      card.hidden = !ok
      if (ok) shown++
    })
    count.textContent = shown + ' provider' + (shown === 1 ? '' : 's') + ' found'
    empty.hidden = shown !== 0
  }

  ;[q, type, city].forEach(function (el) {
    el.addEventListener('input', filter)
    el.addEventListener('change', filter)
  })
  document.getElementById('market-search').addEventListener('submit', function (e) {
    e.preventDefault()
    filter()
  })
})()
`,
)

/* Pages CSS */
fs.writeFileSync(
  path.join(root, 'css', 'pages.css'),
  `/* Shared multi-page styles for HealthPlugX static site */

.page-muted { background: var(--surface-muted); }
.page-pad { padding-block: 2.5rem 4rem; }
@media (min-width: 768px) {
  .page-pad { padding-block: 3.5rem 5rem; }
}

.page-h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--text);
}

.prose-narrow { max-width: 48rem; margin-inline: auto; }
.lead { margin-top: 1.5rem; font-size: 1.125rem; line-height: 1.7; color: var(--text-secondary); }
.body { margin-top: 1rem; font-size: 1rem; line-height: 1.7; color: var(--text-secondary); }
.meta { margin-top: .5rem; font-size: .75rem; color: var(--text-muted); }
.text-link { color: var(--primary); font-weight: 500; }
.text-link:hover { text-decoration: underline; }

.breadcrumbs { margin-bottom: 1.5rem; }
.breadcrumbs ol { display: flex; flex-wrap: wrap; align-items: center; gap: .35rem; list-style: none; margin: 0; padding: 0; font-size: .875rem; color: var(--text-muted); }
.breadcrumbs a { color: var(--text-muted); }
.breadcrumbs a:hover { color: var(--primary); }
.crumb-sep { margin-inline: .15rem; opacity: .5; }
.crumb-current { color: var(--text); font-weight: 500; }

.surface-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: #fff;
  box-shadow: var(--shadow-soft);
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .surface-card { padding: 2rem; }
}
.surface-card h2 { font-size: 1.125rem; margin: 0; color: var(--text); }
.surface-card p { margin-top: .5rem; font-size: .875rem; line-height: 1.625; color: var(--text-secondary); }

.card-grid-2 { display: grid; gap: 1.5rem; }
@media (min-width: 640px) { .card-grid-2 { grid-template-columns: 1fr 1fr; } }

.contact-grid { display: grid; gap: 2.5rem; }
@media (min-width: 1024px) { .contact-grid { grid-template-columns: 2fr 3fr; } }
.contact-list { margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem; font-size: .875rem; color: var(--text-secondary); list-style: none; padding: 0; }
.contact-list.compact { margin-top: 1rem; gap: .75rem; }
.contact-list a:hover { color: var(--primary); }

.stack-form { display: flex; flex-direction: column; gap: 1rem; }
.form-row-2 { display: grid; gap: 1rem; }
@media (min-width: 640px) { .form-row-2 { grid-template-columns: 1fr 1fr; } }
.field textarea {
  width: 100%; min-height: 7rem; border: 1px solid var(--border); border-radius: var(--radius-md);
  padding: .75rem .875rem; font: inherit; font-size: .875rem; resize: vertical;
}
.field textarea:focus { border-color: var(--primary); box-shadow: var(--shadow-focus); outline: none; }
.form-success { text-align: center; padding: 3rem 1rem; color: var(--primary); font-weight: 500; }
.form-error { color: #ef4444; font-size: .875rem; }

.help-list { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
.help-item {
  border: 1px solid var(--border); border-radius: var(--radius-lg); background: #fff;
  padding: 1.25rem; box-shadow: var(--shadow-soft);
}
.help-item summary { cursor: pointer; font-weight: 500; color: var(--text); list-style: none; }
.help-item summary::-webkit-details-marker { display: none; }
.help-item p { margin-top: .75rem; font-size: .875rem; line-height: 1.625; color: var(--text-secondary); }

.legal-body { margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; font-size: .875rem; line-height: 1.7; color: var(--text-secondary); }
.legal-body h2 { margin: 0 0 .5rem; font-size: 1.125rem; color: var(--text); }

.marketplace-intro { max-width: 40rem; margin-bottom: 2rem; }
.market-search input[type="search"] {
  width: 100%; height: 3rem; border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 0 1rem 0 1rem; font-size: .875rem; box-shadow: var(--shadow-soft);
}
.market-search input:focus { border-color: var(--primary); box-shadow: var(--shadow-focus); outline: none; }
.market-filters { display: grid; gap: 1rem; margin: 1rem 0 1.5rem; }
@media (min-width: 640px) { .market-filters { grid-template-columns: 1fr 1fr; max-width: 32rem; } }
.result-count { font-size: .875rem; color: var(--text-secondary); margin-bottom: 1rem; }
.provider-grid { display: grid; gap: 1.5rem; }
@media (min-width: 640px) { .provider-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .provider-grid { grid-template-columns: 1fr 1fr 1fr; } }

.provider-card {
  display: flex; flex-direction: column; overflow: hidden;
  border: 1px solid var(--border); border-radius: var(--radius-lg); background: #fff;
  box-shadow: var(--shadow-soft); transition: transform .2s, box-shadow .2s;
}
.provider-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(15,23,42,.1); }
.provider-card-banner {
  height: 9rem; background: linear-gradient(135deg, #dcfce7, #f0fdf4 50%, #f8fafc);
  display: flex; align-items: flex-end; padding: 1rem;
}
.provider-card-banner span {
  background: rgba(255,255,255,.9); border-radius: 8px; padding: .25rem .625rem;
  font-size: .75rem; font-weight: 500; color: var(--primary-dark);
}
.provider-card-body { display: flex; flex-direction: column; flex: 1; padding: 1.25rem; }
.provider-card-body h3 { font-size: 1rem; margin: 0; color: var(--text); }
.provider-card-body .btn { width: 100%; margin-top: auto; }
.meta-line { margin-top: .5rem; font-size: .875rem; color: var(--text-secondary); }
.desc { margin: 1rem 0; font-size: .875rem; color: var(--text-secondary); flex: 1; }
.tags { display: flex; flex-wrap: wrap; gap: .375rem; margin-bottom: 1rem; }
.tags span { background: var(--surface-muted); border-radius: 8px; padding: .15rem .5rem; font-size: .75rem; color: var(--text-secondary); }
.verified { color: var(--primary); font-weight: 700; }
.empty-state { text-align: center; padding: 3rem; color: var(--text-secondary); }

.provider-hero {
  border-radius: 1.25rem; padding: 1.5rem; margin-bottom: 2.5rem;
  background: linear-gradient(135deg, #dcfce7, #f0fdf4 40%, #fff);
}
@media (min-width: 768px) { .provider-hero { padding: 2.5rem; } }
.badge {
  display: inline-block; background: rgba(255,255,255,.8); border-radius: 8px;
  padding: .25rem .625rem; font-size: .75rem; font-weight: 500; color: var(--primary-dark);
}
.provider-detail-grid { display: grid; gap: 2rem; }
@media (min-width: 1024px) { .provider-detail-grid { grid-template-columns: 2fr 1fr; } }
.detail-block { margin-bottom: 2rem; }
.detail-block h2 { font-size: 1.25rem; color: var(--text); margin-bottom: .75rem; }
.detail-block p { color: var(--text-secondary); line-height: 1.7; }
.service-list { list-style: none; padding: 0; margin: 0; }
.service-row {
  display: flex; justify-content: space-between; gap: 1rem; padding: .75rem 0;
  border-bottom: 1px solid var(--border); font-size: .875rem; color: var(--text-secondary);
}
.service-row strong { color: var(--text); }
.sticky-aside { align-self: start; }
@media (min-width: 1024px) { .sticky-aside { position: sticky; top: 6rem; } }

/* Auth layout */
.auth-body { margin: 0; min-height: 100vh; background: var(--surface-muted); }
.auth-shell { display: grid; min-height: 100vh; }
@media (min-width: 1024px) { .auth-shell { grid-template-columns: 1fr 1fr; } }
.auth-panel {
  display: none; flex-direction: column; justify-content: space-between;
  padding: 3rem; color: #fff;
  background: linear-gradient(135deg, #166534, #16a34a 55%, #15803d);
  position: relative; overflow: hidden;
}
@media (min-width: 1024px) { .auth-panel { display: flex; } }
.auth-panel::before {
  content: ''; position: absolute; inset: 0; opacity: .3; pointer-events: none;
  background:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,.25), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(220,252,231,.35), transparent 45%);
}
.auth-panel > * { position: relative; z-index: 1; }
.auth-panel h1 { font-size: clamp(1.75rem, 3vw, 2.25rem); margin: 0; color: #fff; }
.auth-panel p { margin-top: 1rem; color: #dcfce7; max-width: 28rem; }
.auth-kicker { font-size: .875rem; color: #bbf7d0 !important; margin-bottom: 1.5rem !important; }
.auth-note { font-size: .875rem; color: #bbf7d0 !important; margin-top: 2rem !important; }
.auth-main { display: flex; flex-direction: column; justify-content: center; padding: 2rem 1.5rem; }
@media (min-width: 640px) { .auth-main { padding: 3rem 2.5rem; } }
.auth-mobile-brand { display: flex; margin-bottom: 2rem; }
@media (min-width: 1024px) { .auth-mobile-brand { display: none; } }
.auth-card { width: 100%; max-width: 28rem; margin-inline: auto; }
.auth-card h1 { font-size: 1.5rem; color: var(--text); margin: 0; }
.auth-sub { margin-top: .5rem; font-size: .875rem; color: var(--text-secondary); }
.auth-row { display: flex; align-items: center; justify-content: space-between; gap: .75rem; font-size: .875rem; }
.auth-footer { margin-top: 1.5rem; text-align: center; font-size: .875rem; color: var(--text-secondary); }
.check { display: inline-flex; align-items: center; gap: .5rem; font-size: .875rem; color: var(--text-secondary); cursor: pointer; }
.check input { accent-color: var(--primary); }
.demo-box {
  margin-top: 1.25rem; border: 1px solid rgba(22,163,74,.15); background: rgba(220,252,231,.5);
  border-radius: var(--radius-lg); padding: .75rem; font-size: .75rem; color: var(--primary-dark);
}
.demo-box ul { margin: .35rem 0 0; padding-left: 1rem; }
.role-cards { display: grid; gap: .75rem; margin-top: 1.5rem; }
.role-card {
  display: flex; flex-direction: column; gap: .25rem; text-align: left;
  border: 1px solid var(--border); border-radius: var(--radius-md); background: #fff;
  padding: 1rem; cursor: pointer; transition: border-color .2s, box-shadow .2s;
}
.role-card strong { color: var(--text); }
.role-card span { font-size: .8rem; color: var(--text-secondary); }
.role-card.is-selected, .role-card:hover { border-color: var(--primary); box-shadow: var(--shadow-focus); }
`,
)

/* Update index.html links to point to real pages */
let indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8')

const linkFixes = [
  [/href="#search"/g, 'href="marketplace.html"'],
  [/href="#trust"/g, 'href="about.html"'],
  [/href="#cta"/g, 'href="contact.html"'],
  [/href="#newsletter"/g, 'href="auth/login.html"'],
  [/href="#providers"/g, 'href="auth/register.html"'],
  [/href="#faq-heading"/g, 'href="help.html"'],
  [/href="#corporate"/g, 'href="index.html#corporate"'],
]

// More careful replacements for nav/footer specifically via targeted strings
indexHtml = indexHtml
  .replace(
    `<a class="nav-link" href="#search">Find Providers</a>`,
    `<a class="nav-link" href="marketplace.html">Find Providers</a>`,
  )
  .replace(
    `<a class="nav-link" href="#trust">About</a>`,
    `<a class="nav-link" href="about.html">About</a>`,
  )
  .replace(
    `<a class="nav-link" href="#cta">Contact</a>`,
    `<a class="nav-link" href="contact.html">Contact</a>`,
  )
  .replace(
    `<a class="btn btn-ghost btn-sm nav-cta-desktop" href="#newsletter">Login</a>`,
    `<a class="btn btn-ghost btn-sm nav-cta-desktop" href="auth/login.html">Login</a>`,
  )
  .replace(
    `<a class="btn btn-sm nav-cta-desktop btn-white" id="nav-book" href="#search">Book Appointment</a>`,
    `<a class="btn btn-sm nav-cta-desktop btn-white" id="nav-book" href="marketplace.html">Book Appointment</a>`,
  )
  .replace(`<a href="#search" data-close-menu>Find Providers</a>`, `<a href="marketplace.html" data-close-menu>Find Providers</a>`)
  .replace(`<a href="#trust" data-close-menu>About</a>`, `<a href="about.html" data-close-menu>About</a>`)
  .replace(`<a href="#cta" data-close-menu>Contact</a>`, `<a href="contact.html" data-close-menu>Contact</a>`)
  .replace(
    `<a class="btn btn-primary" href="#search" data-close-menu>Book Appointment</a>`,
    `<a class="btn btn-primary" href="marketplace.html" data-close-menu>Book Appointment</a>`,
  )
  .replace(/href="#search"/g, 'href="marketplace.html"')
  .replace(`<a class="link-text" href="#providers">`, `<a class="link-text" href="auth/register.html">`)
  .replace(
    `<a class="link-text" href="#providers" style="color: rgba(255, 255, 255, 0.75)">`,
    `<a class="link-text" href="auth/register.html" style="color: rgba(255, 255, 255, 0.75)">`,
  )
  .replace(`<li><a href="#trust">About</a></li>`, `<li><a href="about.html">About</a></li>`)
  .replace(`<li><a href="#cta">Contact</a></li>`, `<li><a href="contact.html">Contact</a></li>`)
  .replace(`<li><a href="#faq-heading">Help Center</a></li>`, `<li><a href="help.html">Help Center</a></li>`)
  .replace(`<li><a href="#providers">Become a Provider</a></li>`, `<li><a href="auth/register.html">Become a Provider</a></li>`)
  .replace(`<li><a href="#newsletter">Provider Login</a></li>`, `<li><a href="auth/login.html">Provider Login</a></li>`)
  .replace(`<li><a href="#trust">Privacy</a></li>`, `<li><a href="privacy.html">Privacy</a></li>`)
  .replace(`<li><a href="#trust">Terms</a></li>`, `<li><a href="terms.html">Terms</a></li>`)
  .replace(
    `href="marketplace/provider.html"`,
    `href="marketplace.html"`,
  )

// Wire featured provider Profile/Book links
const featuredMap = [
  ['Lagos Heart Care Centre', 'prov_001'],
  ['Accra Wellness Clinic', 'prov_002'],
  ['MediScan Diagnostics', 'prov_003'],
  ['CarePlus Pharmacy', 'prov_004'],
  ['MindSpace Counselling', 'prov_006'],
  ['NutriAfrica Consult', 'prov_008'],
]

for (const [name, id] of featuredMap) {
  // Replace first Profile+Book pair after provider name occurrence more simply:
  const needle = `<span>${name}</span>`
  const idx = indexHtml.indexOf(needle)
  if (idx === -1) continue
  const sliceStart = idx
  const sliceEnd = indexHtml.indexOf('</li>', sliceStart)
  let block = indexHtml.slice(sliceStart, sliceEnd)
  block = block
    .replace(`<a class="profile-link" href="#providers">Profile</a>`, `<a class="profile-link" href="marketplace/provider-${id}.html">Profile</a>`)
    .replace(`<a class="book-link" href="#search">Book</a>`, `<a class="book-link" href="marketplace/book-${id}.html">Book</a>`)
  indexHtml = indexHtml.slice(0, sliceStart) + block + indexHtml.slice(sliceEnd)
}

indexHtml = indexHtml.replace(
  `<a class="view-all" href="marketplace.html">`,
  `<a class="view-all" href="marketplace.html">`,
)

fs.writeFileSync(path.join(root, 'index.html'), indexHtml)

console.log('Static pages generated:')
console.log(
  [
    'about.html',
    'contact.html',
    'help.html',
    'privacy.html',
    'terms.html',
    'marketplace.html',
    ...providers.map((p) => `marketplace/provider-${p.id}.html`),
    ...providers.map((p) => `marketplace/book-${p.id}.html`),
    'auth/login.html',
    'auth/register.html',
    'auth/forgot-password.html',
    'auth/reset-password.html',
    'auth/verify-otp.html',
    'auth/complete-profile.html',
    'auth/account-created.html',
  ]
    .map((f) => '  - ' + f)
    .join('\\n'),
)
