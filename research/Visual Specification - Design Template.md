# Visual Specification - Design Template

> **TEMPLATE** - Specyfikacja wizualna dla Move Studio Pilates oparta na dostarczonych zdjęciach (jasne tło, burgund) i trendach branżowych.

---

## DESIGN CONCEPT

### Overall Theme
| Attribute | Description |
|-----------|-------------|
| **Concept Name** | Minimalist Elegance & Warmth |
| **Mood** | Spokojny, profesjonalny, kobiecy, harmonijny, butikowy. |
| **Industry Vibe** | Wellness, Premium Fitness, Health & Care. |

### Inspiration
> Styl inspirowany nowoczesnymi butikowymi studiami pilatesu, które łączą minimalizm z ciepłymi, organicznymi akcentami.

```
INSPIRATION:
- Pure Pilates Warsaw (czystość, przestrzeń)
- SOMA Warsaw (harmonia, naturalność, estetyka)
- Marki modowe z branży athleisure (np. Alo Yoga, Lululemon) - skupienie na detalu i jakości.
```

---

## COLOR PALETTE

### Primary Color - Main Brand Color
```
CONCEPT: Głęboki Burgund / Zgaszona Czerwień (odcień stroju właścicielki ze zdjęcia)
ASSOCIATIONS:
- Kobiecość, siła, energia życiowa.
- Elegancja, jakość premium, ciepło.
- Pasja do ruchu.

USAGE:
- Główne przyciski Call to Action (CTA) np. "Zapisz się".
- Kluczowe nagłówki lub akcenty w nagłówkach.
- Aktywne stany linków w nawigacji.

INTENSITY: Deep / Muted (elegancki, nie jaskrawy)
```

### Secondary Color - Supporting Color
```
CONCEPT: Jasny, chłodny beż / Złamana biel (odcień tła z grafiki "Zapisy już otwarte")
ASSOCIATIONS:
- Spokój, czystość, harmonia.
- Przestrzeń, oddech.

USAGE:
- Główne tło strony.
- Tła dla kart sekcji, aby delikatnie odcinały się od czystej bieli.

INTENSITY: Pastel / Bardzo jasny
```

### Accent Color - Highlight Color
```
CONCEPT: Delikatny, pudrowy róż / Jasny nude (odcień z tła pod ceną "-25 zł")
USAGE:
- Tła pod drobnymi elementami (np. tagi kategorii zajęć na blogu).
- Delikatne podkreślenia, linie oddzielające sekcje.
- Tła dla sekcji z opiniami klientów.

INTENSITY: Pastel
```

### Background Colors
```
LIGHT MODE:
- Main background: Złamana biel / Jasny, chłodny szaro-beżowy (hex z tła grafiki).
- Card background: Czysta biel (#FFFFFF) dla kontrastu i czytelności.
- Section alternates: Pudrowy róż / Jasny nude dla przełamania monotonii.

DARK MODE: Nie dotyczy – strona tylko w light mode.
```

### Semantic Colors
```
SUCCESS: Zgaszona, oliwkowa zieleń (pasuje do naturalnej palety).
WARNING: Ciepły, musztardowy żółty.
ERROR: Zgaszona, ceglasta czerwień.
INFO: Chłodny, zgaszony błękit/szary.
```

---

## TYPOGRAPHY

### Font Choices
```
HEADLINES:
- Style: Elegancki, szeryfowy, z kontrastem grubości linii (nawiązujący do fontu "MOVE" z grafiki).
- Font suggestion: Playfair Display, Cormorant Garamond, lub Cinzel.
- Weight: Regular / Medium (unikanie zbyt ciężkich, topornych boldów).

BODY TEXT:
- Style: Czysty, nowoczesny, wysoce czytelny bezszeryfowy font.
- Font suggestion: Montserrat (jeśli chcemy utrzymać lekki sznyt) lub klasyczny Inter / Lato.
- Weight: Light / Regular.

SPECIAL ELEMENTS (optional):
- Style: Delikatny font bezszeryfowy o stałej szerokości znaków (monospace) dla drobnych detali, dat na blogu lub cen.
- Font suggestion: Roboto Mono.
```

### Text Hierarchy
```
H1: Duży, elegancki font szeryfowy. Często z kursywą dla podkreślenia wybranych słów (np. "Twój *ruch*, Twoja siła").
H2: Font szeryfowy, mniejszy niż H1, używany do tytułów sekcji (np. "Nasze zajęcia").
H3: Font bezszeryfowy, uppercase (wielkie litery), szeroko rozstrzelone (letter-spacing) dla nazw pakietów lub imion trenerów.
Body: Font bezszeryfowy, duża interlinia (line-height: 1.6 - 1.8) dająca "oddech" tekstowi.
Small: Font bezszeryfowy, lekki, do opisów pod zdjęciami czy drobnego druku.
```

