const popup_book = document.querySelector('.popup-book');
const popup_book_btn = document.querySelector('.create-bookmark-btn');
const cross_btn = document.querySelector('.x-ixon'); // Fixed the  name
const overlay = document.querySelector('.overlay');

const submit_bookmark_data = document.querySelector('.submit-bookmark-btn');
const bookmark_name = document.querySelector('#bookmark-name'); 
const bookmark_url = document.querySelector('#bookmark-url'); 

const lowerbook_div = document.querySelector('.lower-con-book');

let bookmarkIdCounter = 1; 

popup_book_btn.addEventListener('click', function () {
    popup_book.style.display = 'inline';
    overlay.style.display = 'inline';
});

submit_bookmark_data.addEventListener('click', function (e) {
    e.preventDefault(); 

    const value_name = bookmark_name.value; 
    const value_url = bookmark_url.value;
    

    if (!value_name || !value_url) {
        alert("Please fill out both fields (Bookmark Name and URL).");
        return;
    }

    const currentId = bookmark_name.dataset.currentId; 

    if (currentId) {
 
        const cardToUpdate = document.querySelector(`#${currentId}`);
        cardToUpdate.querySelector('.text-card').textContent = value_name;
        cardToUpdate.querySelector('.link-text').href = value_url;
    } else {
      
        const new_div = document.createElement('div'); 
        new_div.style.width = '350px';
        new_div.classList.add('bookmark-card');
        new_div.style.height = '200px';
        new_div.style.backgroundColor = 'white';
        new_div.style.border = '1px solid #ccc';
        new_div.style.padding = '15px';
        new_div.style.margin = '9px';
        new_div.style.boxShadow = '0px 4px 6px rgba(0,0,0,0.1)';
        new_div.style.borderRadius = '8px';
        new_div.style.display = 'flex';
        new_div.style.flexDirection = 'column';
        new_div.style.gap = '20px';

        const uniqueId = `bookmark-${bookmarkIdCounter++}`; 
        new_div.id = uniqueId; 

        new_div.innerHTML = `
        <h3 class="text-card">${value_name}</h3> 
        <a href="${value_url}" target="_blank" class="link-text">Visit Website</a> 
        <div class='btns-divs'>
            <button class="edit-button">Edit</button> 
            <button class="delete-button">Delete</button>
        </div>`
        ;

        lowerbook_div.appendChild(new_div);
    }

    popup_book.style.display = 'none';
    overlay.style.display = 'none';
    bookmark_name.value = '';
    bookmark_url.value = '';
    delete bookmark_name.dataset.currentId;
});

lowerbook_div.addEventListener('click', function(e){
    if(e.target.classList.contains('edit-button')){
        const parentDiv = e.target.closest('.bookmark-card');
        const name = parentDiv.querySelector('.text-card').textContent;
        const url = parentDiv.querySelector('.link-text').href;

    
        bookmark_name.value = name;
        bookmark_url.value = url;

   
        bookmark_name.dataset.currentId = parentDiv.id;

        popup_book.style.display = 'inline';
        overlay.style.display = 'inline';
    } else if (e.target.classList.contains('delete-button')) {
        const parentDiv = e.target.closest('.bookmark-card');
        lowerbook_div.removeChild(parentDiv);
    }
});


cross_btn.addEventListener('click', function () {
    popup_book.style.display = 'none';
    overlay.style.display = 'none';
    bookmark_name.value = ''; // Clear input values
    bookmark_url.value = '';
    delete bookmark_name.dataset.currentId; // Reset the currentI
});

