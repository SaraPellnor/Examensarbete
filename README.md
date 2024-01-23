# Projektets namn: EXAMENSARBETE

## Beskrivning
Det här projektet är en e-handelsplattform för hudvårdsprodukter. Den består av både en frontend och en backend, där frontend är utvecklad med React (JavaScript) och backend är byggd med Node.js och Express.js. Databasen som används är MongoDB och betallösningen är Stripe checkout

## Beroenden

Du behöver installera:
- VS Code
- Node.js

## Struktur

Projektet är organiserat på följande sätt:

```
EXAMENSARBETE/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- App.js
|   |   |-- index.js
|   |-- package.json
|-- backend/
|-- |-- rsc/
|   |   |-- routes/
|   |   |-- models/
|   |   |-- controllers/
|   |-- server.js
|   |-- package.json
|-- README.md
```

- **frontend:** Innehåller React-appen för användargränssnittet.
  - **src:** Här finns React-komponenter och sidor.
  - **package.json:** Paketinformation och skript för frontend.

- **backend:** Innehåller Node.js och Express.js-servern för att hantera affärslogik och kommunicera med databasen.
  - **routes:** Definierar API-rutter.
  - **models:** Innehåller MongoDB-modeller för datahantering.
  - **controllers:** Hanterar logiken för varje rutt.
  - **server.js:** Huvudfilen som startar servern.
  - **package.json:** Paketinformation och skript för backend.

## Installation

För att köra projektet lokalt, följ dessa steg:

1. Klona projektet från GitHub-repositoriet:

```bash
git clone https://github.com/SaraPellnor/Examensarbete.git

```
Öppna mappen i VS Code

2. Installera beroenden för både frontend och backend:

```bash
# I frontend-mappen
cd frontend
npm install

# I backend-mappen
cd ../backend
npm install
```

3. Starta både frontend och backend:

```bash
# I frontend-mappen
npm npm run dev

# I backend-mappen
npm nodemon server.js
```

Nu bör du kunna öppna webbläsaren och gå till (http://localhost:5173) för att se den lokala versionen av hudvårdsbutiken.

## Konfiguration

Du kan konfigurera anslutningen till MongoDB genom att lägga till en .env i `backend/` och ange dina egna keys.

SESSION_CONNECTION_KEY=
DB_CONNECTION_URL=
STRIPE_CONNECTION_KEY=
CLIENT_URL=

---