---

## VISUAL EFFECTS

> Zgodnie z trendami butikowych studiów, efekty powinny być bardzo subtelne, by nie zaburzać harmonii.

### Background Effects
```
WANT: Yes
TYPE: Solid / Subtle Texture
DESCRIPTION: Gładkie tła, ewentualnie z bardzo delikatną, niemal niewidoczną teksturą papieru (grain) dodającą organicznego, naturalnego charakteru.
```

### Card/Element Effects
```
WANT: Yes
TYPE: Shadow / Border
DESCRIPTION: Bardzo miękkie, rozmyte i jasne cienie (soft drop shadow) pod kartami zajęć. Alternatywnie – całkowity brak cieni, jedynie cienka, 1-pikselowa ramka w kolorze pudrowego różu/beżu dla maksymalnego minimalizmu.
```

### Hover Effects
```
WANT: Yes
TYPE: Lift / Color change
DESCRIPTION: 
- Karty zajęć/bloga: Delikatne uniesienie (lift) o 2-4px w górę przy najechaniu.
- Przyciski (CTA): Zmiana koloru z burgundu na nieco ciemniejszy odcień, lub powolne wypełnienie kolorem (sweep).
- Zdjęcia: Bardzo subtelny, powolny zoom-in (skalowanie 1.05x) wewnątrz kontenera.
```

### Animations
```
WANT: Yes
TYPE: Fade-in / Slide
DESCRIPTION: Płynne, powolne pojawianie się elementów (fade-in) oraz delikatne wsuwanie się z dołu (slide-up) podczas scrollowania strony. Animacje powinny być "miękkie" i nieśpieszne (easing: ease-out).
INTENSITY: Subtle
```

### Decorative Elements
```
WANT: Yes
TYPE: Lines / Minimalist Shapes
DESCRIPTION: Cienkie, eleganckie linie oddzielające sekcje (jak na grafice "ZAPISY JUŻ OTWARTE!"). Możliwe wykorzystanie delikatnych, abstrakcyjnych kształtów (np. łuki, okręgi nawiązujące do obręczy pilates) jako tła pod zdjęciami.
```

---

## COMPONENT STYLING

### Hero Section
```
LAYOUT: Split (pół na pół) lub Centered z dużym zdjęciem w tle.
BACKGROUND: Duże, wysokiej jakości zdjęcie właścicielki (np. ze sprzętem/obręczą na jasnym tle).
HEADLINE STYLE: Duży, elegancki font szeryfowy.
CTA BUTTONS: Solidny przycisk w kolorze burgundowym z napisem "Zapisz się na zajęcia".
```

### Feature Cards (Zajęcia / Usługi)
```
LAYOUT: Grid (siatka 2x2 lub 3x1 w zależności od liczby usług).
CARD STYLE: Minimalistyczne, białe tło, cienka ramka lub miękki cień.
ICONS: Zamiast ikon, preferowane wysokiej jakości, estetyczne zdjęcia z zajęć lub detale sprzętu (sprężyny, liny).
HOVER: Delikatny zoom zdjęcia i uniesienie karty.
```

### Testimonials
```
LAYOUT: Carousel (karuzela) z płynnym przesuwaniem.
CARD STYLE: Cytaty dużym fontem szeryfowym (italic), podpis autora mniejszym fontem bezszeryfowym.
BACKGROUND: Tło sekcji w kolorze pudrowego różu / jasnego beżu dla wyróżnienia od reszty strony.
```

### Contact Section
```
LAYOUT: Split (z jednej strony dane i mapa, z drugiej estetyczny formularz).
BACKGROUND: Złamana biel lub jasny beż.
EMPHASIS: Przycisk formularza w kolorze burgundowym. Minimalistyczne pola tekstowe (tylko dolna linia zamiast pełnej ramki - tzw. material design style).
```

### Navigation
```
STYLE: Solid / Transparent-to-Solid (przezroczysta na górze, po scrollu staje się biała).
POSITION: Sticky (przyklejona do góry).
CTA BUTTON: Yes - mały, elegancki przycisk "Zapisz się" (burgundowy) widoczny cały czas.
```

### Footer
```
STYLE: Light (jasny beż lub biel).
COLUMNS: 3-4 kolumny (Logo/O nas, Linki do podstron, Dane kontaktowe, Social Media).
SOCIAL ICONS: Minimalistyczne, monochromatyczne (burgund lub ciemny szary).
```

