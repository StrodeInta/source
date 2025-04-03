// Navigācijas funkcija
function loadContent(page) {
    const pages = {
        'sakums': 'index.html',
        'html': 'index2.html',
        'css': 'index3.html',
        'js': 'index4.html'
    };
    
    if (pages[page]) {
        window.location.href = pages[page];
    } else {
        console.error('Nezināma lapa:', page);
    }
}

// Aktīvās pogas uzstādīšana
document.addEventListener("DOMContentLoaded", function() {
    // Pašreizējā lapa
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Pogu atlase
    const buttons = document.querySelectorAll('.nav-buttons button');
    
    // Kartēšana starp lapām un pogu tekstiem
    const pageButtonMap = {
        'index': 'Sākums',
        'index2': 'HTML',
        'index3': 'CSS',
        'index4': 'JavaScript'
    };
    
    // Atjaunina pogu stāvokļus
    buttons.forEach(button => {
        button.classList.remove('active');
        
        if (pageButtonMap[currentPage] === button.textContent.trim()) {
            button.classList.add('active');
        }
    });
    
    // Pievieno klikšķu notikumu klausītājus
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const pageMap = {
                'Sākums': 'sakums',
                'HTML': 'html',
                'CSS': 'css',
                'JavaScript': 'js'
            };
            
            const page = pageMap[button.textContent.trim()];
            if (page) {
                loadContent(page);
            }
        });
    });
});