# CLAUDE.md

# Babygroeiboek.nl

## Project Visie

Babygroeiboek.nl is een premium digitale baby-app waarin ouders de eerste jaren van hun kindje kunnen vastleggen.

De applicatie combineert dagelijkse verzorging, herinneringen, AI-ondersteuning en een prachtig digitaal babyboek.

Het doel is niet om alleen data op te slaan.

Het doel is om een applicatie te bouwen waar ouders over 10 of 20 jaar nog steeds met plezier in terugkijken.

Iedere pagina moet rust uitstralen.
Iedere interactie moet intuïtief voelen.
Iedere functionaliteit moet eenvoudig te gebruiken zijn.

De primaire doelgroep zijn jonge ouders, waarbij de moeder de belangrijkste gebruiker is. De applicatie moet daarom warm, premium, vriendelijk en minimalistisch aanvoelen.

---

# Design Filosofie

Gebruik de designfilosofie van Donsje Amsterdam.

Belangrijke eigenschappen:

- Premium uitstraling
- Veel witruimte
- Rustige kleuren
- Mooie fotografie
- Serif headings
- Minimalistische interface
- Grote touch targets
- Organische vormen
- Subtiele animaties
- Luxe uitstraling
- Geen drukke dashboards
- Geen felle kleuren
- Alles moet elegant ogen

Inspiratie:

- Donsje Amsterdam
- Apple
- Notion
- Headspace
- Calm

---

# Brand Keywords

Premium

Warm

Motherhood

Luxury

Minimal

Organic

Elegant

Calm

Soft

Timeless

Family

---

# Kleuren

## Achtergrond

#F8F5F1

## Cards

#FFFFFF

## Primary

#6D5B4B

## Secondary

#A28C74

## Borders

#EAE4DD

## Success

#98B58A

## Warning

#D5A766

## Error

#C97A73

---

# Typografie

## Headings

Cormorant Garamond

## Body

Inter

## Buttons

Inter SemiBold

---

# Iconen

Gebruik uitsluitend minimalistische outline iconen.

Voorkeur:

Lucide Icons

Geen gevulde iconen.

---

# Tone of Voice

Schrijf alsof je tegen jonge ouders praat.

Rustig.

Warm.

Lief.

Persoonlijk.

Nooit zakelijk.

Nooit technisch.

Nooit schreeuwerig.

---

# Technologie

Framework

- Next.js (App Router)

Language

- TypeScript

Styling

- TailwindCSS

UI

- shadcn/ui

Database

- Supabase PostgreSQL

Authentication

- Supabase Auth

Storage

- Supabase Storage

State

- React Query

Animation

- Framer Motion

Validation

- Zod

Charts

- Recharts

Deployment

- Vercel

---

# Architectuur

Gebruik een schaalbare folderstructuur.

Iedere feature krijgt zijn eigen map.

Gebruik server components waar mogelijk.

Gebruik client components alleen wanneer nodig.

Geen duplicated code.

Geen inline business logic.

Maak herbruikbare componenten.

Gebruik strikte TypeScript types.

Gebruik consistente naamgeving.

---

# Responsive

Mobile First.

Mobiel is belangrijker dan desktop.

Iedere pagina moet perfect werken op:

- iPhone
- Android
- Tablet
- Desktop

Gebruik grote knoppen.

Gebruik swipe waar logisch.

Alles moet met één hand bedienbaar zijn.

---

# Authenticatie

Login via Google.

Gebruik Supabase Auth.

Een gezin bestaat uit meerdere gebruikers.

Voorbeeld:

Moeder

Vader

Later uitbreidbaar naar:

- Opa
- Oma
- Oppas
- Verzorger

Iedere gebruiker heeft een rol.

---

# Database Structuur

Gebruik relationele tabellen.

Minimaal:

profiles

families

babies

feeds

sleep_sessions

diapers

growth

milestones

photos

visitors

notes

hard_moments

photo_reminders

timeline

ai_insights

yearbooks

notifications

---

# Dashboard

Na het inloggen komt de gebruiker op een persoonlijk dashboard.

Toon:

Welkom

Foto van de baby

Leeftijd

Volgende mijlpaal

Laatste voeding

Laatste slaap

Laatste luier

AI Tip van vandaag

Recente foto's

Aankomende herinneringen

Snel acties

---

# Functionaliteiten

## 1. Luiers

Bijhouden:

- Plas
- Poep
- Beide
- Tijd
- Datum
- Opmerking

Mogelijkheden:

- Toevoegen
- Bewerken
- Verwijderen

Toon statistieken.

---

## 2. Slaap

Eigen pagina.

Start timer.

Stop timer.

Handmatig toevoegen.

Bewerken.

Verwijderen.

Statistieken:

- Totale slaap vandaag
- Gemiddelde slaap
- Langste slaap
- Kortste slaap

AI analyse:

Op basis van leeftijd geeft AI advies over:

- optimale wakkertijd
- aanbevolen dutjes
- aanbevolen bedtijd

---

## 3. Voeding

Ondersteun:

Borstvoeding

Flesvoeding

Later:

Vaste voeding

Fles:

- aantal ml

Borstvoeding:

- links
- rechts
- beide

Intensiteit:

- Kort
- Normaal
- Lang

Mogelijkheden:

Toevoegen

Bewerken

Verwijderen

AI analyse:

Herkent patronen.

Geeft voedingsinzichten.

---

## 4. Groei

Bijhouden:

Gewicht

Lengte

Hoofdomtrek

Toon grafieken.

Gebruik WHO groeicurves.

