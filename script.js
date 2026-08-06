/* =========================================
   INICIALIZACE SUPABASE DATABÁZE
   ========================================= */
const SUPABASE_URL = 'https://dnapggtvokopinoetqwp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuYXBnZ3R2b2tvcGlub2V0cXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1ODMyNjYsImV4cCI6MjEwMTE1OTI2Nn0.af56Bt1hMOz2V4MnDkuwqqi--28CW9yodIInGWEzqD4';

const dbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('keydown', (e) => {
    // Zavírání pomocí klávesy esc
    if (e.key === 'Escape') {
        
        // Zvětšený obrázek (Lightbox)
        // Musí být první, aby se při jeho zavírání nezavřel i detail pod ním
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display === 'flex') {
            closeLightbox();
            return; // Ukončí kód, dál nepokračuje
        }

        // Modál pro detail inzerátu
        const detailModal = document.getElementById('detailModal');
        if (detailModal && detailModal.style.display === 'flex') {
            clearDetailModal();
            return; // Ukončí kód, dál nepokračuje
        }

        // Modál pro přihlášení/registraci
        const authModal = document.getElementById('authModal');
        if (authModal && authModal.style.display === 'flex') {
            authModal.style.display = 'none';
            clearLoginForm();
            clearRegisterForm();
            clearAuthMessages();
            return; // Ukončí kód, dál nepokračuje
        }

        // Modál pro přidání inzerátu
        const addPostModal = document.getElementById('addPostModal');
        if (addPostModal && addPostModal.style.display === 'flex') {
            addPostModal.style.display = 'none';
            clearAddPostForm();
            return; // Ukončí kód, dál nepokračuje
        }
    }

    // Přepínání obrázku pomocí šipek
    const lightbox = document.getElementById('lightbox'); 
    
    // Zkontrolujeme, zda je lightbox zrovna otevřený
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.getElementById('lightboxPrev');
            if (prevBtn && prevBtn.style.display !== 'none') prevBtn.click();
        } 
        else if (e.key === 'ArrowRight') {
            const nextBtn = document.getElementById('lightboxNext');
            if (nextBtn && nextBtn.style.display !== 'none') nextBtn.click();
        }
    }
});


/* =========================================
   SPRÁVA VYBRANÝCH OBRÁZKŮ (MAX 3)
   ========================================= */
let selectedFiles = []; 

const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('imagePreviewContainer');

if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        if (selectedFiles.length + files.length > 3) {
            showAddPostError('Můžete nahrát maximálně 3 fotografie.');
            imageInput.value = '';
            return;
        }
        clearAddPostError();

        files.forEach(file => {
            if (selectedFiles.length < 3) {
                selectedFiles.push(file);
            }
        });

        imageInput.value = ''; 
        renderImagePreviews();
    });
}

function renderImagePreviews() {
    if (!previewContainer) return;
    previewContainer.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position: relative; width: 70px; height: 70px; border-radius: 8px; overflow: hidden; border: 1px solid #ccc;';
            
            wrapper.innerHTML = `
                <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">
                <button type="button" data-index="${index}" class="remove-img-btn" style="position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center;">✕</button>
            `;

            wrapper.querySelector('.remove-img-btn').addEventListener('click', (ev) => {
                const idx = parseInt(ev.target.dataset.index);
                selectedFiles.splice(idx, 1);
                renderImagePreviews();
            });

            previewContainer.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
    });
}

/* =========================================
   ZOBRAZENÍ HESLA A IKONKY OČÍČKA
   ========================================= */
const pwdInputs = document.querySelectorAll('.pwd-input');
pwdInputs.forEach(input => {
    const icon = input.nextElementSibling;
    
    // Zobrazí ikonku, jen když je v poli text
    input.addEventListener('input', () => {
        icon.style.display = input.value.length > 0 ? 'block' : 'none';
    });

    // Při prokliku přepne typ inputu a změní barvu ikonky
    icon.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            icon.style.fill = '#3b82f6'; // Modrá, když je heslo vidět
        } else {
            input.type = 'password';
            icon.style.fill = ''; // Vrátí do původního stavu
        }
    });
});

/* =========================================
   LOGIKA PRO DARK MODE
   ========================================= */
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

function updateButtonTitle(isDarkMode) {
    if (isDarkMode) {
        toggleButton.setAttribute('title', 'Přepnout na světlý vzhled');
    } else {
        toggleButton.setAttribute('title', 'Přepnout na tmavý vzhled');
    }
}

const currentMode = localStorage.getItem('dark-mode');
if (currentMode === 'enabled') {
    body.classList.add('dark-mode');
    updateButtonTitle(true);
} else {
    updateButtonTitle(false);
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkModeActive = body.classList.contains('dark-mode');
    
    if (isDarkModeActive) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
    updateButtonTitle(isDarkModeActive);
});

/* =========================================
   POMOCNÉ FUNKCE PRO ČIŠTĚNÍ FORMULÁŘŮ
   ========================================= */
const loginView = document.getElementById('loginView');
const registerView = document.getElementById('registerView');
const addPostModal = document.getElementById('addPostModal');
const detailModal = document.getElementById('detailModal');
const commentInput = document.getElementById('commentInput');
const resetView = document.getElementById('resetView');

function clearLoginForm() {
    if (!loginView) return;
    const rememberMe = loginView.querySelector('input[type="checkbox"]');
    if (!rememberMe || !rememberMe.checked) {
        loginView.querySelectorAll('input[type="email"], .pwd-input').forEach(input => {
            input.value = '';
            
            // Pokud je to pole pro heslo, vyresetujeme i očíčko a typ
            if (input.classList.contains('pwd-input')) {
                input.type = 'password';
                const icon = input.nextElementSibling;
                if (icon) {
                    icon.style.display = 'none';
                    icon.style.fill = '';
                }
            }
        });
    }
}

    function clearRegisterForm() {
    if (!registerView) return;
    registerView.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
            
            // Reset hesla a očíčka
            if (input.classList.contains('pwd-input')) {
                input.type = 'password';
                const icon = input.nextElementSibling;
                if (icon) {
                    icon.style.display = 'none';
                    icon.style.fill = '';
                }
            }
        }
    });

    // Reset ukazatele síly hesla
    if (strengthBar) {
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = 'transparent';
    }
}

