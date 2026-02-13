export type Language = 'en' | 'ro';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    ourCabins: string;
    gallery: string;
    experience: string;
    bookNow: string;
  };

  // Hero
  hero: {
    title: string;
    subtitle: string;
    exploreCabins: string;
    bookYourStay: string;
    scroll: string;
  };

  // About
  about: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
  };

  // Cabins
  cabins: {
    title: string;
    subtitle: string;
    guests: string;
    bedrooms: string;
    bathrooms: string;
    bathroom: string;
    from: string;
    night: string;
    viewDetails: string;
    bookNow: string;
    thePine: {
      name: string;
      description: string;
      longDescription: string;
    };
    theCedar: {
      name: string;
      description: string;
      longDescription: string;
    };
  };

  // Experience
  experience: {
    title: string;
    subtitle: string;
    forestHiking: {
      title: string;
      description: string;
    };
    stargazing: {
      title: string;
      description: string;
    };
    campfire: {
      title: string;
      description: string;
    };
    dining: {
      title: string;
      description: string;
    };
  };

  // Testimonials
  testimonials: {
    title: string;
    reviews: Array<{
      quote: string;
      author: string;
      date: string;
    }>;
  };

  // Booking
  booking: {
    title: string;
    subtitle: string;
    selectCabin: string;
    chooseCabin: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    guest: string;
    checkAvailability: string;
    securePayment: string;
    instantConfirmation: string;
    freeCancellation: string;
  };

  // Location
  location: {
    title: string;
    ourLocation: string;
    gettingHere: string;
    directions: string;
    hoursFrom: string;
    nearestAirport: string;
    whatToBring: string;
    bringDescription: string;
  };

  // Footer
  footer: {
    tagline: string;
    quickLinks: string;
    ourCabins: string;
    contact: string;
    legal: string;
    stayInLoop: string;
    stayDescription: string;
    emailPlaceholder: string;
    subscribe: string;
    rightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
    cancellationPolicy: string;
  };

  // Cabin Detail Page
  cabinDetail: {
    overview: string;
    amenities: string;
    houseRules: string;
    exploreIn3D: string;
    photoGallery: string;
    checkInTime: string;
    checkOut: string;
    maximum: string;
    petsAllowed: string;
    noSmoking: string;
    quietHours: string;
    dragToRotate: string;
    interactive3DModel: string;
    priceBreakdown: string;
    nights: string;
    cleaningFee: string;
    serviceFee: string;
    total: string;
    bookThisCabin: string;
    freeCancellationNote: string;
  };

  // Amenities
  amenities: {
    wifi: string;
    fireplace: string;
    fullKitchen: string;
    hotTub: string;
    forestViews: string;
    mountainViews: string;
    hikingAccess: string;
    freeParking: string;
    petFriendly: string;
    bbqGrill: string;
    outdoorDining: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      ourCabins: 'Our Cabins',
      gallery: 'Gallery',
      experience: 'Experience',
      bookNow: 'Book Now',
    },
    hero: {
      title: 'Where the Forest Meets Home',
      subtitle: 'Two handcrafted A-frame cabins nestled deep in nature. Disconnect to reconnect.',
      exploreCabins: 'Explore Our Cabins',
      bookYourStay: 'Book Your Stay',
      scroll: 'SCROLL',
    },
    about: {
      badge: 'A Retreat Like No Other',
      title: 'A Retreat Like No Other',
      paragraph1: 'Nestled deep in the heart of ancient forest, our two handcrafted A-frame cabins offer a sanctuary from the modern world. Here, time moves differently. The rustle of pine needles, the call of distant birds, and the gentle whisper of wind through the trees become your daily soundtrack.',
      paragraph2: 'Each cabin has been thoughtfully designed to blend seamlessly with its natural surroundings while providing every modern comfort. From the warmth of a crackling fire to the luxury of a starlit hot tub, we\'ve created spaces where you can truly disconnect to reconnect—with nature, with loved ones, and with yourself.',
    },
    cabins: {
      title: 'Our Cabins',
      subtitle: 'Choose your escape',
      guests: 'Guests',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      bathroom: 'Bathroom',
      from: 'From',
      night: 'night',
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      thePine: {
        name: 'The Pine',
        description: 'Cozy two-bedroom retreat with floor-to-ceiling windows and forest views',
        longDescription: `Perched among towering pine trees, The Pine offers a cozy two-bedroom retreat with floor-to-ceiling windows, a wood-burning fireplace, and a private deck overlooking the forest canopy. Wake up to birdsong and fall asleep under the stars.

This thoughtfully designed cabin combines rustic charm with modern comfort. The open-plan living area features vaulted ceilings and abundant natural light, while the fully-equipped kitchen makes meal preparation a joy. Step outside to your private deck and soak in the hot tub while surrounded by nature.

Perfect for couples or small families seeking a peaceful escape from the everyday. Every detail has been carefully considered to ensure your stay is both comfortable and memorable.`,
      },
      theCedar: {
        name: 'The Cedar',
        description: 'Spacious three-bedroom cabin with mountain views and premium amenities',
        longDescription: `Our larger A-frame, The Cedar, is wrapped in warm cedar wood and features an open-plan living space, a chef's kitchen, and a wraparound deck with mountain views. Perfect for families or small groups looking for a premium nature escape.

With three bedrooms and two bathrooms, The Cedar comfortably accommodates up to six guests. The expansive deck offers multiple seating areas, including an outdoor dining space and a luxurious hot tub with panoramic mountain views. Fire up the BBQ grill for an al fresco dinner under the stars.

Inside, you'll find high-end finishes throughout, from the gourmet kitchen with professional appliances to the cozy living room with its statement fireplace. Large windows frame the stunning landscape, bringing the beauty of nature indoors while maintaining your comfort and privacy.`,
      },
    },
    experience: {
      title: 'The Experience',
      subtitle: 'More than just a stay',
      forestHiking: {
        title: 'Forest Hiking',
        description: 'Explore miles of pristine hiking trails through old-growth forest',
      },
      stargazing: {
        title: 'Stargazing Nights',
        description: 'Experience the majesty of unpolluted night skies filled with stars',
      },
      campfire: {
        title: 'Lakeside Campfire',
        description: 'Gather around the fire pit for stories and s\'mores by the lake',
      },
      dining: {
        title: 'Local Farm Dining',
        description: 'Savor farm-to-table cuisine from nearby organic farms',
      },
    },
    testimonials: {
      title: 'What Our Guests Say',
      reviews: [
        {
          quote: 'The most magical weekend we\'ve ever had. Waking up in The Pine with snow falling outside the windows was pure magic.',
          author: 'Sarah & James',
          date: 'December 2024',
        },
        {
          quote: 'We didn\'t want to leave. The Cedar was spotless, the hot tub was incredible, and the forest was right at our doorstep.',
          author: 'Michael T.',
          date: 'October 2024',
        },
        {
          quote: 'A hidden gem. The attention to detail in these cabins is remarkable. Already planning our next trip.',
          author: 'Emily R.',
          date: 'August 2024',
        },
        {
          quote: 'Perfect for our family reunion. The kids loved exploring the trails and we loved relaxing by the fire.',
          author: 'The Andersons',
          date: 'July 2024',
        },
      ],
    },
    booking: {
      title: 'Book Your Escape',
      subtitle: 'Select your cabin, dates, and guests to check availability',
      selectCabin: 'Select Cabin',
      chooseCabin: 'Choose a cabin...',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      guest: 'guest',
      checkAvailability: 'Check Availability',
      securePayment: 'Secure Payment',
      instantConfirmation: 'Instant Confirmation',
      freeCancellation: 'Free Cancellation',
    },
    location: {
      title: 'Find Us',
      ourLocation: 'Our Location',
      gettingHere: 'Getting Here',
      directions: 'From Bucharest, take DN1 (E60) north towards Brașov. Continue through Sinaia and Bușteni. Azuga is located between Bușteni and Predeal, approximately 140 km from Bucharest. The cabins are nestled in the mountains with stunning views of the Bucegi range. Detailed directions will be provided upon booking.',
      hoursFrom: '2 hours from Bucharest',
      nearestAirport: 'Nearest Airport: OTP',
      whatToBring: 'What to Bring',
      bringDescription: 'Hiking boots, warm layers, and a sense of adventure',
    },
    footer: {
      tagline: 'Where the forest meets home. Two luxury A-frame cabins offering an unforgettable escape into nature.',
      quickLinks: 'Quick Links',
      ourCabins: 'Our Cabins',
      contact: 'Contact',
      legal: 'Legal',
      stayInLoop: 'Stay in the loop',
      stayDescription: 'Subscribe to receive updates, access to exclusive deals, and more.',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      rightsReserved: 'The A-Frame. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cancellationPolicy: 'Cancellation Policy',
    },
    cabinDetail: {
      overview: 'Overview',
      amenities: 'Amenities',
      houseRules: 'House Rules',
      exploreIn3D: 'Explore in 3D',
      photoGallery: 'Photo Gallery',
      checkInTime: 'Check-in: 3:00 PM - 8:00 PM',
      checkOut: 'Check-out: 11:00 AM',
      maximum: 'Maximum',
      petsAllowed: 'Pets allowed with prior approval',
      noSmoking: 'No smoking inside the cabin',
      quietHours: 'Quiet hours: 10:00 PM - 8:00 AM',
      dragToRotate: 'Drag to rotate • Scroll to zoom',
      interactive3DModel: 'Interactive 3D Model',
      priceBreakdown: 'Price Breakdown',
      nights: 'nights',
      cleaningFee: 'Cleaning fee',
      serviceFee: 'Service fee',
      total: 'Total',
      bookThisCabin: 'Book This Cabin',
      freeCancellationNote: 'Free cancellation up to 48 hours before check-in',
    },
    amenities: {
      wifi: 'WiFi',
      fireplace: 'Fireplace',
      fullKitchen: 'Full Kitchen',
      hotTub: 'Hot Tub',
      forestViews: 'Forest Views',
      mountainViews: 'Mountain Views',
      hikingAccess: 'Hiking Access',
      freeParking: 'Free Parking',
      petFriendly: 'Pet Friendly',
      bbqGrill: 'BBQ Grill',
      outdoorDining: 'Outdoor Dining',
    },
  },
  ro: {
    nav: {
      home: 'Acasă',
      ourCabins: 'Cabane',
      gallery: 'Galerie',
      experience: 'Experiență',
      bookNow: 'Rezervă Acum',
    },
    hero: {
      title: 'Unde Pădurea Întâlnește Căminul',
      subtitle: 'Două cabane A-frame create manual, adăpostite adânc în natură. Deconectează-te pentru a te reconecta.',
      exploreCabins: 'Explorează Cabanele',
      bookYourStay: 'Rezervă Sejurul',
      scroll: 'DERULEAZĂ',
    },
    about: {
      badge: 'Un Refugiu Ca Niciunul Altul',
      title: 'Un Refugiu Ca Niciunul Altul',
      paragraph1: 'Amplasate adânc în inima pădurii seculare, cele două cabane A-frame create manual oferă un sanctuar de lumea modernă. Aici, timpul se scurge diferit. Foșnetul acelor de pin, chemarea păsărilor îndepărtate și șoaptele blânde ale vântului prin copaci devin coloana sonoră zilnică.',
      paragraph2: 'Fiecare cabană a fost proiectată cu grijă pentru a se îmbina perfect cu mediul natural, oferind în același timp toate comodităților moderne. De la căldura unui foc care pârâie până la luxul unui jacuzzi sub cerul înstelat, am creat spații unde te poți cu adevărat deconecta pentru a te reconecta—cu natura, cu cei dragi și cu tine însuți.',
    },
    cabins: {
      title: 'Cabanele Noastre',
      subtitle: 'Alege-ți evadarea',
      guests: 'Oaspeți',
      bedrooms: 'Dormitoare',
      bathrooms: 'Băi',
      bathroom: 'Baie',
      from: 'De la',
      night: 'noapte',
      viewDetails: 'Vezi Detalii',
      bookNow: 'Rezervă Acum',
      thePine: {
        name: 'The Pine',
        description: 'Refugiu confortabil cu două dormitoare, ferestre de la podea la tavan și vedere la pădure',
        longDescription: `Așezată printre pini înalți, The Pine oferă un refugiu confortabil cu două dormitoare, cu ferestre de la podea la tavan, o șemineu cu lemne și o terasă privată cu vedere la copa pădurii. Trezește-te la cântecul păsărilor și adormi sub stele.

Această cabană proiectată cu grijă combină farmecul rustic cu confortul modern. Zona de zi cu plan deschis prezintă tavane înalte și lumină naturală abundentă, în timp ce bucătăria complet echipată face pregătirea meselor o plăcere. Ieși pe terasa ta privată și relaxează-te în jacuzzi înconjurat de natură.

Perfect pentru cupluri sau familii mici în căutarea unei evadări liniștite din cotidian. Fiecare detaliu a fost considerat cu atenție pentru a asigura că sejurul tău este confortabil și memorabil.`,
      },
      theCedar: {
        name: 'The Cedar',
        description: 'Cabană spațioasă cu trei dormitoare, vedere la munți și amenități premium',
        longDescription: `A-frame-ul nostru mai mare, The Cedar, este învelit în lemn cald de cedru și prezintă un spațiu de locuit cu plan deschis, o bucătărie de șef și o terasă înconjurătoare cu vedere la munți. Perfect pentru familii sau grupuri mici care caută o evadare premium în natură.

Cu trei dormitoare și două băi, The Cedar găzduiește confortabil până la șase oaspeți. Terasa expansivă oferă multiple zone de relaxare, inclusiv un spațiu de luat masa în aer liber și un jacuzzi luxos cu vedere panoramică la munți. Aprinde grătarul BBQ pentru o cină în aer liber sub stele.

În interior, vei găsi finisaje de înaltă calitate pe tot parcursul, de la bucătăria gastronomică cu electrocasnice profesionale până la camera de zi confortabilă cu șemineul ei remarcabil. Ferestrele mari încadrează peisajul uimitor, aducând frumusețea naturii în interior menținând confortul și intimitatea ta.`,
      },
    },
    experience: {
      title: 'Experiența',
      subtitle: 'Mai mult decât un simplu sejur',
      forestHiking: {
        title: 'Drumeții în Pădure',
        description: 'Explorează kilometri de poteci de drumeție virgine prin pădure seculară',
      },
      stargazing: {
        title: 'Nopți Sub Stele',
        description: 'Experimentează maiestatea cerurilor nepoluate pline de stele',
      },
      campfire: {
        title: 'Foc de Tabără Lângă Lac',
        description: 'Adună-te în jurul focului pentru povești și prăjituri la lac',
      },
      dining: {
        title: 'Mese Locale de Fermă',
        description: 'Savurează bucătăria de la fermă la masă de la ferme organice din apropiere',
      },
    },
    testimonials: {
      title: 'Ce Spun Oaspeții Noștri',
      reviews: [
        {
          quote: 'Cel mai magic weekend pe care l-am avut vreodată. Trezirea în The Pine cu zăpadă căzând afară era magie pură.',
          author: 'Sarah & James',
          date: 'Decembrie 2024',
        },
        {
          quote: 'Nu am vrut să plecăm. The Cedar era impecabilă, jacuzzi-ul era incredibil, iar pădurea era chiar la ușa noastră.',
          author: 'Michael T.',
          date: 'Octombrie 2024',
        },
        {
          quote: 'O bijuterie ascunsă. Atenția la detalii în aceste cabane este remarcabilă. Planificăm deja următoarea călătorie.',
          author: 'Emily R.',
          date: 'August 2024',
        },
        {
          quote: 'Perfect pentru reuniunea noastră de familie. Copiii au adorat să exploreze traseele și noi am iubit relaxarea lângă foc.',
          author: 'Familia Anderson',
          date: 'Iulie 2024',
        },
      ],
    },
    booking: {
      title: 'Rezervă-ți Evadarea',
      subtitle: 'Selectează cabana, datele și oaspeții pentru a verifica disponibilitatea',
      selectCabin: 'Selectează Cabana',
      chooseCabin: 'Alege o cabană...',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Oaspeți',
      guest: 'oaspete',
      checkAvailability: 'Verifică Disponibilitatea',
      securePayment: 'Plată Sigură',
      instantConfirmation: 'Confirmare Instantanee',
      freeCancellation: 'Anulare Gratuită',
    },
    location: {
      title: 'Găsește-ne',
      ourLocation: 'Locația Noastră',
      gettingHere: 'Cum Ajungi Aici',
      directions: 'Din București, ia DN1 (E60) spre nord către Brașov. Continuă prin Sinaia și Bușteni. Azuga este situată între Bușteni și Predeal, la aproximativ 140 km de București. Cabanele sunt amplasate în munți cu priveliști uimitoare spre Munții Bucegi. Indicații detaliate vor fi furnizate la rezervare.',
      hoursFrom: '2 ore de la București',
      nearestAirport: 'Cel Mai Apropiat Aeroport: OTP',
      whatToBring: 'Ce Să Aduci',
      bringDescription: 'Bocanci de drumeție, haine călduroase și un spirit aventuros',
    },
    footer: {
      tagline: 'Unde pădurea întâlnește căminul. Două cabane A-frame de lux oferind o evadare de neuitat în natură.',
      quickLinks: 'Linkuri Rapide',
      ourCabins: 'Cabanele Noastre',
      contact: 'Contact',
      legal: 'Legal',
      stayInLoop: 'Rămâi la curent',
      stayDescription: 'Abonează-te pentru a primi actualizări, acces la oferte exclusive și multe altele.',
      emailPlaceholder: 'Introdu email-ul',
      subscribe: 'Abonează-te',
      rightsReserved: 'The A-Frame. Toate drepturile rezervate.',
      privacyPolicy: 'Politica de Confidențialitate',
      termsOfService: 'Termeni și Condiții',
      cancellationPolicy: 'Politica de Anulare',
    },
    cabinDetail: {
      overview: 'Prezentare Generală',
      amenities: 'Facilități',
      houseRules: 'Reguli Casă',
      exploreIn3D: 'Explorează în 3D',
      photoGallery: 'Galerie Foto',
      checkInTime: 'Check-in: 15:00 - 20:00',
      checkOut: 'Check-out: 11:00',
      maximum: 'Maxim',
      petsAllowed: 'Animalele de companie permise cu aprobare prealabilă',
      noSmoking: 'Fumatul interzis în interior',
      quietHours: 'Ore de liniște: 22:00 - 08:00',
      dragToRotate: 'Trage pentru a roti • Derulează pentru a mări',
      interactive3DModel: 'Model 3D Interactiv',
      priceBreakdown: 'Detalii Preț',
      nights: 'nopți',
      cleaningFee: 'Taxă curățenie',
      serviceFee: 'Taxă serviciu',
      total: 'Total',
      bookThisCabin: 'Rezervă Această Cabană',
      freeCancellationNote: 'Anulare gratuită cu până la 48 de ore înainte de check-in',
    },
    amenities: {
      wifi: 'WiFi',
      fireplace: 'Șemineu',
      fullKitchen: 'Bucătărie Completă',
      hotTub: 'Jacuzzi',
      forestViews: 'Vedere la Pădure',
      mountainViews: 'Vedere la Munți',
      hikingAccess: 'Acces Drumeții',
      freeParking: 'Parcare Gratuită',
      petFriendly: 'Prietenos cu Animalele',
      bbqGrill: 'Grătar BBQ',
      outdoorDining: 'Masă în Aer Liber',
    },
  },
};
