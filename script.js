// Adding "use strict" to JS
"use strict";

//cat data
const cats= [
{
    id: "simon", 
    name:"Simon",
    age: 12,
    image: "images/simon.png",
    description: "A gentle companion that loves afternoon naps under the sun"
}
];

//Cat Card Generation
const catGrid = document.querySelector(".cat-grid");
if (catGrid) {
    //Loop through the cats array to generate each cat card
    cats.forEach(function (cat) {


        catGrid.innerHTML += `
    <article class="cat-card">
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