function clearAddPostForm() {
    if (!addPostModal) return;
    const titleInput = addPostModal.querySelector('.auth-input-group input[type="text"]');
    const descTextarea = addPostModal.querySelector('.auth-textarea');
    const categorySelect = document.getElementById('postCategory'); // Načtení selectu podle ID
    
    if (titleInput) titleInput.value = '';
    if (descTextarea) descTextarea.value = '';
    if (categorySelect) categorySelect.value = ''; // Návrat na výchozí prázdnou volbu
    if (imageInput) imageInput.value = '';
    
    selectedFiles = [];
    currentExistingImages = [];
    editingPostId = null;

    if (previewContainer) previewContainer.innerHTML = '';
    const titleEl = addPostModal.querySelector('.add-post-title');
    if (titleEl) titleEl.innerText = "Nový inzerát";
    if (publishBtn) publishBtn.innerText = "Publikovat";
    clearAddPostError();
}

let replyingToId = null; 

function clearDetailModal() {
    if (detailModal) detailModal.style.display = 'none';
    if (commentInput) {
        commentInput.value = '';
        commentInput.placeholder = "Napište komentář...";
    }
    replyingToId = null;
}

function showAddPostError(message) {
    let errorBox = addPostModal.querySelector('.modal-error-msg');
    if (!errorBox) {
        errorBox = document.createElement('div');
        errorBox.className = 'modal-error-msg';
        errorBox.style.cssText = 'background-color: #ef4444; color: white; padding: 10px 14px; border-radius: 10px; margin-bottom: 15px; font-size: 14px; line-height: 1.4; font-weight: 500; text-align: left;';
        const content = addPostModal.querySelector('.auth-content');
        const title = addPostModal.querySelector('.auth-title');
        content.insertBefore(errorBox, title.nextSibling);
    }
    errorBox.innerText = message;
    errorBox.style.display = 'block';
}

function clearAddPostError() {
    const errorBox = addPostModal.querySelector('.modal-error-msg');
    if (errorBox) errorBox.style.display = 'none';
}

/* =========================================
   PŘIHLÁŠENÍ A REGISTRACE (SUPABASE)
   ========================================= */
let isUserLoggedIn = false;
let currentUser = null;

const loggedOutState = document.getElementById('loggedOutState');
const loggedInState = document.getElementById('loggedInState');
const profileDropdown = document.getElementById('profileDropdown');

function updateHeaderState() {
    if (isUserLoggedIn) {
        loggedOutState.style.display = 'none';
        loggedInState.style.display = 'flex';
    } else {
        loggedOutState.style.display = 'block';
        loggedInState.style.display = 'none';
        profileDropdown.style.display = 'none';
    }
}

function showAuthMessage(view, message, isSuccess = false) {
    let msgBox = view.querySelector('.auth-msg-box');
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.className = 'auth-msg-box';
        const title = view.querySelector('.auth-title');
        title.insertAdjacentElement('afterend', msgBox);
    }
    msgBox.style.cssText = `background-color: ${isSuccess ? '#10b981' : '#ef4444'}; color: white; padding: 10px 14px; border-radius: 10px; margin-bottom: 15px; font-size: 14px; font-weight: 500; text-align: center;`;
    msgBox.innerText = message;
    msgBox.style.display = 'block';
}

function clearAuthMessages() {
    document.querySelectorAll('.auth-msg-box').forEach(el => el.style.display = 'none');
}

document.getElementById('registerSubmitBtn').addEventListener('click', async () => {
    clearAuthMessages();
    const inputs = registerView.querySelectorAll('.auth-input');
    const firstName = inputs[0].value.trim();
    const lastName = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const password = inputs[3].value;
    const checkbox = registerView.querySelector('input[type="checkbox"]');

    if (!firstName || !lastName || !email || !password) return showAuthMessage(registerView, 'Prosím, vyplňte všechna pole.');
    if (!checkbox.checked) return showAuthMessage(registerView, 'Musíte souhlasit se zpracováním osobních údajů.');

    const btn = document.getElementById('registerSubmitBtn');
    btn.innerText = 'Zpracovávám...';
    btn.disabled = true;

    const { error } = await dbClient.auth.signUp({
        email: email,
        password: password,
        options: { data: { first_name: firstName, last_name: lastName } }
    });

    btn.innerText = 'Registrovat';
    btn.disabled = false;

    if (error) showAuthMessage(registerView, 'Chyba: ' + error.message);
    else {
        showAuthMessage(registerView, 'Úspěch! Zkontrolujte svůj e-mail a klikněte na potvrzovací odkaz.', true);
        clearRegisterForm();
    }
});

document.getElementById('loginSubmitBtn').addEventListener('click', async () => {
    clearAuthMessages();
    const inputs = loginView.querySelectorAll('.auth-input');
    const email = inputs[0].value.trim();
    const password = inputs[1].value;

    if (!email || !password) return showAuthMessage(loginView, 'Vyplňte e-mail a heslo.');

    const btn = document.getElementById('loginSubmitBtn');
    btn.innerText = 'Přihlašuji...';
    btn.disabled = true;

    const { error } = await dbClient.auth.signInWithPassword({ email: email, password: password });

    btn.innerText = 'Přihlásit';
    btn.disabled = false;

    if (error) showAuthMessage(loginView, 'Chyba přihlášení: Nesprávný e-mail nebo heslo.');
    else {
        authModal.style.display = 'none';
        clearLoginForm();
    }
});

