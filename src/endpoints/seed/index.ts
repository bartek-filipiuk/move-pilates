// @ts-nocheck
import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // Clear collections and globals
  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Creating demo admin user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'admin@example.com',
      },
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Admin',
      email: 'filipiuk.bartek@gmail.com',
      password: 'ypLv31dduMj67hoHB4dSOJB8',
    },
  })

  payload.logger.info(`— Uploading images...`)

  // Upload hero image from public/images
  let heroMediaId: number | null = null
  try {
    const fs = await import('fs')
    const path = await import('path')
    const heroPath = path.resolve(process.cwd(), 'public/images/hero.jpg')
    if (fs.existsSync(heroPath)) {
      const heroData = fs.readFileSync(heroPath)
      const heroMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'Kobieta ćwicząca na reformerze Pilates - Move Studio Pilates Smolec',
        },
        file: {
          name: 'hero.jpg',
          data: heroData,
          mimetype: 'image/jpeg',
          size: heroData.byteLength,
        },
      })
      heroMediaId = heroMedia.id
      payload.logger.info(`  Hero image uploaded (ID: ${heroMediaId})`)
    }
  } catch (e) {
    payload.logger.warn('Could not upload hero image, continuing without it')
  }

  payload.logger.info(`— Creating pages...`)

  // ============================
  // HOME PAGE
  // ============================
  const homePage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Strona główna',
      slug: 'home',
      layout: [
        // Hero - Split layout
        {
          blockType: 'glassHero',
          layout: 'split',
          headline: 'Twój ruch. Twoja siła.',
          subheadline: createRichText(
            'Odkryj butikowe studio Pilates w Smolcu. Małe grupy, indywidualne podejście i profesjonalny sprzęt — wszystko, czego potrzebujesz, by zadbać o swoje ciało.',
          ),
          primaryCTA: {
            type: 'custom',
            reference: null,
            url: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            label: 'Zapisz się na zajęcia',
            appearance: 'default',
            newTab: true,
          },
          secondaryCTA: {
            type: 'custom',
            reference: null,
            url: '/zajecia',
            label: 'Poznaj naszą ofertę',
            appearance: 'outline',
          },
          ...(heroMediaId ? { backgroundMedia: heroMediaId } : {}),
        },
        // Features - 3 USP
        {
          blockType: 'features',
          sectionTitle: 'Dlaczego Move Studio?',
          sectionDescription: 'Tworzymy przestrzeń, w której ruch staje się przyjemnością, a Twoje ciało odzyskuje równowagę.',
          features: [
            {
              icon: 'star',
              title: 'Butikowy standard blisko domu',
              description: 'Jakość i design premium znany z najlepszych wrocławskich studiów, dostępny lokalnie w Smolcu. Oszczędzasz czas na dojazdach, nie rezygnując z profesjonalizmu.',
            },
            {
              icon: 'users',
              title: 'Kameralność i indywidualne podejście',
              description: 'W Move Studio jesteś dla nas najważniejsza. Małe grupy treningowe gwarantują, że instruktor ma czas na korektę Twojej postawy i dostosowanie ćwiczeń.',
            },
            {
              icon: 'heart',
              title: 'Holistyczne doświadczenie',
              description: 'Nasze studio to nie tylko miejsce do ćwiczeń — to przestrzeń, w której dbamy o Twój oddech, wyciszenie umysłu i regenerację.',
            },
          ],
        },
        // Testimonials
        {
          blockType: 'testimonials',
          sectionTitle: 'Co mówią nasze klientki',
          sectionDescription: 'Opinie osób, które już odkryły Move Studio.',
          testimonials: [
            {
              quote: 'Move Studio to wyjątkowe miejsce na mapie Smolca. Od kiedy zaczęłam regularnie uczęszczać na zajęcia, zapomniałam o bólach pleców po pracy przy biurku. Właścicielka dba o każdy detal, a kameralna atmosfera sprawia, że trening to czysta przyjemność.',
              author: 'Anna M.',
              role: 'Klientka',
              rating: 5,
            },
            {
              quote: 'Zajęcia prowadzone w małych grupach to strzał w dziesiątkę. Trenerka zwraca uwagę na technikę i poprawia błędy, co daje poczucie bezpieczeństwa. Przepiękne wnętrze i świetny sprzęt. Cieszę się, że nie muszę już dojeżdżać do Wrocławia.',
              author: 'Karolina W.',
              role: 'Klientka',
              rating: 5,
            },
            {
              quote: 'Moje pierwsze kroki na reformerze były pełne obaw, ale profesjonalne podejście i cierpliwość sprawiły, że pokochałam te zajęcia. Ciało staje się smuklejsze, a umysł zrelaksowany. Idealne miejsce na odcięcie się od codziennych obowiązków.',
              author: 'Magdalena K.',
              role: 'Klientka',
              rating: 5,
            },
          ],
        },
        // Contact CTA
        {
          blockType: 'contactCTA',
          headline: 'Zacznij swoją przygodę z Pilatesem',
          description: createRichText(
            'Umów się na pierwsze zajęcia i przekonaj się, jak pilates może zmienić Twoje samopoczucie. Zapraszamy do Move Studio w Smolcu.',
          ),
          contactEmail: 'move.studiosmolec@op.pl',
          contactPhone: '530 700 430',
          socialLinks: [
            { platform: 'facebook', url: 'https://facebook.com/movestudiosmolec' },
            { platform: 'instagram', url: 'https://instagram.com/movestudiosmolec' },
          ],
          primaryCTA: {
            type: 'custom',
            reference: null,
            url: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            label: 'Zarezerwuj miejsce',
            appearance: 'default',
            newTab: true,
          },
        },
      ],
      _status: 'published',
    },
  })

  // ============================
  // O NAS PAGE
  // ============================
  await payload.create({
    collection: 'pages',
    data: {
      title: 'O nas',
      slug: 'o-nas',
      layout: [
        {
          blockType: 'glassHero',
          layout: 'centered',
          headline: 'O Move Studio',
          subheadline: createRichText(
            'Poznaj historię studia i osobę, która za nim stoi.',
          ),
        },
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: createRichTextMultiParagraph([
                'Move Studio Pilates powstało z pasji do świadomego ruchu. Założycielka — Wioletta Mielczarek — od lat wierzy, że pilates to nie tylko trening, ale styl życia, który pozwala ciału i umysłowi odnaleźć harmonię.',
                'Nasze studio w Smolcu to kameralna przestrzeń stworzona z myślą o komforcie i skupieniu. Wyposażona w profesjonalne reformery i dbałość o każdy detal, zapewnia warunki godne najlepszych butikowych studiów.',
                'Wierzymy, że w małej grupie każda osoba otrzymuje uwagę, na którą zasługuje. Dlatego nasze zajęcia prowadzone są w kameralnych grupach, gdzie instruktor ma czas na indywidualne podejście i korektę techniki.',
              ]),
            },
          ],
        },
        {
          blockType: 'features',
          sectionTitle: 'Nasze wartości',
          features: [
            {
              icon: 'heart',
              title: 'Pasja',
              description: 'Kochamy to, co robimy. Każde zajęcia prowadzone są z zaangażowaniem i dbałością o Twoje potrzeby.',
            },
            {
              icon: 'users',
              title: 'Indywidualność',
              description: 'Każda osoba jest inna. Dostosowujemy ćwiczenia do Twojego poziomu, celów i ewentualnych ograniczeń.',
            },
            {
              icon: 'star',
              title: 'Profesjonalizm',
              description: 'Ciągłe doskonalenie, certyfikowane metody i najwyższej jakości sprzęt to nasze fundamenty.',
            },
          ],
        },
      ],
      _status: 'published',
    },
  })

  // ============================
  // ZAJĘCIA PAGE
  // ============================
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Zajęcia',
      slug: 'zajecia',
      layout: [
        {
          blockType: 'glassHero',
          layout: 'centered',
          headline: 'Nasze zajęcia',
          subheadline: createRichText(
            'Wybierz formę ruchu, która najbardziej odpowiada Twoim potrzebom. Od reformera po matę — każde zajęcia to krok do lepszego samopoczucia.',
          ),
        },
        {
          blockType: 'features',
          sectionTitle: 'Oferta zajęć',
          sectionDescription: 'Wszystkie zajęcia prowadzone w małych grupach lub indywidualnie.',
          features: [
            {
              icon: 'book',
              title: 'Wprowadzenie do Pilatesu',
              description: 'Zajęcia dla osób początkujących, skupiające się na nauce oddechu, postawy i obsługi sprzętu. Idealne na start.',
              linkUrl: '/cennik',
              linkLabel: 'Zobacz cennik',
            },
            {
              icon: 'lightning',
              title: 'Reformer Flow',
              description: 'Dynamiczny trening całego ciała na reformerach. Buduje siłę, poprawia elastyczność i modeluje sylwetkę.',
              linkUrl: '/cennik',
              linkLabel: 'Zobacz cennik',
            },
            {
              icon: 'heart',
              title: 'Pilates Klasyczny na Matach',
              description: 'Klasyczna metoda pracy z ciężarem własnego ciała i drobnym sprzętem — obręcze, piłki, gumy.',
              linkUrl: '/cennik',
              linkLabel: 'Zobacz cennik',
            },
            {
              icon: 'star',
              title: 'Trening Personalny 1:1',
              description: 'W pełni spersonalizowana sesja dostosowana do Twoich celów i ewentualnych ograniczeń ruchowych.',
              linkUrl: '/cennik',
              linkLabel: 'Zobacz cennik',
            },
            {
              icon: 'users',
              title: 'Trening Duo 1:2',
              description: 'Trening z bliską osobą — wzajemna motywacja przy zachowaniu dużej uwagi instruktora.',
              linkUrl: '/cennik',
              linkLabel: 'Zobacz cennik',
            },
          ],
        },
      ],
      _status: 'published',
    },
  })

  // ============================
  // CENNIK PAGE
  // ============================
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Cennik',
      slug: 'cennik',
      layout: [
        {
          blockType: 'glassHero',
          layout: 'centered',
          headline: 'Cennik',
          subheadline: createRichText(
            'Przejrzyste ceny, żadnych ukrytych opłat. Wybierz pakiet, który odpowiada Twojemu stylowi treningowemu.',
          ),
        },
        {
          blockType: 'pricing',
          sectionTitle: 'Zajęcia i treningi',
          sectionDescription: 'Wszystkie ceny zawierają pełne wyposażenie i opiekę instruktora.',
          packages: [
            {
              title: 'Wprowadzenie do Pilatesu',
              price: '70 zł',
              duration: '50 min',
              description: 'Nauka podstaw oddechu, postawy i obsługi sprzętu. Idealne na start.',
              highlighted: false,
              ctaLabel: 'Zapisz się',
              ctaUrl: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            },
            {
              title: 'Reformer Flow',
              price: '85 zł',
              duration: '50 min',
              description: 'Dynamiczny trening całego ciała na profesjonalnych reformerach.',
              highlighted: true,
              ctaLabel: 'Zapisz się',
              ctaUrl: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            },
            {
              title: 'Pilates na Matach',
              price: '60 zł',
              duration: '50 min',
              description: 'Klasyczna metoda z ciężarem ciała i drobnym sprzętem.',
              highlighted: false,
              ctaLabel: 'Zapisz się',
              ctaUrl: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            },
            {
              title: 'Trening Personalny 1:1',
              price: '220 zł',
              duration: '55 min',
              description: 'W pełni spersonalizowana sesja dopasowana do Twoich celów.',
              highlighted: false,
              ctaLabel: 'Umów się',
              ctaUrl: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            },
            {
              title: 'Trening Duo 1:2',
              price: '150 zł/os',
              duration: '55 min',
              description: 'Trening w parze — motywacja we dwoje.',
              highlighted: false,
              ctaLabel: 'Umów się',
              ctaUrl: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            },
          ],
          carnets: [
            {
              title: 'Karnet 4 wejścia (Reformer)',
              price: '320 zł',
              description: 'Ważny 30 dni. Idealny na 1 trening w tygodniu.',
            },
            {
              title: 'Karnet 8 wejść (Reformer)',
              price: '600 zł',
              description: 'Ważny 30 dni. Optymalny wybór — 2 treningi w tygodniu.',
            },
          ],
        },
        {
          blockType: 'contactCTA',
          headline: 'Masz pytania o cennik?',
          description: createRichText(
            'Skontaktuj się z nami — chętnie doradzimy, jaki pakiet będzie dla Ciebie najlepszy.',
          ),
          contactEmail: 'move.studiosmolec@op.pl',
          contactPhone: '530 700 430',
          primaryCTA: {
            type: 'custom',
            reference: null,
            url: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            label: 'Zarezerwuj miejsce',
            appearance: 'default',
            newTab: true,
          },
        },
      ],
      _status: 'published',
    },
  })

  // ============================
  // KONTAKT PAGE
  // ============================
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Kontakt',
      slug: 'kontakt',
      layout: [
        {
          blockType: 'glassHero',
          layout: 'centered',
          headline: 'Kontakt',
          subheadline: createRichText(
            'Masz pytania? Chętnie na nie odpowiemy. Skontaktuj się z nami lub odwiedź nasze studio w Smolcu.',
          ),
        },
        {
          blockType: 'contactCTA',
          headline: 'Skontaktuj się z nami',
          description: createRichText(
            'Move Studio Pilates\nul. Główna 88, 55-080 Smolec\nPowiat wrocławski, Dolnośląskie',
          ),
          contactEmail: 'move.studiosmolec@op.pl',
          contactPhone: '530 700 430',
          socialLinks: [
            { platform: 'facebook', url: 'https://facebook.com/movestudiosmolec' },
            { platform: 'instagram', url: 'https://instagram.com/movestudiosmolec' },
          ],
          primaryCTA: {
            type: 'custom',
            reference: null,
            url: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            label: 'Zapisz się na zajęcia',
            appearance: 'default',
            newTab: true,
          },
        },
      ],
      _status: 'published',
    },
  })

  payload.logger.info(`— Setting up navigation...`)

  // ============================
  // HEADER
  // ============================
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/zajecia',
            label: 'Zajęcia',
          },
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/cennik',
            label: 'Cennik',
          },
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/o-nas',
            label: 'O nas',
          },
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/kontakt',
            label: 'Kontakt',
          },
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: 'https://app.fitssey.com/MoveStudioPilatesSmolec/frontoffice',
            label: 'Zapisz się',
            appearance: 'default',
            newTab: true,
          },
        },
      ],
    },
  })

  // ============================
  // FOOTER
  // ============================
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/zajecia',
            label: 'Zajęcia',
          },
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/cennik',
            label: 'Cennik',
          },
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/o-nas',
            label: 'O nas',
          },
        },
        {
          link: {
            type: 'custom',
            reference: null,
            url: '/kontakt',
            label: 'Kontakt',
          },
        },
      ],
      showSocialLinks: true,
      showContactInfo: true,
      showNewsletter: false,
    },
  })

  payload.logger.info(`— Setting up site settings...`)

  // ============================
  // SITE SETTINGS
  // ============================
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Move Studio Pilates',
      contact: {
        email: 'move.studiosmolec@op.pl',
        phone: '530 700 430',
        address: {
          street: 'ul. Główna 88',
          city: 'Smolec',
          postalCode: '55-080',
          country: 'Polska',
        },
      },
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/movestudiosmolec' },
        { platform: 'instagram', url: 'https://instagram.com/movestudiosmolec' },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
  payload.logger.info('')
  payload.logger.info('=== MOVE STUDIO PILATES ===')
  payload.logger.info('Admin login: admin@example.com / admin123')
  payload.logger.info('')
  payload.logger.info('Pages created:')
  payload.logger.info('  - Home (Hero split, USP, Testimonials, Contact)')
  payload.logger.info('  - O nas')
  payload.logger.info('  - Zajęcia')
  payload.logger.info('  - Cennik')
  payload.logger.info('  - Kontakt')
  payload.logger.info('=========================')
}

// Utility function for fetching files
export async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

// Lexical rich text helper - single paragraph
export const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

// Lexical rich text helper - multiple paragraphs
export const createRichTextMultiParagraph = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      children: [
        {
          type: 'text',
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})
