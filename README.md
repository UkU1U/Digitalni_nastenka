# 📌 Digitální nástěnka

> 🎓 Webová aplikace vytvořená jako školní projekt v rámci bakalářské práce.

Digitální nástěnka je moderní a interaktivní webová platforma sloužící k vkládání, správě a vyhledávání inzerátů, upozornění a školních informací. Aplikace klade důraz na čisté uživatelské prostředí, plynulé animace a bezpečnost obsahu.

## ✨ Hlavní funkce

*   **Autentizace uživatelů:** Bezpečná registrace, přihlášení a obnova zapomenutého hesla s ukazatelem síly hesla
*   **Správa inzerátů (CRUD):** Registrovaní uživatelé mohou vytvářet, upravovat a mazat své inzeráty. K příspěvku lze připojit až 3 fotografie
*   **AI Moderátor obsahu:** Každý nový inzerát prochází automatickou kontrolou bezpečnosti pomocí umělé inteligence (Gemini) před jeho publikováním
*   **Interaktivní komentáře:** Možnost komentovat inzeráty a odpovídat na komentáře ostatních ve víceúrovňových vláknech
*   **Filtrování a vyhledávání:** Rychlé vyhledávání pomocí našeptávače a filtrace podle kategorií (Akce, Upozornění, Nabídky, Školní info) nebo přítomnosti obrázku
*   **Tmavý a světlý režim:** Plná podpora Dark Mode s automatickým ukládáním uživatelské preference
*   **Lightbox Galerie:** Integrované zvětšení a prohlížení fotografií u inzerátů s možností navigace šipkami.

## 🛠️ Použité technologie

*   **Frontend:** HTML5, CSS3 (CSS Proměnné, Bento Grid layout), Vanilla JavaScript
*   **Backend & Databáze:** [Supabase](https://supabase.com/) (PostgreSQL) – správa uživatelů (Auth) a databáze
*   **Úložiště (Storage):** Supabase Storage pro bezpečné ukládání nahrávaných fotografií
*   **Serverless Funkce:** Supabase Edge Functions pro komunikaci s AI moderátorem