document.getElementById('resetSubmitBtn').addEventListener('click', async () => {
    clearAuthMessages();
    const emailInput = document.getElementById('resetEmailInput');
    const email = emailInput.value.trim();

    if (!email) {
        return showAuthMessage(resetView, 'Prosím, zadejte svůj e-mail.');
    }

    const btn = document.getElementById('resetSubmitBtn');
    btn.innerText = 'Odesílám...';
    btn.disabled = true;

    // Volání Supabase funkce pro obnovu hesla
    const { error } = await dbClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin // Uživatele to po kliknutí na mail vrátí zpět na hlavní stránku
    });

    btn.innerText = 'Odeslat odkaz';
    btn.disabled = false;

    if (error) {
        showAuthMessage(resetView, 'Chyba: ' + error.message);
    } else {
        showAuthMessage(resetView, 'Úspěch! Zkontrolujte svůj e-mail (i složku Spam).', true);
        emailInput.value = '';
    }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await dbClient.auth.signOut();
    profileDropdown.style.display = 'none';

    // Reset rozhraní do výchozího (domovského) stavu
    const profileSettingsContainer = document.getElementById('profileSettingsContainer');
    const postGrid = document.getElementById('postGrid');
    const asideFilters = document.querySelector('aside');
    const searchBarContainer = document.querySelector('.search-bar');
    const myPostsBanner = document.getElementById('myPostsBanner');
    
    // 1. Skryjeme sekce dostupné pouze přihlášeným uživatelům
    if (profileSettingsContainer) profileSettingsContainer.style.display = 'none';
    if (myPostsBanner) myPostsBanner.style.display = 'none';
    
    // 2. Obnovíme zobrazení hlavní mřížky, filtrů a vyhledávání
    if (postGrid) postGrid.style.display = 'grid';
    if (asideFilters) asideFilters.style.display = 'block';
    if (searchBarContainer) searchBarContainer.style.display = 'flex';
    
    // 3. Vypneme filtr "Moje inzeráty" a zobrazíme všechny
    isMyPostsMode = false;
    if (typeof filterPosts === 'function') filterPosts();
});

document.getElementById('profileMenuBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.style.display = profileDropdown.style.display === 'flex' ? 'none' : 'flex';
});

dbClient.auth.onAuthStateChange((event, session) => {
    if (session) {
        isUserLoggedIn = true;
        currentUser = session.user;
    } else {
        isUserLoggedIn = false;
        currentUser = null;
    }
    updateHeaderState();
});

function getFullName() {
    if (!currentUser) return "Anonym";
    const meta = currentUser.user_metadata;
    if (meta.first_name && meta.last_name) return `${meta.first_name} ${meta.last_name}`;
    return currentUser.email.split('@')[0];
};

/* =========================================
   MODÁLNÍ OKNA
   ========================================= */
const authModal = document.getElementById('authModal');
const closeAuthModalBtn = document.getElementById('closeAuthModal');
const loginBtn = document.getElementById('showLoginModalBtn');

if (loginBtn && authModal) {
    loginBtn.addEventListener('click', () => {
        authModal.style.display = 'flex';
        toggleAuthView('login');
    });
}

if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
        clearLoginForm();
        clearRegisterForm();
        clearAuthMessages();
    });
}

window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        clearLoginForm();
        clearRegisterForm();
        clearAuthMessages();
    }
});

function toggleAuthView(viewName) {

    // Skryjeme všechny pohledy
    if (loginView) loginView.style.display = 'none';
    if (registerView) registerView.style.display = 'none';
    if (resetView) resetView.style.display = 'none';

    // Zobrazíme ten správný
    if (viewName === 'register') {
        registerView.style.display = 'block';
        clearRegisterForm();
    } else if (viewName === 'reset') {
        resetView.style.display = 'block';
        const resetEmail = document.getElementById('resetEmailInput');
        if (resetEmail) resetEmail.value = ''; // Vyčištění pole při otevření
    } else {
        loginView.style.display = 'block';
        clearLoginForm();
    }
}

const closeAddPostModalBtn = document.getElementById('closeAddPostModal');
const addPostBtn = document.getElementById('showAddPostModalBtn');

if (addPostBtn && addPostModal) {
    addPostBtn.addEventListener('click', () => {
        clearAddPostForm();
        addPostModal.style.display = 'flex';
    });
}

if (closeAddPostModalBtn) {
    closeAddPostModalBtn.addEventListener('click', () => {
        addPostModal.style.display = 'none';
        clearAddPostForm();
    });
}

const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
if (closeDetailModalBtn) {
    closeDetailModalBtn.addEventListener('click', clearDetailModal);
}

window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        clearLoginForm();
        clearRegisterForm();
    }
    if (e.target === addPostModal) {
        addPostModal.style.display = 'none';
        clearAddPostForm();
    }
    if (e.target === detailModal) clearDetailModal();
    
    if (isUserLoggedIn && !e.target.closest('#profileDropdown') && e.target.id !== 'profileMenuBtn') {
        profileDropdown.style.display = 'none';
    }
    if (!e.target.closest('.search-bar')) {
        document.getElementById('autocomplete').style.display = 'none';
    }
});

/* =========================================
   VYHLEDÁVÁNÍ
   ========================================= */
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('autocomplete');

function getPosts() {
    return [...document.querySelectorAll('.card')];
}

searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    dropdown.innerHTML = '';
    dropdown.style.display = q ? 'block' : 'none';

    getPosts().forEach(post => {
        const titleElement = post.querySelector('h3');
        if (!titleElement) return;
        const title = titleElement.innerText;
        
        if (title.toLowerCase().includes(q)) {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = title;
            
            item.onclick = () => {
                searchInput.value = title;
                dropdown.style.display = 'none';
                filterPosts();
            };
            dropdown.appendChild(item);
        }
    });
    filterPosts();
});

// Aktivace překreslování karet při zakliknutí libovolného checkboxu
document.querySelectorAll('.filter-list input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', filterPosts);
});