AI legt groeiontwikkeling begrijpelijk uit.

---

## 5. Mijlpalen

Automatisch verdeeld per leeftijd.

### 0-1 maand

- Eerste oogcontact
- Eerste glimlach
- Eerste bad
- Eerste wandeling
- Eerste nageltjes geknipt
- Eerste autorit
- Eerste bezoek opa en oma

### 2-3 maanden

- Hoofd optillen
- Omrollen
- Bewust lachen
- Geluidjes maken

### 4-6 maanden

- Eerste hapje
- Rollen
- Speelgoed pakken
- Zitten met hulp

### 6-9 maanden

- Zelf zitten
- Kruipen
- Klappen
- Naam herkennen

### 9-12 maanden

- Eerste woordje
- Langs meubels lopen
- Eerste stapjes
- Eerste verjaardag voorbereiden

Iedere mijlpaal bevat:

- Datum
- Foto
- Notitie
- Favoriet

---

## 6. Pittige Momenten

Pagina waarin moeilijke momenten worden bijgehouden.

Standaard categorieën:

- Veel huilen
- Krampjes
- Spugen
- Slechte nacht
- Tandjes
- Koorts
- Vaccinatie
- Onrust
- Verkoudheid

Eigen notitie mogelijk.

AI zoekt patronen.

---

## 7. Foto Dagboek

Automatische herinneringen.

1 dag

1 week

2 weken

1 maand

2 maanden

3 maanden

4 maanden

5 maanden

6 maanden

9 maanden

12 maanden

18 maanden

2 jaar

Iedere foto bevat:

- Foto
- Datum
- Leeftijd
- Notitie
- Favoriet

---

## 8. Kraambezoek

Bijhouden van bezoekers.

Velden:

Naam

Datum

Foto

Relatie

Cadeau

Persoonlijke notitie

Leuke herinnering

---

## 9. Baby Profiel

Gegevens:

Naam

Roepnaam

Geboortedatum

Geboortetijd

Gewicht

Lengte

Hoofdomtrek

Ziekenhuis

Verloskundige

Bloedgroep

Allergieën

Medicatie

Huisarts

Zorgverzekering

Foto

---

## 10. Gebruikers

Google Login.

Papa en mama beheren samen dezelfde baby.

Later uitbreidbaar.

---

# Tijdlijn

Maak een prachtige tijdlijn van het eerste levensjaar.

Hier komen automatisch alle gebeurtenissen samen.

Voorbeelden:

- Geboorte
- Voedingen
- Slaapjes
- Luiers
- Foto's
- Mijlpalen
- Kraambezoek
- Groei
- Notities

Alles wordt chronologisch weergegeven.

Deze pagina moet voelen als een digitaal dagboek.

---

# Slimme AI Inzichten

AI moet ondersteunen.

Niet vervangen.

Geef onder andere inzichten zoals:

"Je baby slaapt de afgelopen week gemiddeld 45 minuten langer."

"Na voedingen van meer dan 150 ml volgt meestal binnen 40 minuten een slaapje."

"Er lijken meer huilmomenten te zijn op dagen met minder middagslaap."

"Gemiddeld zijn er 7 voedingen per dag."

Iedere week maakt AI automatisch een samenvatting.

Iedere maand maakt AI een groeiverslag.

---

# Jaarboek

Aan het einde van ieder jaar moet automatisch een prachtig digitaal jaarboek kunnen worden gegenereerd.

Inhoud:

- Mooiste foto's
- Belangrijkste mijlpalen
- AI geschreven verhalen
- Groei grafieken
- Eerste keren
- Favoriete herinneringen
- Tijdlijn
- Statistieken
- Notities

Het jaarboek moet eruitzien als een luxe fotoboek.

Later uitbreidbaar naar een gedrukt boek.

---

# AI Functionaliteiten

AI ondersteunt onder andere:

- Slaapadvies
- Voedingsanalyse
- Groei uitleg
- Persoonlijke tips
- Wekelijkse samenvatting
- Maandelijkse samenvatting
- Tijdlijn samenvatten
- Jaarboek schrijven

AI mag nooit medische diagnoses stellen.

---

# Meldingen

Ondersteun push notificaties.

Voorbeelden:

- Tijd voor een foto
- Tijd voor voeding
- Mogelijk dutje
- Nieuwe mijlpaal
- Weeksamenvatting beschikbaar

---

# Privacy

AVG compliant.

Alle data is privé.

Gebruik Row Level Security.

Geen publieke buckets.

Iedere query scoped op family_id.

Iedere upload beveiligd.

Geen gevoelige data loggen.

---

# Performance

Laadtijd onder 2 seconden.

Gebruik lazy loading.

Gebruik image optimalisatie.

Gebruik caching.

Voorkom onnodige renders.

---

# Toegankelijkheid

Gebruik correcte semantische HTML.

Ondersteun toetsenbordnavigatie.

Ondersteun screenreaders.

Voldoende kleurcontrast.

---

# Development Rules

Schrijf uitsluitend productieklare code.

Geen mock code.

Geen TODO's.

Geen tijdelijke oplossingen.

Refactor waar nodig.

Gebruik consistente naamgeving.

Gebruik herbruikbare componenten.

Voer altijd een kwaliteitscontrole uit voordat een feature als afgerond wordt beschouwd.

Code moet schaalbaar, onderhoudbaar en uitbreidbaar zijn.

Denk altijd vooruit.

De applicatie moet zonder grote wijzigingen kunnen doorgroeien naar een platform met meerdere kinderen, meerdere gezinsleden en premium abonnementen.
