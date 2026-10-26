/* ==========================================================================
   Site configuration — the one place to edit studio facts.

   Everything marked PLACEHOLDER was written as sample copy during the build
   and has NOT been verified. Confirm or replace it before launch.
   Items behind a `show…: false` flag stay hidden on the live site until
   real, verified values are entered and the flag is switched on.
   ========================================================================== */
window.SITE_CONFIG = {
  /* Enquiry form ---------------------------------------------------------
     POST endpoint of a form service (e.g. Formspree, Getform, Basin) that
     accepts FormData and returns 2xx on success. While empty, the form opens
     the visitor's email app with their enquiry pre-filled instead. */
  formEndpoint: '',

  /* PLACEHOLDER — confirm the studio inbox */
  email: 'hello@hollisandvale.studio',

  /* Starting prices — PLACEHOLDER, confirm each. Leave a value '' to hide it. */
  prices: {
    weddings: 'from £4,800',
    'pre-wedding': 'from £1,600',
    engagements: 'from £900',
    portraits: 'from £650',
    events: 'from £1,200',
    films: 'from £3,400'
  },

  /* Studio statistics — hidden until verified. */
  showStats: false,
  stats: [
    { value: 0, label: 'Weddings told' },
    { value: 0, label: 'Countries' },
    { value: 0, label: 'Years together' }
  ],

  /* Publication mentions — hidden until the features are confirmed. */
  showPress: false,
  press: ['Vogue Weddings', 'Kinfolk', "Harper's Bazaar", 'Junebug'],

  /* Client testimonials — sample copy, hidden until replaced with real,
     approved quotes from clients. */
  showTestimonials: false,
  testimonials: [
    { quote: 'We didn’t notice them once all day — then we opened the gallery and cried at our kitchen table. They saw things we didn’t even know happened.', name: 'Priya & Arjun', detail: 'Udaipur, 2025' },
    { quote: 'Every photograph feels like the day felt. Not glossy, not posed — just us, and the light, and everyone we love.', name: 'Clara & Ben', detail: 'Lake Como, 2024' },
    { quote: 'The album arrived and my grandmother held it for an hour. That’s the review.', name: 'Hana & Lucas', detail: 'Kyoto, 2025' }
  ]
};