function filterPosts() {
    const q = searchInput.value.toLowerCase().trim();
    
    // Získání pole všech zaškrtnutých checkboxů
    const checkedBoxes = Array.from(document.querySelectorAll('.filter-list input[type="checkbox"]:checked'));
    const activeFilters = checkedBoxes.map(cb => cb.value);

    getPosts().forEach(post => {
        const titleElement = post.querySelector('h3');
        if (!titleElement) return;
        
        const title = titleElement.innerText.toLowerCase();
        const postCategory = post.dataset.category || "";
        const hasImage = post.classList.contains('card-image');
        
        // 1. Splňuje podmínku vyhledávacího pole?
        let matchesSearch = title.includes(q);
        
        // 2. Splňuje podmínky postranních filtrů?
        let matchesFilters = true;

        // Kontrolu autora podle unikátního ID
let isMyPost = (currentUser && post.dataset.userid === currentUser.id);
if (isMyPostsMode && !isMyPost) {
    matchesFilters = false;
}

        if (activeFilters.length > 0) {
            const wantsImage = activeFilters.includes('s_obrazkem');
            const categoryFilters = activeFilters.filter(f => f !== 's_obrazkem');
            
            // Pokud uživatel chce inzeráty s obrázkem a inzerát ho nemá, skryjeme
            if (wantsImage && !hasImage) {
                matchesFilters = false;
            }
            
            // Pokud jsou vybrány nějaké kategorie, musí inzerát patřit ALESPOŇ do jedné (logika OR)
            if (matchesFilters && categoryFilters.length > 0) {
                if (!categoryFilters.includes(postCategory)) {
                    matchesFilters = false;
                }
            }
        }

        // Zobrazení / skrytí na základě obou podmínek
        if (matchesSearch && matchesFilters) {
            post.classList.remove('hide');
        } else {
            post.classList.add('hide');
        }
    });
}

let isMyPostsMode = false;
const myPostsBtn = document.getElementById('myPostsBtn');
const myPostsBanner = document.getElementById('myPostsBanner');
const cancelMyPostsBtn = document.getElementById('cancelMyPostsBtn');

// Kliknutí v menu na "Moje inzeráty"
if (myPostsBtn) {
    myPostsBtn.addEventListener('click', () => {
        isMyPostsMode = true; 
        myPostsBanner.style.display = 'flex';
        profileDropdown.style.display = 'none'; // Zavřít menu

        const profileSettingsContainer = document.getElementById('profileSettingsContainer');
        const postGrid = document.getElementById('postGrid');
        const asideFilters = document.querySelector('aside');
        const searchBarContainer = document.querySelector('.search-bar');

        if (profileSettingsContainer) profileSettingsContainer.style.display = 'none';
        if (postGrid) postGrid.style.display = 'grid'; 
        if (asideFilters) asideFilters.style.display = 'block'; 
        if (searchBarContainer) searchBarContainer.style.display = 'flex'; 

        // Načteme z databáze POUZE moje inzeráty
        loadPostsFromSupabase(true);
    });
}

// Kliknutí na tlačítko "Zpět na všechny"
if (cancelMyPostsBtn) {
    cancelMyPostsBtn.addEventListener('click', () => {
        isMyPostsMode = false;
        myPostsBanner.style.display = 'none';
        
        // Načteme z databáze znovu VŠECHNY inzeráty
        loadPostsFromSupabase(false);
    });
}

/* =========================================
   DETAIL INZERÁTU A KOMENTÁŘE
   ========================================= */
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalImage = document.getElementById('modalImage');
const commentsList = document.getElementById('commentsList');
const addCommentBtn = document.getElementById('addCommentBtn');
const postGrid = document.getElementById('postGrid');

let currentPostTitle = ""; 
let currentPostId = null;
let editingPostId = null;
let currentExistingImages = [];

async function loadCommentsFromDB(title) {
    commentsList.innerHTML = '<div style="text-align:center; color:#666;">Načítám komentáře...</div>';
    currentPostTitle = title;
    
    commentInput.value = '';
    commentInput.placeholder = "Napište komentář...";
    replyingToId = null;

    const { data, error } = await dbClient
        .from('comments')
        .select('*')
        .eq('post_title', title)
        .order('created_at', { ascending: true });

    commentsList.innerHTML = '';

    if (error || !data) {
        commentsList.innerHTML = '<div style="color:red;">Chyba při načítání komentářů.</div>';
        return;
    }

    if (data.length === 0) {
        commentsList.innerHTML = '<div style="color:#999; text-align:center;">Zatím žádné komentáře. Buďte první!</div>';
        return;
    }

    const mainComments = data.filter(c => !c.parent_id);
    const replies = data.filter(c => c.parent_id);

    mainComments.forEach(comment => renderComment(comment, replies));
    commentsList.scrollTop = commentsList.scrollHeight;
}

function renderComment(comment, allReplies) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    
    const isReply = comment.parent_id !== null;
    if (isReply) {
        div.style.marginLeft = '25px';
        div.style.borderLeft = '2px solid #ccc';
        div.style.paddingLeft = '10px';
    }

    const date = new Date(comment.created_at).toLocaleDateString('cs-CZ');

    div.innerHTML = `
        <strong>${comment.author_name}</strong> <small>${date}</small>
        <div class="comment-text">${comment.content}</div>
        <button class="reply-btn" style="background:none; border:none; color:#3b82f6; font-size:12px; cursor:pointer; padding:0; margin-top:4px;">Odpovědět</button>
    `;

    div.querySelector('.reply-btn').addEventListener('click', () => {
        replyingToId = isReply ? comment.parent_id : comment.id;
        commentInput.value = `@${comment.author_name} `;
        commentInput.placeholder = `Odpovídáte uživateli ${comment.author_name}...`;
        commentInput.focus();
    });

    commentsList.appendChild(div);
    const myReplies = allReplies.filter(r => r.parent_id === comment.id);
    myReplies.forEach(r => renderComment(r, allReplies));
}

