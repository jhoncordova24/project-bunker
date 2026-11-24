/**
 * Configuración central del negocio.
 * Todo dato de la tienda (contacto, redes, moneda...) vive aquí para no
 * repetirlo en los componentes.
 */
export const SITE = {
  name: 'El Bunker',
  tagline: 'Licorería',
  slogan: 'Tu reserva de licores',
  description:
    'El Bunker, licorería con whiskies, rones, licores y más. Pide por WhatsApp y recibe en tu puerta.',
  locale: 'es-PE',
  currency: 'PEN',
  legalAge: 18,
  contact: {
    phone: '+51 971 140 476',
    whatsapp: '51971140476', // Solo dígitos, con código de país
    email: '', // Vacío = no se muestra. Pon el correo aquí para activarlo.
    address: '', // Vacío = no se muestra. Pon la dirección aquí para activarla.
    mapsUrl: 'https://maps.google.com',
  },
  hours: [
    { days: 'Lunes a Jueves', time: '10:00 a. m. – 5:00 a. m.' },
    { days: 'Viernes a Domingo', time: '10:00 a. m. – 6:00 a. m.' },
  ],
  // Vacío = el ícono abre el aviso "Muy pronto". Pon la URL real para enlazarlo.
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
  } as Record<'instagram' | 'facebook' | 'tiktok', string>,
} as const;

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
] as const;
