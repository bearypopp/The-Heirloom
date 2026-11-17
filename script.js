// Adding "use strict" to JS
"use strict";

//===============MTC Page Cat Cards==================//
//cat data
const cats= [
{
    id: "simon", 
    name:"Simon",
    age: 12,
    image: "images/simon.png",
    description: "A gentle companion that loves afternoon naps under the sun."
},
{
    id: "mr.midnight",
    name: "Mr.Midnight",
    age: 14,
    image: "images/Mr.Midnight.png",
    description: "A quiet gentleman who enjoys peaceful evenings and cuddling in laps."
},
{
    id: "miko",
    name: "Miko",
    age: 10,
    image: "images/Miko.png",
    description: "A curious cat who loves exploring cozy corners."
},
{
    id: "poppy",
    name: "Poppy",
    age: 12,
    image: "images/Poppy.png",
    description: "A sweet and very affectionate gal who loves all the attention."
},
{
    id: "cheddar",
    name: "Cheddar",
    age: 13,
    image: "images/Cheddar.png",
    description: "An eccentric cat who loves is mouse toys when he's not taking a cat nap in the window."
}
];

/*=====Favorites Button======*/

//retrieve saved fovorites or start with an empty array
let favorites = JSON.parse(localStorage.getItem("favoriteCats")) || [];


//Cat Card Generation
const catGrid = document.querySelector(".cat-grid");
if (catGrid) {
    //Loop through the cats array to generate each cat card
    cats.forEach(function (cat) {


        catGrid.innerHTML += `
    <article class="cat-card" data-cat-id="${cat.id}">
        <div class="cat-img">
            <img src="${cat.image}" alt="Photo of ${cat.name}">

            <button type="button" class="fav-bttn" aria-label="Add ${cat.name} to favorites" aria-pressed="false">
            <img src="images/favorite_icon.svg" alt="" class="favorite_icon">
        </div>
        <div class="cat-info">
            <h3>${cat.name}</h3>
            <p>Age: ${cat.age} years</p>
            <p>${cat.description}</p>

            <button type="button" class="learn-more" data-cat-id="${cat.id}">
            View Profile
            </button>
        </div>
    </article>
    `;
    });
}

//favorite button clicked
if(catGrid){
    catGrid.addEventListener("click", function(event){
        const favoriteButton= event.target.closest(".fav-bttn");
        if(!favoriteButton) return;

        const catCard = favoriteButton.closest(".cat-card");
        const catId = catCard.dataset.catId;

       if(favorites.includes(catId)){

        //removes the cat if already bookmarked
        favorites = favorites.filter(function(id){
            return id !== catId;
        });
       }
       else{

        //adds the cat if not favorited already
        favorites.push(catId);
       }

       //saves the updated favorites to the browser
       localStorage.setItem("favoriteCats", JSON.stringify(favorites));

       console.log("Current favorites:", favorites);
    });
}