// Otevírání detailu inzerátu a vykreslení galerie (lightbox)
if (postGrid) {
    postGrid.addEventListener('click', (e) => {
        const post = e.target.closest('.card');
        if (!post) return;

        let title = post.dataset.title;
        let text = post.dataset.description;
        let imagesJson = post.dataset.images; 
        let images = [];

        currentPostId = post.dataset.id; // Uložení ID otevřeného inzerátu
        
        modalTitle.innerText = title;
        modalText.innerText = text;

        // Zobrazení jména autora u jeho inzerátu
const authorActions = document.getElementById('authorActions');
if (authorActions) {
    
    if (isUserLoggedIn && currentUser && post.dataset.userid === currentUser.id) {
        authorActions.style.display = 'flex';
    } else {
        authorActions.style.display = 'none';
    }
}

        try {
            images = imagesJson ? JSON.parse(imagesJson) : [];
        } catch (err) {
            images = [];
        }

        modalTitle.innerText = title;
        modalText.innerText = text;

        if (modalImage) {
            modalImage.innerHTML = '';
            if (images.length > 0) {
                modalImage.style.display = "flex";
                modalImage.style.gap = "10px";
                images.forEach((url, index) => {
                    const imgEl = document.createElement('div');
                    imgEl.style.cssText = `width: 100px; height: 100px; background-image: url('${url}'); background-size: cover; background-position: center; border-radius: 8px; cursor: zoom-in;`;
                    
                    // PŘIDÁNÍ EVENTU PRO OTEVŘENÍ LIGHTBOXU
                    imgEl.addEventListener('click', () => openLightbox(images, index));
                    
                    modalImage.appendChild(imgEl);
                });
            } else {
                modalImage.style.display = "none";
            }
        }

        loadCommentsFromDB(title);
        detailModal.style.display = 'flex';

        modalTitle.innerText = title;
        modalText.innerText = text;

        // Vykreslení štítku s kategorií
        const badgeContainer = document.getElementById('modalCategoryBadge');
        if (badgeContainer) {
            badgeContainer.innerHTML = '';
            if (post.dataset.category) {
                
                const catMap = { 'akce': 'Akce', 'upozorneni': 'Upozornění', 'nabidky': 'Nabídky', 'skolni_info': 'Školní info' };
                const readableCat = catMap[post.dataset.category] || post.dataset.category;
                
                badgeContainer.innerHTML = `<span style="background-color: var(--border-color); color: var(--text-primary); padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">${readableCat}</span>`;
            }
        }
    });
}

addCommentBtn.addEventListener('click', async () => {
    const text = commentInput.value.trim();
    if (!text) return;

    if (!isUserLoggedIn) {
        alert("Pro psaní komentářů se musíte přihlásit!");
        return;
    }

    addCommentBtn.disabled = true;
    addCommentBtn.innerText = 'Odesílám...';

    const { error } = await dbClient.from('comments').insert([{
        post_title: currentPostTitle,
        author_name: getFullName(),
        content: text,
        parent_id: replyingToId
    }]);

    addCommentBtn.disabled = false;
    addCommentBtn.innerText = 'Přidat';

    if (error) {
        alert("Nepodařilo se přidat komentář.");
    } else {
        commentInput.value = '';
        replyingToId = null;
        commentInput.placeholder = "Napište komentář...";
        loadCommentsFromDB(currentPostTitle);
    }
});

/* =========================================
   AI MODEROVÁNÍ OBSAHU (SECURE VERZE)
   ========================================= */
async function checkContentWithAI(title, description) {

    try {
        // Volání naší zabezpečené Supabase Edge Function
        const { data, error } = await dbClient.functions.invoke('gemini-moderation', {
            body: { title: title, description: description }
        });

        if (error) {
            console.error("Chyba při volání Supabase funkce:", error);
            return { isSafe: false, reason: "" }; // Při chybě serveru propustíme inzerát, Došlo k chybě při spojení s AI moderátorem
        }

        // Data už dorazí ve formátu z parsovaného JSONu
        return data; 

    } catch (error) {
        console.error("Kritická chyba při volání AI:", error);
        return { isSafe: false, reason: "" }; // Fallback, Kritická chyba AI moderátora
    }
}

/* =========================================
   VYTVOŘENÍ NOVÉHO INZERÁTU (UPRAVENO PRO AI)
   ========================================= */
const publishBtn = document.getElementById('publishBtn');
const borderColors = ['border-blue', 'border-green', 'border-red', 'border-yellow'];

publishBtn.addEventListener('click', async () => {
    clearAddPostError();

    const titleInput = addPostModal.querySelector('.auth-input-group input[type="text"]');
    const descTextarea = addPostModal.querySelector('.auth-textarea');
    const categorySelect = document.getElementById('postCategory');

    const titleValue = titleInput ? titleInput.value.trim() : '';
    const descValue = descTextarea ? descTextarea.value.trim() : '';
    const categoryValue = categorySelect ? categorySelect.value : '';

    if (!titleValue) return showAddPostError('Prosím, vyplňte název inzerátu.');
    //if (!categoryValue) return showAddPostError('Vyberte prosím kategorii.'); // Kontrola

    const originalBtnText = publishBtn.innerText;
    
    // ZDE ZAČÍNÁ KONTROLA AI
    publishBtn.innerText = 'AI kontroluje...';
    publishBtn.disabled = true;

    try {
        const moderation = await checkContentWithAI(titleValue, descValue);

        if (!moderation.isSafe) {
            showAddPostError(`⚠️ AI Moderátor: ${moderation.reason}`);
            publishBtn.innerText = originalBtnText;
            publishBtn.disabled = false;
            return; // Zastaví publikaci
        }
        
        let uploadedImageUrls = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            publishBtn.innerText = `Nahrávám obrázek ${i + 1}/${selectedFiles.length}...`;
            
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            
            const { error: uploadError } = await dbClient.storage
                .from('post_images')
                .upload(fileName, file);

            if (uploadError) {
                showAddPostError('Chyba při nahrávání obrázku: ' + uploadError.message);
                publishBtn.disabled = false;
                publishBtn.innerText = originalBtnText;
                return; 
            }

            const { data: publicUrlData } = dbClient.storage
                .from('post_images')
                .getPublicUrl(fileName);
                
            uploadedImageUrls.push(publicUrlData.publicUrl);
        }

        publishBtn.innerText = editingPostId ? 'Ukládám změny...' : 'Ukládám do databáze...';
        
        const finalImages = [...currentExistingImages, ...uploadedImageUrls];
        // Základní data inzerátu
        let postData = {
            title: titleValue,
            description: descValue,
            category: categoryValue,
            images: finalImages
        };

        let dbError;
        
        if (editingPostId) {

            // REŽIM ÚPRAVY (Převedeme ID na číslo pro Supabase)
            const targetId = isNaN(editingPostId) ? editingPostId : Number(editingPostId);

            const { error } = await dbClient
                .from('posts')
                .update(postData)
                .eq('id', targetId);
                
            dbError = error;
        } else {

            // REŽIM NOVÉHO INZERÁTU
            postData.color = borderColors[Math.floor(Math.random() * borderColors.length)];
            postData.author_name = getFullName();
            postData.user_id = currentUser.id;
            
            const { error } = await dbClient
                .from('posts')
                .insert([postData]);
                
            dbError = error;
        }

        if (dbError) {
            showAddPostError('Chyba při ukládání: ' + dbError.message);
            publishBtn.innerText = originalBtnText;
            publishBtn.disabled = false;
            return;
        }
        
        
    await loadPostsFromSupabase();

    // Pokud jsme byli v režimu "Moje inzeráty", přefiltrujeme
    if (typeof filterPosts === 'function') filterPosts();
        
    clearAddPostForm();
    addPostModal.style.display = 'none'; 

    } catch (err) {
        console.error(err);
        showAddPostError('Došlo k nečekané chybě. Zkuste to prosím znovu.');
    } finally {
        publishBtn.innerText = originalBtnText;
        publishBtn.disabled = false;
    }
});

