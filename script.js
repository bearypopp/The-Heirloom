// Adding "use strict" to JS
"use strict";

/**=========DARK & LIGHT MODE===========**/
const themeSwitch = document.querySelector("#theme-switch");
const savedTheme = localStorage.getItem("siteTheme");

//user's previously selected theme
if(savedTheme === "dark" || savedTheme === "light"){
    document.body.dataset.theme = savedTheme;
}
if(themeSwitch){
    themeSwitch.addEventListener("click", function(){
        if(document.body.dataset.theme === "light"){
            document.body.dataset.theme = "dark";
        }
        else{
            document.body.dataset.theme = "light"
        }
        //saves user's selected theme for future webpage visits
        localStorage.setItem("siteTheme", document.body.dataset.theme);
    });
}


//**===============MTC Page Cat Cards==================**//
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
        personality: "A dignified gentleman with a surprisingly soft side. Mr. Midnight prefers quiet company, meaningful eye contact, and affection on his own terms.",
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
        nickname: "The Affectionate Daydreamer",
        personality: "A tenderhearted sweetheart with a playful streak. Poppy loves being adored, but she's equally content simply sharing a peaceful moment with someone she trusts.",
        likes: "Soft voices, gentle chin scratches, and cozy places to curl up.",
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
        Array.from({ length: catsVisible }, function (_, i) {
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
                    <a href="cats.html?cat=${cat.id}" class="learn-more">View Profile</a>
                </div>
            </article>
        `;
        });
    }
    renderCats();

    //next button on HP carousel
    const nextBttn = document.querySelector(".carousel-next");
    nextBttn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % cats.length;
        renderCats();
    });

    //prev button on HP carousel
    const prevBttn = document.querySelector(".carousel-prev");
    prevBttn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + cats.length) % cats.length;
        renderCats();
    });

    //favorite button for MTC preview on the homepage
    catTrack.addEventListener("click", function (event) {
        const favBttn = event.target.closest(".fav-bttn");

        if (!favBttn) return;

        const catCard = favBttn.closest(".cat-card");
        const catId = catCard.dataset.catId;

        if (favorites.includes(catId)) {
            //removes a cat from favorites
            favorites = favorites.filter(id => id !== catId);
        }
        else {
            favorites.push(catId);
        }
        localStorage.setItem("favoriteCats", JSON.stringify(favorites));
        renderCats();
    });
}

//favorite button clicked
if (catGrid) {
    catGrid.addEventListener("click", function (event) {
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
if (catGrid) {
    catGrid.addEventListener("click", function (event) {
        const profileBttn = event.target.closest(".learn-more");

        if (!profileBttn) return;

        const thisCat = profileBttn.dataset.catId;
        const selectedCat = cats.find(function (cat) {
            return cat.id === thisCat;
        });

        //if the card is expanded, it will show the cat's info
        if (selectedCat) {
            activeCat = selectedCat;
            currentPhoto = 0;
            const catInfo = document.querySelector("#cat-expanded");

            document.querySelector("#expanded-cat-name").textContent = selectedCat.name;
            document.querySelector("#expanded-cat-nickname").textContent = selectedCat.nickname;
            document.querySelector("#expanded-cat-age").innerHTML = `<strong>Age:</strong> ${selectedCat.age} years`;
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

    //opens specific cat profiles on the MTC Page from the Home Page
    //URLSearchParams is JS built API used to iterate, create, and read URLs w/o external libraries
    const selectedCatId = new URLSearchParams(window.location.search).get("cat");

    if (selectedCatId) {
        const matchingProfile = Array.from(catGrid.querySelectorAll(".learn-more"))
            .find(button => button.dataset.catId === selectedCatId);

        if (matchingProfile) {
            matchingProfile.click();
        }
    }
}

//closing the expanded cat profile
const catInfo = document.querySelector("#cat-expanded");
const closeProfile = document.querySelector(".expanded-close");

if (catInfo && closeProfile) {
    closeProfile.addEventListener("click", function () {
        catInfo.close();
    });
}

//selecting the previous cat photo
const prevPhoto = document.querySelector(".img-prev");

if (prevPhoto) {
    prevPhoto.addEventListener("click", function () {
        currentPhoto = (currentPhoto - 1 + activeCat.images.length) % activeCat.images.length;

        document.querySelector("#expanded-cat-img img").src = activeCat.images[currentPhoto];
    });
}
//selecting the next cat photo
const nextPhoto = document.querySelector(".img-next");

if (nextPhoto) {
    nextPhoto.addEventListener("click", function () {
        currentPhoto = (currentPhoto + 1) % activeCat.images.length;

        document.querySelector("#expanded-cat-img img").src = activeCat.images[currentPhoto];
    });
}
//when favorites is clicked in the expanded profile 
const profileFav = document.querySelector("#expanded-favorite");

if (profileFav) {
    profileFav.addEventListener("click", function () {
        const thisCat = profileFav.dataset.catId;

        if (favorites.includes(thisCat)) {
            favorites = favorites.filter(function (id) {
                return id !== thisCat;
            });
        }
        else {
            favorites.push(thisCat);
        }
        localStorage.setItem("favoriteCats", JSON.stringify(favorites));
        profileFav.setAttribute("aria-pressed", favorites.includes(thisCat));

        // Update the matching gallery heart
        const galleryFav = document.querySelector(
            `.cat-card[data-cat-id="${thisCat}"] .fav-bttn`
        );

        if (galleryFav) {
            galleryFav.setAttribute("aria-pressed", favorites.includes(thisCat));
        }
    });
}

/**=========ADOPTION FORM========**/

//For Living Situation if user pickers "other". If users pick "Other", then they can fill in another option.
const livingSituation = document.querySelector("#livingSituation");
const livingOtherField = document.querySelector("#living-other-field");
const livingOther = document.querySelector("#livingOther");

if(livingSituation){
    livingSituation.addEventListener("change", function(){
        if(livingSituation.value === "other"){
            livingOtherField.hidden = false;
            livingOther.disabled = false;
            livingOther.required = true;
        }
        else{
            livingOtherField.hidden =true;
            livingOther.disabled = true;
            livingOther.value = "";
            livingOther.required = false;
        }
    });
}

//For "Other Pets" if users selects that. If they select "yes" then they can fill it in.
const otherPets = document.querySelector("#otherPets");
const petCountField = document.querySelector("#pet-count-field");
const petCount = document.querySelector("#petCount");

if(otherPets){
    otherPets.addEventListener("change", function(){
        if(otherPets.value === "yes"){
            petCountField.hidden = false;
            petCount.disabled = false;
            petCount.required = true;
        }
        else{
            petCountField.hidden = true;
            petCount.disabled = true;
            petCount.required = false;
            petCount.value ="";
        }
    });
}

//Adoption form validation
//users will be prompted with warnings if the form isn't complete or will be prompted with an event listener if the user successfully fills out the form
const adoptionForm =document.querySelector("#adoption-form");

if(adoptionForm){
    adoptionForm.addEventListener("submit", function(event){
        event.preventDefault();

        //users will be prompted a message if the form is fully completed
        if(adoptionForm.checkValidity()){
            alert("Your adoption interest form has been completed! Thank you for your interest in The Heirloom.");
            
            //resets form after submitting
            adoptionForm.reset();
        }
        else{
            adoptionForm.reportValidity();
        }
    });
}


/**=========VISIT US + CONTACT FORM========**/

//Visit Us Form

//select the reservation date field
const visitDay = document.querySelector("#visit-date");
if (visitDay) {
    //gets today's date using the visitor's local time
    //refer to pg. 137 in JavaScript & Jquery by Duckett
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    //sets the earliest selectable date to today
    visitDay.min = `${year}-${month}-${day}`;

    //Selecting the Time in the dropdown
    const visitTime = document.querySelector("#visit-time");

    //updates the time when user changes the date
    visitDay.addEventListener("change", function () {
        visitTime.innerHTML = '<option value="">Select a Time</option>';
        if (!visitDay.value) return;

        //gets the selected day of the week
        const daySelected = new Date(visitDay.value + "T12:00:00").getDay();

        //weekdays open at 11am and weekends open at 10am
        //here 0 through 6 represent the days of the week
        let openingHr;
        if (daySelected === 0 || daySelected === 6) {
            openingHr = 10;
        }
        else {
            openingHr = 11;
        }

        //generates 30 min time slots until 5:00
        //17 is 5pm
        for (let hour = openingHr; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                if (hour === 17 && minute === 30) break;

                //Skipping past time slots when the selected date is "today"
                const currentDay = new Date();
                const selectedDay = visitDay.value;
                const todaysDate = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, "0")}-${String(currentDay.getDate()).padStart(2, "0")}`;

                if (selectedDay === todaysDate) {
                    const selectedMinutes = hour * 60 + minute;
                    const currentMinutes = currentDay.getHours() * 60 + currentDay.getMinutes();

                    if (selectedMinutes <= currentMinutes) {
                        continue;
                    }
                }



                //padStart will turn our minute value 0 to 00 so the time can be formatted as HH:MM
                const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

                // 2000 is a placeholder date
                //toLocaleTimeString converts the time into a 12hr format
                const displayTime = new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-US", {
                    //"2-digit" will display 00 or 30
                    hour: "numeric",
                    minute: "2-digit"
                });
                //this will create a new selectable time
                const option = document.createElement("option");
                option.value = time;
                option.textContent = displayTime;
                visitTime.appendChild(option);
            }
        }

        //shows a message if no reservation times are available
        if (visitTime.options.length === 1) {
            visitTime.options[0].textContent = "No available times remaining today";
        }
    });
    //Checking if the form is complete; gives users a warning if form field is missing; shows confirmation if form is valid; clears form afterwards
    const rsvpForm = document.querySelector("#visit-form");
    rsvpForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (rsvpForm.checkValidity()) {
            alert("Your visit request has been completed! Thank you for planning a visit to The Heirloom.");
            rsvpForm.reset();
        }
        else {
            rsvpForm.reportValidity();
        }
    });

}
//Contact Form
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        //sends message if form was completed
        if (contactForm.checkValidity()) {
            alert("Your form has been completed! Thank you for contacting The Heirloom. Someone will reach out to you shortly!");
            //clears the form after completed successfully
            contactForm.reset();
        }
        else {
            //shows a message if something is missing or invalid
            contactForm.reportValidity();
        }
    });
}