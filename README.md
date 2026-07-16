# Frontend-övningar

Samling av övningar inom frontend-utveckling (HTML, CSS, Bootstrap, Tailwind och JavaScript). Varje övning beskrivs kort nedan — fullständiga instruktioner finns i respektive PDF.

## Övning 1 — Det linjära garaget (Flexbox)
**Filer:** `övning1.html`
**Fokus:** Flexbox – rader, kolumner, wrapping och jämn fördelning av utrymme.

Ett oorganiserat parkeringsgarage ska städas upp med Flexbox: max 800px bred och centrerad, bilarna ska ligga på rader med jämnt mellanrum, radbryta automatiskt (`flex-wrap`) vid platsbrist, och varje bil ska vara centrerad i sin ruta både vågrätt och lodrätt.

## Övning 2 — 2D garaget (CSS Grid)
**Filer:** `övning2.html`
**Fokus:** Tvådimensionell layout med CSS Grid (`grid-column` / `grid-row`).

Garaget ska byggas upp som ett 3×3-rutnät där mittenkolumnen är en tom körbana som inga bilar får stå i. Bilarna placeras på specifika rutor via grid-linjer, och en limousine (`.vip-limo`) ska spänna över två rader med `span` utan att kollidera med körbanan.

## Övning 3 — Det digitala parkeringsgaraget (Semantik, SEO & WCAG)
**Filer:** `övning3.html`, `övning3.css`
**Fokus:** Semantisk HTML5, sökmotoroptimering samt tillgänglighet (WCAG/ARIA).

En påbörjad sida full av anonyma `<div>`-element ska städas upp: rätt semantiska taggar (`header`, `nav`, `main`, `section`, `footer`), korrekt `<title>` och `meta description`, logisk rubrikhierarki, tangentbordsnavigerbara parkeringsrutor utan JavaScript, tydlig fokusindikering samt `aria-label`/`aria-hidden` för skärmläsare. Målet är 100 poäng i både Accessibility och SEO i Lighthouse.

## Övning 4 — Admin Dashboard för SmartParking (Bootstrap)
**Filer:** `övning4_bootstrap.html`
**Fokus:** Bootstrap Grid och komponenter (Cards, Tables, Badges, Modals), semantik och WCAG.

En responsiv instrumentpanel för garagepersonal ska byggas med Bootstrap: sidomeny som blir mobilanpassad, tre statistikkort (intäkter, beläggning, felanmälningar), en tabell med de senaste parkeringarna samt en sektion för felanmälningar med en "Åtgärda"-knapp som öppnar en bekräftelse-modal. Nivå 2 kräver `aria-label` på ikonknappar, korrekt fokushantering vid modal-öppning och godkänd färgkontrast.

## Övning 5 — Admin Dashboard för SmartParking (Tailwind)
**Filer:** `övning5.html`, `övning5.css`
**Fokus:** Layout med Tailwinds grid/flexbox, utility-klasser, semantik och WCAG.

Samma dashboard som Övning 4 men byggd med Tailwind CSS istället för Bootstrap. Layouten styrs med `flex`/`grid`-utility-klasser på förälderelement, statistikkort och tabell byggs med Tailwind-klasser (`divide-y`, `hover:bg-slate-50` m.m.). Nivå 2 kräver att standardfärgerna byts ut mot egna, kontrastgodkända färger via `tailwind.config`, samt `sr-only`-text och tydliga fokusringar för tillgänglighet. Målet är 100 % i Accessibility, Best Practices och SEO i Lighthouse.

## Övning 6 — Kundvagnen (Shopping Cart)
**Filer:** `Övning6.html`
**Fokus:** JavaScript — array-metoder, DOM-manipulation och händelsehantering.

Utgår från en färdig produktlista och byggs upp i tre nivåer:
- **Nivå 1:** Använda `.filter()`, `.map()` och `.reduce()` för att filtrera hårdvaruprodukter, göra om produktnamn till versaler och beräkna totalpris — allt loggat i konsolen.
- **Nivå 2:** Flytta ut logiken till DOM:en — en knapp som via `addEventListener` listar alla produkter i en `<ul>`.
- **Nivå 3:** Lägga till en "Ta bort"-knapp per produkt som via `e.target` tar bort raden från listan.

## Övning 7 — Cars (Full CRUD mot ett C# Web API)
**Filer:** `övning7/CarApi` (backend), `övning7/carweb` (frontend)
**Fokus:** Fullständig CRUD mot ett eget C# Minimal API — `fetch`, `async`/`await`, samt (i den här lösningen) Next.js Server Actions och cache-revalidering istället för ren DOM-manipulation.

Uppgiften bytte ut den föreslagna HTML/JavaScript-frontenden mot en fullstack-lösning: ett C# Minimal API (`CarApi`, SQLite via EF Core) och en Next.js/Tailwind-frontend (`carweb`) som pratar med det via Server Actions. Funktionalitet: lista, skapa, redigera och ta bort bilar, samt en "Reset DB"-knapp som återställer databasen till 100 genererade exempelbilar.

**Kom igång:**
1. **Backend** — i `övning7/CarApi`:
   ```bash
   dotnet run --launch-profile https
   ```
   API:et startar på `https://localhost:7048` (Swagger på `/swagger`) och seedar databasen automatiskt vid första körning.
2. **Frontend** — i `övning7/carweb`:
   ```bash
   npm install
   echo "NODE_TLS_REJECT_UNAUTHORIZED=0" > .env
   npm run dev
   ```
   Öppna `http://localhost:3000`. Frontenden pratar mot `https://localhost:7048/api/` som standard (kan ändras via `NEXT_PUBLIC_API_URL` i `.env`).

**Förutsättningar:** .NET 10 SDK och Node.js (med npm).