/* =========================================
   NAČTENÍ INZERÁTŮ Z DATABÁZE
========================================= */
async function loadPostsFromSupabase(showOnlyMine = false) {
    // POJISTKA: Pokud parametr není čistý boolean (např. přišel Event z listeneru), vynutíme false
    if (typeof showOnlyMine !== 'boolean') {
        showOnlyMine = false;
    }
    // Načtení všech inzerátů v databázi, seřazeno od nejnovějších
    let query = dbClient
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    // Inzeráty přihlášeného uživatele
    if (showOnlyMine) {
        // Zjistíme aktuálně přihlášeného uživatele
        const { data: { user }, error: authError } = await dbClient.auth.getUser();
        
        if (authError || !user) {
            console.error('Uživatel není přihlášen!');
            return;
        }

        // Filtr, jestli user_id v databázi odpovídalo ID uživatele
        query = query.eq('user_id', user.id); 
    }

    // 3. Spuštění dotazu
    const { data: postsData, error } = await query;

    if (error || !postsData) {
        console.error('Chyba při načítání:', error?.message);
        return;
    }

    // 4. Vykreslení HTML
    const postGrid = document.getElementById('postGrid');
    postGrid.innerHTML = '';

    postsData.forEach(post => {
        const card = document.createElement('article');
        
        const images = Array.isArray(post.images) ? post.images : [];
        const firstImage = images.length > 0 ? images[0] : null;

        const hasImage = firstImage ? 'card-image' : '';
        let bentoClass = '';
        
        if (firstImage) {
            bentoClass = Math.random() > 0.5 ? 'bento-large' : 'bento-wide';
        } else if (post.description && post.description.length > 120) {
            bentoClass = 'bento-tall';
        } 

        card.className = `card ${post.color || 'border-blue'} ${hasImage} ${bentoClass}`;
        card.style.cursor = 'pointer';
        
        card.dataset.id = post.id;
        card.dataset.author = post.author_name;
        card.dataset.userid = post.user_id;
        card.dataset.title = post.title;
        card.dataset.description = post.description || '';
        card.dataset.images = JSON.stringify(images);
        card.dataset.category = post.category || '';

        if (firstImage) {
            card.style.backgroundImage = `url('${firstImage}')`;
            card.innerHTML = `
                <div class="card-image-overlay">
                    <h3>${post.title}</h3>
                    <div style="font-size: 12px; color: #ddd; margin-top: 5px;">
                        <strong>👤 Napsal/a:</strong> ${post.author_name || 'Anonym'} ${images.length > 1 ? `(📷 ${images.length})` : ''}
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.description || ''}</p>
                <div style="margin-top: 15px; font-size: 12px; color: var(--text-secondary);">
                    <strong>👤 Napsal/a:</strong> ${post.author_name || 'Anonym'}
                </div>
            `;
        }
        postGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => loadPostsFromSupabase(false));

/* =========================================
   LOGIKA PRO ZVĚTŠENÍ OBRÁZKŮ (LIGHTBOX)
   ========================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentLightboxImages = [];
let currentImageIndex = 0;

function openLightbox(imagesArray, startIndex) {
    if (!lightbox || !lightboxImg) return;
    
    currentLightboxImages = imagesArray;
    currentImageIndex = startIndex;
    
    const navDisplay = imagesArray.length > 1 ? 'block' : 'none';
    if (lightboxPrev) lightboxPrev.style.display = navDisplay;
    if (lightboxNext) lightboxNext.style.display = navDisplay;

    updateLightboxImage();
    lightbox.style.display = 'flex';
}

function updateLightboxImage() {
    if (lightboxImg) lightboxImg.src = currentLightboxImages[currentImageIndex];
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    if (lightboxImg) lightboxImg.src = ''; 
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation(); // Zabrání zavření pozadí
        currentImageIndex = (currentImageIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
        updateLightboxImage();
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation(); // Zabrání zavření pozadí
        currentImageIndex = (currentImageIndex + 1) % currentLightboxImages.length;
        updateLightboxImage();
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});

//SMAZÁNÍ INZERÁTU
const deletePostBtn = document.getElementById('deletePostBtn');
if (deletePostBtn) {
    deletePostBtn.addEventListener('click', async () => {
        if (!confirm('Opravdu chcete tento inzerát trvale smazat?')) return;
        
        deletePostBtn.innerText = "Mažu...";
        deletePostBtn.disabled = true;

        // Převod ID na číslo (klíčové pro Supabase!)
        const targetId = isNaN(currentPostId) ? currentPostId : Number(currentPostId);

        const { error } = await dbClient
            .from('posts')
            .delete()
            .eq('id', targetId);
        
        if (error) {
            alert("Chyba při mazání: " + error.message);
        } else {
            // Zavřít modal detailu inzerátu
            const detailModal = document.getElementById('postDetailModal');
            if (detailModal) detailModal.style.display = 'none';
            
            // Znovu načíst příspěvky z databáze
            await loadPostsFromSupabase();
            if (typeof filterPosts === 'function') filterPosts();
        }

        deletePostBtn.innerText = "Smazat";
        deletePostBtn.disabled = false;
        clearDetailModal();
    });
}

//ÚPRAVA INZERÁTU
const editPostBtn = document.getElementById('editPostBtn');
if (editPostBtn) {
    editPostBtn.addEventListener('click', () => {
        const postCard = document.querySelector(`.card[data-id="${currentPostId}"]`);
        if (!postCard) return;

        editingPostId = currentPostId;
        
        // Načtení dat z datasetu karty
        const title = postCard.dataset.title;
        const desc = postCard.dataset.description;
        const category = postCard.dataset.category;
        
        try {
            currentExistingImages = JSON.parse(postCard.dataset.images || '[]');
        } catch (e) {
            currentExistingImages = [];
        }

        // Vyplnění do formuláře
        const titleInput = addPostModal.querySelector('.auth-input-group input[type="text"]');
        const descTextarea = addPostModal.querySelector('.auth-textarea');
        const categorySelect = document.getElementById('postCategory');
        
        if (titleInput) titleInput.value = title;
        if (descTextarea) descTextarea.value = desc;
        if (categorySelect && category) categorySelect.value = category;

        // Načtení náhledů fotek do preview
        selectedFiles = [];
        refreshPreviewContainer();

        // Změna nadpisů v modalu
        addPostModal.querySelector('.add-post-title').innerText = "Upravit inzerát";
        document.getElementById('publishBtn').innerText = "Uložit změny";

        clearDetailModal();

        // Otevření editačního modalu
        addPostModal.style.display = 'flex';


    });
}

// Funkce pro vykreslení stávajících fotek z databáze s možností smazání
function renderExistingImagesPreview() {
    if (!previewContainer) return;

    currentExistingImages.forEach((url, index) => {
        const div = document.createElement('div');
        div.style.cssText = 'position: relative; width: 60px; height: 60px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); flex-shrink: 0;';
        
        div.innerHTML = `
            <img src="${url}" style="width: 100%; height: 100%; object-fit: cover;">
            <button type="button" style="position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 18px; height: 18px; cursor: pointer; font-size: 12px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
        `;

        // Tlačítko X pro odebrání fotky
        div.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            currentExistingImages.splice(index, 1); // Odstraní URL z pole
            refreshPreviewContainer(); // Překreslí náhledy
        });

        previewContainer.appendChild(div);
    });
}

// Pomocná funkce pro překreslení celého preview (stávající + nově vybrané z počítače)
function refreshPreviewContainer() {
    if (!previewContainer) return;
    previewContainer.innerHTML = '';
    
    // 1. Vykreslíme zbývající stávající fotky
    renderExistingImagesPreview();
    
    // 2. Vykreslíme nově vybrané soubory z počítače
    selectedFiles.forEach((file, index) => {
        const div = document.createElement('div');
        div.style.cssText = 'position: relative; width: 60px; height: 60px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); flex-shrink: 0;';
        
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.innerHTML = '&times;';
        removeBtn.style.cssText = 'position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 18px; height: 18px; cursor: pointer; font-size: 12px; line-height: 1; display: flex; align-items: center; justify-content: center;';
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedFiles.splice(index, 1);
            refreshPreviewContainer();
        });

        div.appendChild(img);
        div.appendChild(removeBtn);
        previewContainer.appendChild(div);
    });
}

/* =========================================
   ZOBRAZENÍ A ÚPRAVA OSOBNÍCH ÚDAJŮ
   ========================================= */
const editProfileBtn = document.getElementById('editProfileBtn');
const profileSettingsContainer = document.getElementById('profileSettingsContainer');
const cancelProfileBtn = document.getElementById('cancelProfileBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const profileMsgBox = document.getElementById('profileMsgBox');
const searchBarContainer = document.querySelector('.search-bar');
const asideFilters = document.querySelector('aside');

// 1. Kliknutí na "Změnit osobní údaje" v menu
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        profileDropdown.style.display = 'none'; // Zavře menu profilu
        
        // Skryje hlavní obsah (inzeráty, filtry, vyhledávání, banner)
        if (postGrid) postGrid.style.display = 'none';
        if (asideFilters) asideFilters.style.display = 'none';
        if (searchBarContainer) searchBarContainer.style.display = 'none';
        if (myPostsBanner) myPostsBanner.style.display = 'none';

        // Předvyplní inputy aktuálními údaji uživatele ze Supabase
        if (currentUser) {
            document.getElementById('profFirstName').value = currentUser.user_metadata.first_name || '';
            document.getElementById('profLastName').value = currentUser.user_metadata.last_name || '';
            document.getElementById('profEmail').value = currentUser.email || '';
            const profPwd = document.getElementById('profPassword');
            profPwd.value = ''; 
            profPwd.type = 'password'; // Zpět na tečky
            
            const profIcon = profPwd.nextElementSibling;
            if (profIcon) {
                profIcon.style.display = 'none'; // Schovat očíčko
                profIcon.style.fill = ''; // Reset barvy
            }
        }

        profileMsgBox.style.display = 'none'; // Skryje předchozí hlášky
        profileSettingsContainer.style.display = 'block'; // Zobrazí formulář profilu
        
        // Reset baru pro sílu hesla
        const profStrengthBar = document.getElementById('profStrengthBar');
        if (profStrengthBar) {
            profStrengthBar.style.width = '0%';
            profStrengthBar.style.backgroundColor = 'transparent';
        }
    });
}