---

## PLACEHOLDER IMAGES

> Kluczowe dla branży pilates jest użycie prawdziwych, autentycznych zdjęć ze studia, a nie stockowych.

### Hero Image
```
TYPE: Photo (portret/sylwetka)
DESCRIPTION: Jasne, rozświetlone zdjęcie instruktorki/właścicielki (np. dostarczone zdjęcie z obręczą). Tło czyste, białe z naturalnymi cieniami.
MOOD: Profesjonalny, przyjazny, zapraszający, pełen energii.
```

### Section Images
```
IMAGE 1 (O nas): Zbliżenie na detal (np. dłoń na reformerze, sprężyny, faktura maty) - buduje klimat premium.
IMAGE 2 (Zajęcia grupowe): Zdjęcie kilku osób ćwiczących w harmonii, skupienie na poprawności ruchu.
IMAGE 3 (Trening indywidualny): Trenerka korygująca postawę klientki na maszynie.
```

### Team/About Images
```
TYPE: Professional headshots / Casual action shots
STYLE: Spójne, jasne tła, naturalne światło (daylight). Uśmiechnięte, otwarte postawy. Ubiór w spójnej kolorystyce (np. burgund, beż, czerń).
```

---

## RESPONSIVE DESIGN

### Mobile Priorities
```
1. Łatwy i szybki dostęp do przycisku "Zapisz się" (np. sticky button na dole ekranu w wersji mobile).
2. Czytelny grafik zajęć i cennik (brak konieczności bocznego scrollowania tabel).
3. Szybkie ładowanie zdjęć (kluczowe dla odbioru estetyki premium).
```

### Animation Behavior
```
MOBILE: Reduce (wyłączenie hover effects, uproszczenie animacji wjazdu, by nie obciążać telefonu i ułatwić nawigację).
TABLET: Keep all (zachowanie większości animacji z wersji desktop).
```

---

## ACCESSIBILITY

### Requirements
```
CONTRAST: Standard AA (szczególnie ważne przy jasnych tłach – teksty muszą być wystarczająco ciemne, np. ciemny szary zamiast jasnego szarego).
FOCUS INDICATORS: Delikatna, burgundowa obwódka przy nawigacji klawiaturą.
REDUCED MOTION: Honor system preference: Yes (wyłączenie płynnego scrollowania i animacji wjazdu, jeśli użytkownik ma włączoną opcję w systemie).
```

---

## WOW FACTORS

> Elementy wyróżniające stronę Move Studio Pilates, idealne do wdrożenia w Payload CMS.

1. **Płynne przejścia i oddech w typografii**
   > Wykorzystanie bardzo dużych marginesów (whitespace) i eleganckiej, dużej typografii szeryfowej. Strona "oddycha", co bezpośrednio nawiązuje do filozofii oddechu w pilatesie.

2. **Dynamiczny moduł Bloga/Edukacji (Payload CMS)**
   > Zamiast tylko sprzedawać, strona edukuje. Sekcja z artykułami (np. "Dlaczego pilates na reformerze?", "Pilates a bóle pleców") buduje pozycję eksperta na lokalnym rynku (Smolec/Wrocław Zachód).

3. **Subtelne mikrointerakcje (Micro-interactions)**
   > Kiedy użytkownik najeżdża na kartę zajęć, zdjęcie delikatnie przybliża się, a cienka linia pod tytułem płynnie się wydłuża. To daje poczucie obcowania z produktem premium.

4. **Moduł "Poznaj swój poziom" (Interaktywny dobór zajęć)**
   > Prosty, dynamiczny komponent (oparty na danych z CMS), w którym użytkownik klika swój cel (np. "Chcę pozbyć się bólu pleców" / "Chcę wzmocnić core"), a strona podświetla rekomendowane dla niego zajęcia.

---

## SUMMARY

| Aspect | Description |
|--------|-------------|
| **Overall Feel** | Butikowy, elegancki, spokojny i wysoce profesjonalny. Przestrzeń, która zachęca do relaksu i pracy nad ciałem. |
| **Key Colors** | Burgund (Primary), Złamana Biel/Jasny Beż (Background), Pudrowy Róż (Accent). |
| **Typography** | Połączenie eleganckiego fontu szeryfowego (nagłówki) z nowoczesnym, czystym fontem bezszeryfowym (tekst). |
| **Special Effects** | Dużo "oddechu" (whitespace), miękkie i powolne animacje fade-in, brak ciężkich cieni. |
| **Target Emotion** | Spokój, zaufanie, poczucie bycia zaopiekowanym w miejscu o wysokim standardzie. |
