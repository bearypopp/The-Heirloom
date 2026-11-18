// Adding "use strict" to JS
"use strict";

//===============MTC Page Cat Cards==================//
//cat data
const cats = [
    {
        id: "simon",
        name: "Simon",
        age: 12,
        image: "images/simon.png",
        images: [
            "images/simon.png",
            "images/simon2.jpg"
        ],
        description: "A gentle companion that loves afternoon naps under the sun.",
        nickname: "The Professional Napper",
        personality: "A gentle old soul with a heart as warm as his favorite sunspot. Simon believes every day should include a good nap and a little affection.",
        likes: "Sunbeams, warm blankets, and slow head scratches.",
        quirks: "Will quietly follow you around until you sit down, then immediately claim the spot beside you.",
        favorites: "Fleece blankets and sleepy afternoons."
    },
    {
        id: "mr.midnight",
        name: "Mr. Midnight",
        age: 14,
        image: "images/Mr.Midnight.png",
        images: [
            "images/Mr.Midnight.png",
            "images/mr.midnight2.jpg"
        ],
        description: "A quiet gentleman who enjoys peaceful evenings and cuddling in laps.",
        nickname: "The Distinguished Gentleman",
        personality:"A dignified gentleman with a surprisingly soft side. Mr. Midnight prefers quiet company, meaningful eye contact, and affection on his own terms.",
        likes: "Peaceful evenings, gentle brushing, and a comfortable lap.",
        quirks: "Stares at you like he's judging your life choices, then rewards you with the sweetest little head bump.",
        favorites: "Velvet cushions and feather wands."
        
    },
    {
        id: "miko",
        name: "Miko",
        age: 10,
        image: "images/Miko.png",
        images: [
            "images/Miko.png",
            "images/miko2.jpg"
        ],
        description: "A curious cat who loves exploring cozy corners.",
        nickname: "The Curious Conversationalist",
        personality: "A bright, chatty little explorer who has something to say about absolutely everything. Miko brings a spark of curiosity to even the quietest afternoons.",
        likes: "Window watching, exploring new corners, and chatting with visitors.",
        quirks: "Greets you with enthusiastic meows and insists on supervising whatever you're doing.",
        favorites: "Crinkle balls and cardboard boxes."
    },
    {
        id: "poppy",
        name: "Poppy",
        age: 12,
        image: "images/Poppy.png",
        images: [
            "images/Poppy.png",
            "images/poppy2.jpg"
        ],
        description: "A sweet and very affectionate gal who loves all the attention.",
        nickname:  "The Affectionate Daydreamer",
        personality: "A tenderhearted sweetheart with a playful streak. Poppy loves being adored, but she's equally content simply sharing a peaceful moment with someone she trusts.",
        ikes: "Soft voices, gentle chin scratches, and cozy places to curl up.",
        quirks: "Sticks her tongue out when she's especially relaxed, as if she's forgotten to put it away.",
        favorites: "Plush pillows and soft stuffed mice."
    },
    {
        id: "cheddar",
        name: "Cheddar",
        age: 13,
        image: "images/Cheddar.png",
        images: [
            "images/Cheddar.png",
            "images/cheddar2.jpg"
        ],
        description: "An eccentric cat who loves is mouse toys when he's not taking a cat nap in the window.",
        nickname: "The Lovable Oddball",
        personality: "A charming little weirdo with big feelings and even bigger curiosity. Cheddar has a talent for turning ordinary moments into something unexpectedly entertaining.",
        likes: "Following his favorite humans, investigating grocery bags, and being included in everything.",
        quirks: "Occasionally gets distracted mid-play and forgets what he was doing, then acts like nothing happened.",
        favorites: "Catnip pickles and paper bags."
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

            <button type="button" class="fav-bttn" aria-label="Favorite ${cat.name}" aria-pressed="${favorites.includes(cat.id)}">
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

/**=============HOME PAGE CAT PREVIEW==================**/

/**Makes sure home page carousel has 3 cat cards visible at a time**/
let currentIndex = 0;
const catsVisible = 3;
const catTrack = document.querySelector(".cat-track");
if (catTrack) {
    function renderCats() {
        catTrack.innerHTML = "";
        //created an array to contain 3 cats. It iterates i, and wraps instead of stopping at the end of the array
        Array.from({ length: catsVisible }, function (_, i){
            return cats[(currentIndex + i) % cats.length];
        }).forEach(function (cat) {
            catTrack.innerHTML +=
                `
            <article class="cat-card" data-cat-id="${cat.id}">
                <div class="cat-img">
                    <img src="${cat.image}" alt="Photo of ${cat.name}">
                        <button type="button" class="fav-bttn" aria-label="Add ${cat.name} to favorites" aria-pressed="${favorites.includes(cat.id)}">
                            <img src="images/favorite_icon.svg" alt="" class="favorite_icon">
                        </button>
                </div>
                <div class="cat-info">
                    <h3>${cat.name}</h3>
                    <p>Age: ${cat.age} years</p>
                    <p>${cat.description}</p>
                    <a href="cats.html" class="learn-more">View Profile</a>
                </div>
            </article>
        `;
        });
    }
    renderCats();

    //next button on HP carousel
    const nextBttn= document.querySelector(".carousel-next");
    nextBttn.addEventListener("click", function(){
        currentIndex = (currentIndex + 1) % cats.length;
        renderCats();
    });

    //prev button on HP carousel
    const prevBttn= document.querySelector(".carousel-prev");
    prevBttn.addEventListener("click", function(){
        currentIndex = (currentIndex - 1 + cats.length) % cats.length;
        renderCats();
    });

    //favorite button for MTC preview on the homepage
}

//favorite button clicked
if (catGrid) {
    catGrid.addEventListener("click", function(event) {
        const favoriteButton = event.target.closest(".fav-bttn");
        if (!favoriteButton) return;

        const catCard = favoriteButton.closest(".cat-card");
        const catId = catCard.dataset.catId;

        if (favorites.includes(catId)) {

            //removes the cat if already bookmarked
            favorites = favorites.filter(function (id) {
                return id !== catId;
            });
        }
        else {

            //adds the cat if not favorited already
            favorites.push(catId);
        }

        //saves the updated favorites to the browser
        localStorage.setItem("favoriteCats", JSON.stringify(favorites));

        //updates the favorite button's state
        const isFavorite = favorites.includes(catId);
        favoriteButton.setAttribute("aria-pressed", isFavorite);
    });
}

//view cat profile
let currentPhoto = 0;
let activeCat = null;
if(catGrid){
    catGrid.addEventListener("click", function(event){
        const profileBttn = event.target.closest(".learn-more");

        if(!profileBttn) return;

        const thisCat = profileBttn.dataset.catId;
        const selectedCat = cats.find(function(cat){
            return cat.id === thisCat;
        });

        //if the card is expanded, it will show the cat's info
        if(selectedCat){
            activeCat = selectedCat;
            currentPhoto = 0;
            const catInfo = document.querySelector("#cat-expanded");

            document.querySelector("#expanded-cat-name").textContent = selectedCat.name;
            document.querySelector("#expanded-cat-nickname").textContent = selectedCat.nickname;
            document.querySelector("#expanded-cat-age").innerHTML =  `<strong>Age:</strong> ${selectedCat.age} years`;
            document.querySelector("#expanded-cat-img").innerHTML = `<img src="${selectedCat.images[0]}" alt="Photo of ${selectedCat.name}">`;

            //headers for inside the expanded cat card (Age, etc.)
            document.querySelector("#expanded-cat-personality").innerHTML = `<strong>Personality:</strong> ${selectedCat.personality}`;
            document.querySelector("#expanded-cat-likes").innerHTML = `<strong>Likes:</strong> ${selectedCat.likes}`;
            document.querySelector("#expanded-cat-quirks").innerHTML = `<strong>Quirks:</strong> ${selectedCat.quirks}`;
            document.querySelector("#expanded-cat-favorites").innerHTML = `<strong>Favorite Things:</strong> ${selectedCat.favorites}`;

            //favorite button in expanded card  
            const profileFav = document.querySelector("#expanded-favorite");
            
            profileFav.setAttribute(
                "aria-pressed",
                favorites.includes(selectedCat.id)
            );
            profileFav.dataset.catId = selectedCat.id;


            catInfo.showModal();
        }
    });
}

//closing the expanded cat profile
 const catInfo = document.querySelector("#cat-expanded");
 const closeProfile = document.querySelector(".expanded-close");

 if(catInfo && closeProfile){
    closeProfile.addEventListener("click", function(){
        catInfo.close();
    });
}

//selecting the previous cat photo
const prevPhoto = document.querySelector(".img-prev");

if(prevPhoto){
    prevPhoto.addEventListener("click", function(){
        currentPhoto = (currentPhoto - 1 + activeCat.images.length) % activeCat.images.length;

        document.querySelector("#expanded-cat-img img").src= activeCat.images[currentPhoto];
    });
}
//selecting the next cat photo
const nextPhoto = document.querySelector(".img-next");

if(nextPhoto){
    nextPhoto.addEventListener("click", function(){
        currentPhoto = (currentPhoto + 1) % activeCat.images.length;

        document.querySelector("#expanded-cat-img img").src= activeCat.images[currentPhoto];
    });
}
//when favorites is clicked in the expanded profile
 const profileFav = document.querySelector("#expanded-favorite");

 if(profileFav){
    profileFav.addEventListener("click", function(){
        const thisCat = profileFav.dataset.catId;

        if(favorites.includes(thisCat)){
            favorites = favorites.filter(function(id){
                return id !== thisCat;
            });
        }
        else{
            favorites.push(thisCat);
        }
        localStorage.setItem("favoriteCats", JSON.stringify(favorites));
        profileFav.setAttribute("aria-pressed",favorites.includes(thisCat));

        // Update the matching gallery heart
        const galleryFav = document.querySelector(
           `.cat-card[data-cat-id="${thisCat}"] .fav-bttn` 
        ); 

        if(galleryFav){
            galleryFav.setAttribute("aria-pressed", favorites.includes(thisCat));
        }
    });
 }
