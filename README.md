# Digitální nástěnka

Tento repozitář obsahuje zdrojové kódy webové aplikace fungující jako digitální nástěnka. Projekt vznikl jako praktická část bakalářské práce.

# Digital Noticeboard

This repository contains the source code of a web application functioning as a digital noticeboard. The project was created as the practical part of a bachelor’s thesis.

---

## 📖 O projektu

Aplikace slouží k interaktivnímu vkládání, správě a vyhledávání inzerátů, upozornění a školních informací. Poskytuje uživatelům přehledné prostředí pro sdílení obsahu a komunitní diskusi. Aplikace je navržena s důrazem na čisté uživatelské rozhraní, bezpečnost obsahu (díky automatické AI moderaci) a plynulý chod.

## 📖 About the project

The application is used to interactively post, manage, and search for classifieds, notices, and school information. It provides users with a clear environment for content sharing and community discussion. The app is designed with an emphasis on a clean user interface, content safety (thanks to automated AI moderation), and smooth performance.

---

## ✨ Hlavní funkce

*   **Evidence inzerátů:** Přidávání, úprava a mazání vlastních příspěvků s možností nahrát až 3 fotografie.
*   **AI Moderování obsahu:** Každý nový inzerát (text) prochází před publikováním automatickou bezpečnostní kontrolou pomocí umělé inteligence (Gemini).
*   **Filtrování a vyhledávání:** Rychlé prohledávání obsahu pomocí našeptávače a filtrace podle kategorií (Akce, Upozornění, Nabídky, Školní info).
*   **Interaktivní diskuse:** Možnost komentovat inzeráty a odpovídat na komentáře ostatních ve víceúrovňových vláknech.
*   **Uživatelská nastavení:** Plná podpora tmavého a světlého režimu (Dark/Light mode) s automatickým ukládáním preference.

## ✨ Key features

*   **Ad management:** Add, edit, and delete personal posts with the option to upload up to 3 photos.
*   **AI Content Moderation:** Every new post (text) undergoes an automatic safety check using artificial intelligence (Gemini) before publication.
*   **Filtering and search:** Quick content search using autocomplete and category filtering (Events, Notices, Offers, School Info).
*   **Interactive discussion:** The ability to comment on ads and reply to others' comments in multi-level threads.
*   **User settings:** Full support for dark and light modes with automatic preference saving.

---

## 🛠️ Použité technologie

*   **Frontend:** HTML5, CSS3 (CSS Proměnné, Bento Grid layout), Vanilla JavaScript
*   **Backend & Databáze:** Supabase (PostgreSQL), Supabase Auth
*   **Úložiště (Storage):** Supabase Storage (pro nahrávání obrázků)
*   **Serverless & AI:** Supabase Edge Functions, Google Gemini API

## 🛠️ Technologies used

*   **Frontend:** HTML5, CSS3 (CSS Variables, Bento Grid layout), Vanilla JavaScript
*   **Backend & Database:** Supabase (PostgreSQL), Supabase Auth
*   **Storage:** Supabase Storage (for image uploads)
*   **Serverless & AI:** Supabase Edge Functions, Google Gemini API

---

## 🚀 Spuštění projektu

Projekt lze spustit či vyzkoušet třemi způsoby:

### Možnost 1: Živá ukázka (Online)
Aplikace je nasazena a plně funkční. Můžete si ji prohlédnout přímo v prohlížeči bez nutnosti cokoliv stahovat:
👉 **[Otevřít Digitální nástěnku](https://digitalninastenka.netlify.app/)**

### Možnost 2: Stažení jako .zip
1. Na hlavní stránce repozitáře klikněte na zelené tlačítko **Code**.
2. Zvolte možnost **Download ZIP**.
3. Stažený archiv rozbalte/extrahujte na plochu svého počítače.
4. Poté stačí kliknout přímo na soubor `index.html` pro spuštění, případně můžete složku otevřít ve svém editoru (např. VS Code) a spustit ho přes lokální server (např. rozšíření *Live Server*).

### Možnost 3: Klonování přes Git
1. Naklonujte si repozitář: `git clone https://github.com/UkU1U/Digitalni_nastenka.git`
2. Otevřete složku a spusťte `index.html`.

## 🚀 Running the project

The project can be run or tested in three ways:

### Option 1: Live Demo (Online)
The application is deployed and fully functional online. You can view it directly in your browser without downloading anything:
👉 **[Open Digital Noticeboard](https://digitalninastenka.netlify.app/)**

### Option 2: Download as .zip
1. On the repository main page, click the green **Code** button.
2. Select **Download ZIP**.
3. Extract the downloaded archive to your desktop.
4. Afterwards, you can simply click directly on `index.html` to run it, or open the project folder in your editor (e.g., VS Code) and run `index.html` via a local server (e.g., the *Live Server* extension).

### Option 3: Clone via Git
1. Clone the repository: `git clone https://github.com/UkU1U/Digitalni_nastenka.git`
2. Open the folder and run `index.html`.

---

## 📄 Licence

Tento projekt byl vytvořen pro akademické účely jako praktická část bakalářské práce. Zpracování osobních údajů probíhá výhradně pro potřeby autentizace uživatelů a není předáváno třetím stranám.

## 📄 License

This project was created for academic purposes as the practical part of a bachelor’s thesis. The processing of personal data is carried out exclusively for user authentication purposes and is not shared with third parties.

---

## Screens
Hlavní stránka

Light mode

<img width="1919" height="1079" alt="Snímek obrazovky 2026-08-20 143848" src="https://github.com/user-attachments/assets/664264be-4f2d-4713-9959-8ecc24bfcb52" />

Dark mode
<img width="1919" height="1079" alt="Snímek obrazovky 2026-08-20 142701" src="https://github.com/user-attachments/assets/db6122fd-4d00-41cc-9d51-da3fdd43684d" />


Bento Grid layout (Light mode)

<img width="1330" height="704" alt="Snímek obrazovky 2026-08-20 124759" src="https://github.com/user-attachments/assets/b4c7553c-87a0-46bc-9a18-1e54a0f8d3f2" />


Bento Grid layout (Dark mode)

<img width="1321" height="1001" alt="Snímek obrazovky 2026-08-20 124832" src="https://github.com/user-attachments/assets/03fc7666-75ee-4526-913c-4b98040e755a" />


AI kontrola

<img width="588" height="892" alt="Snímek obrazovky 2026-08-20 141956" src="https://github.com/user-attachments/assets/3b73173d-500a-4048-a0be-6d2007023ff2" />

Detail inzerátu

<img width="563" height="803" alt="Snímek obrazovky 2026-08-20 142534" src="https://github.com/user-attachments/assets/7d055cd6-5511-432c-b934-6c39980d8853" />

<img width="576" height="478" alt="Snímek obrazovky 2026-08-20 143620" src="https://github.com/user-attachments/assets/d3c820ed-e701-4a8d-a854-afe4ad15f32f" />


Změna osobních údajů

<img width="1919" height="1079" alt="Snímek obrazovky 2026-08-20 142445" src="https://github.com/user-attachments/assets/3d059f61-6740-4cd6-9479-b4999174ac09" />
