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
if(catGrid){
    //getting the first cat object form the cats array. 
    // **Arrays start at index 0, not 1. 
    const simon = cats[0];
    catGrid.innerHTML= `
    <article class="cat-card">
        <div class="cat-img">
            <img src="${simon.image}" alt="Photo of ${simon.name}">

            <button type="button" class="fav-bttn" aria-label="Add ${simon.name} to favorites" aria-pressed="false">
            <img src="images/favorite_icon.svg" alt="" class="favorite_icon">
        </div>
        <div class="cat-info">
            <h3>${simon.name}</h3>
            <p>Age: ${simon.age} years</p>
            <p>${simon.description}</p>

            <button type="button" class="learn-more" data-cat-id="${simon.id}">
            View Profile
            </button>
        </div>
    </article>
    `;
}