// 2. Kliknutí na "Zpět na inzeráty"
if (cancelProfileBtn) {
    cancelProfileBtn.addEventListener('click', () => {
        profileSettingsContainer.style.display = 'none'; // Skryje formulář
        
        // Vrátí zpět hlavní obsah
        if (postGrid) postGrid.style.display = 'grid';
        if (asideFilters) asideFilters.style.display = 'block';
        if (searchBarContainer) searchBarContainer.style.display = 'flex';
        
        // Pokud byl uživatel v režimu "Moje inzeráty", vrátíme i banner
        if (isMyPostsMode && myPostsBanner) myPostsBanner.style.display = 'flex';
    });
}

// 3. Uložení změn do Supabase
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', async () => {
        const fName = document.getElementById('profFirstName').value.trim();
        const lName = document.getElementById('profLastName').value.trim();
        const email = document.getElementById('profEmail').value.trim();
        const password = document.getElementById('profPassword').value;

        if (!fName || !lName || !email) {
            profileMsgBox.innerText = 'Jméno, příjmení a e-mail jsou povinná pole.';
            profileMsgBox.style.backgroundColor = '#ef4444';
            profileMsgBox.style.color = 'white';
            profileMsgBox.style.display = 'block';
            return;
        }

        saveProfileBtn.innerText = 'Ukládám...';
        saveProfileBtn.disabled = true;

        // Připravíme objekt pro update
        const updateData = {
            email: email,
            data: { first_name: fName, last_name: lName }
        };

        // Heslo aktualizujeme, jen pokud uživatel nějaké zadal
        if (password.length > 0) {
            updateData.password = password;
        }

        // Volání Supabase funkce pro aktualizaci uživatele
        const { data, error } = await dbClient.auth.updateUser(updateData);

        saveProfileBtn.innerText = 'Uložit změny';
        saveProfileBtn.disabled = false;

        if (error) {
            profileMsgBox.innerText = 'Chyba při ukládání: ' + error.message;
            profileMsgBox.style.backgroundColor = '#ef4444';
        } else {
            profileMsgBox.innerText = 'Údaje byly úspěšně aktualizovány!';
            
            if (email !== currentUser.email) {
                profileMsgBox.innerText += ' Zkontrolujte obě e-mailové schránky (starou i novou) pro potvrzení změny e-mailu.';
            }
            
            profileMsgBox.style.backgroundColor = '#10b981';
            
            // Aktualizujeme lokální proměnnou currentUser
            if (data.user) {
                currentUser = data.user;
                
            }

            // Vymažeme heslo z pole a resetujeme očíčko
            const profPwd = document.getElementById('profPassword');
            profPwd.value = '';
            profPwd.type = 'password';
            
            const profIcon = profPwd.nextElementSibling;
            if (profIcon) {
                profIcon.style.display = 'none';
                profIcon.style.fill = '';
            }

            const profStrengthBar = document.getElementById('profStrengthBar');
            if (profStrengthBar) {
                profStrengthBar.style.width = '0%';
                profStrengthBar.style.backgroundColor = 'transparent';
            }
        }
        
        profileMsgBox.style.color = 'white';
        profileMsgBox.style.display = 'block';
    });
}

