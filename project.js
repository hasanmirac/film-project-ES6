const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearFilms = document.getElementById("clear-films");


// Tüm evenleri yükleme
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function() {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    secondCardBody.addEventListener("click",deleteFilm);
    clearFilms.addEventListener("click",clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title == "" || director == "" || url == ""){
        //Hata
        UI.displayMessages("Tüm alanları doldurun...","danger");
    }
    else {
        // Yeni film
        const newFilm = new Film(title,director,url);
        
        UI.addFilmToUI(newFilm); // Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // Storagea film ekleme

        UI.displayMessages("Film başarıyla eklendi...","success");
    }

    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}

function deleteFilm(e) {
    
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        UI.displayMessages("Silme işlemi başarılı...","success");
    }
}

function clearAllFilms() {

    if (confirm("Tüm filmleri silmek istediğinize emin misiniz ?"))
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
}