/* =========================================
   ODESÍLÁNÍ POMOCÍ KLÁVESY ENTER
   ========================================= */

// Odeslání komentáře
if (commentInput && addCommentBtn) {
    commentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Zabrání výchozímu odřádkování nebo refreshování
            addCommentBtn.click(); // Nasimuluje kliknutí na tlačítko "Přidat"
        }
    });
}

// Odeslání Přihlášení
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
if (loginView && loginSubmitBtn) {
    // Navěsíme událost na všechna zadávací pole v přihlašovacím formuláři
    const loginInputs = loginView.querySelectorAll('.auth-input');
    loginInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginSubmitBtn.click(); // Nasimuluje kliknutí na "Přihlásit"
            }
        });
    });
}

// Odeslání Registrace
const registerSubmitBtn = document.getElementById('registerSubmitBtn');
if (registerView && registerSubmitBtn) {
    // Navěsíme událost na všechna zadávací pole v registračním formuláři
    const registerInputs = registerView.querySelectorAll('.auth-input');
    registerInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                registerSubmitBtn.click(); // Nasimuluje kliknutí na "Registrovat"
            }
        });
    });
}

/* =========================================
   KONTROLA SÍLY HESLA & NÁPOVĚDA
   ========================================= */

// Univerzální funkce pro výpočet síly hesla
function setupPasswordStrength(inputId, barId) {
    const pwdInput = document.getElementById(inputId);
    const strengthBar = document.getElementById(barId);

    if (pwdInput && strengthBar) {
        pwdInput.addEventListener('input', () => {
            const val = pwdInput.value;
            let score = 0;

            if (val.length >= 6) score += 1;
            if (val.length >= 10) score += 1;
            if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score += 1;
            if (/[0-9]/.test(val)) score += 1;
            if (/[^A-Za-z0-9]/.test(val)) score += 1;

            if (val.length === 0) {
                strengthBar.style.width = '0%';
                strengthBar.style.backgroundColor = 'transparent';
            } else if (score <= 2) {
                strengthBar.style.width = '33%';
                strengthBar.style.backgroundColor = '#ef4444'; // Červená (slabé)
            } else if (score <= 4) {
                strengthBar.style.width = '66%';
                strengthBar.style.backgroundColor = '#f59e0b'; // Oranžová (střední)
            } else {
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = '#10b981'; // Zelená (silné)
            }
        });
    }
}

// Aktivujeme ukazatel pro oba formuláře
setupPasswordStrength('registerPassword', 'strengthBar');
setupPasswordStrength('profPassword', 'profStrengthBar');

// Univerzální zobrazení vyskakovacího alertu pro tooltip
function setupPasswordTip(btnId) {
    const tipBtn = document.getElementById(btnId);
    if (tipBtn) {
        tipBtn.addEventListener('click', () => {
            alert("Jak vytvořit silné heslo:\n\n• Použijte minimálně 8-12 znaků.\n• Skombinujte velká a malá písmena, čísla a symboly (@, #, $...).\n• Nepoužívejte osobní údaje (jméno, datum narození).");
        });
    }
    
}

// Aktivujeme nápovědu pro oba formuláře
setupPasswordTip('pwdTipBtn');
setupPasswordTip('profPwdTipBtn');

document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromSupabase(); 

    // Kontrola URL parametrů
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('modal') === 'register') {
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'flex';
            toggleAuthView('register');
        }

        // Vyčištění URL, aby se po případném obnovení stránky (F5) modál neotevřel znovu
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});