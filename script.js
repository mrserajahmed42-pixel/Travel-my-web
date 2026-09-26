/* =========================================================
   ABDURRAHMAN WEBSITE
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       INTRO ANIMATION
    ===================================================== */

    document.body.classList.add("no-scroll");

    setTimeout(function () {

        const intro = document.getElementById("intro");

        if (intro) {
            intro.classList.add("hide");
        }

        document.body.classList.remove("no-scroll");

    }, 4700);


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", function () {

            navMenu.classList.toggle("open");

            const icon = menuButton.querySelector("i");

            if (navMenu.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* Close mobile menu after clicking link */

        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("open");

                const icon = menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;

            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;

                const target = Number(
                    counter.getAttribute("data-target")
                );

                let current = 0;

                const increment = Math.max(
                    1,
                    Math.ceil(target / 60)
                );

                const updateCounter = function () {

                    current += increment;

                    if (current >= target) {

                        counter.textContent = target;

                        return;

                    }

                    counter.textContent = current;

                    requestAnimationFrame(updateCounter);

                };

                updateCounter();

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.7
        }
    );


    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CLOSE MODALS WITH ESCAPE
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeModal();
            closeHobbyModal();
            closeLightbox();

        }

    });


    /* =====================================================
       CLOSE MODALS WHEN CLICKING OUTSIDE
    ===================================================== */

    const travelModal = document.getElementById("travelModal");

    if (travelModal) {

        travelModal.addEventListener("click", function (event) {

            if (event.target === travelModal) {

                closeModal();

            }

        });

    }


    const hobbyModal = document.getElementById("hobbyModal");

    if (hobbyModal) {

        hobbyModal.addEventListener("click", function (event) {

            if (event.target === hobbyModal) {

                closeHobbyModal();

            }

        });

    }


    const lightbox = document.getElementById("lightbox");

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener("scroll", function () {

            const scrollPosition = window.scrollY;

            if (scrollPosition < window.innerHeight) {

                hero.style.backgroundPosition =
                    "center " + (scrollPosition * 0.25) + "px";

            }

        });

    }

});


/* =========================================================
   TRAVEL INFORMATION
========================================================= */

const travelData = {

      mountains: {
    title: "Mountain Adventures",
    text: "My mountain travel experience and memories.",
    images: [
        "mountain.jpg",
        "me.jpg",
        "m1.jpg",
        "mountain2.jpg"
        
    ]
,
    },

    beaches: {
        title: "Beach Escapes",
        text: "Beaches are perfect for relaxing, watching sunsets and enjoying the sound of the waves. Add your favourite beach destinations and memories here."
    },

    history: {
        title: "Historical Places",
        text: "Historical places connect us with the past. Add the monuments, forts, museums and cultural places that you have explored."
    },

    cities: {
        title: "City Exploration",
        text: "Every city has its own character, food, people and stories. Use this section to share the cities that you have enjoyed exploring."
       , images: [
             "c1.jpeg" ,
            "c2.jpeg"
        ]    
    },

    nature: {
        title: "Nature",
        text: "Nature provides peace and inspiration. Add your favourite forests, gardens, lakes, waterfalls and other natural places here."
    },

    adventure: {
        title: "Adventure",
        text: "Adventure is about trying something new and creating exciting memories. Add your favourite adventurous experiences here."
    }

};


/* =========================================================
   OPEN TRAVEL MODAL
========================================================= */

function openTravel(type) {

    const modal = document.getElementById("travelModal");
    const title = document.getElementById("modalTitle");
    const text = document.getElementById("modalText");
    const gallery = document.getElementById("modalGallery");

    if (!modal || !title || !text || !gallery) {
        return;
    }

    const information = travelData[type];

    if (!information) {
        return;
    }

    title.textContent = information.title;
    text.textContent = information.text;

    gallery.innerHTML = "";

    if (information.images) {

        information.images.forEach(function (photo) {

            const img = document.createElement("img");

            img.src = photo;
            img.alt = information.title;

            img.onclick = function () {
                openLightbox(img);
            };

            gallery.appendChild(img);

        });

    }

    modal.classList.add("show");

    // Lock background page
    document.body.classList.add("no-scroll");
}
/* =========================================================
   CLOSE TRAVEL MODAL
========================================================= */

function closeModal() {

    const modal = document.getElementById("travelModal");

    if (modal) {

        modal.classList.remove("show");

    }

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   HOBBY INFORMATION
========================================================= */

const hobbyData = {

    photography: {
        title: "Photography",
        text: "Photography allows me to capture moments, landscapes and memories. I can use this section later to share my favourite photographs and photography experiences."
    },

    reading: {
        title: "Reading",
        text: "Reading is a great way to explore new ideas, stories and perspectives. Add your favourite books and reading interests here."
    },

    music: {
        title: "Music",
        text: "Music can create a mood, bring back memories and make a journey even more enjoyable. Add your favourite genres or musical interests here."
    },

    gaming: {
        title: "Gaming",
        text: "Gaming is an enjoyable way to explore interactive worlds and spend free time. Add your favourite games and gaming interests here."
    },

    nature: {
        title: "Exploring Nature",
        text: "Spending time around nature is peaceful and inspiring. Add the natural places and outdoor activities you enjoy."
    },

    learning: {
        title: "Learning",
        text: "Learning something new keeps life interesting. Add the subjects, skills and topics that you enjoy learning about."
    }

};


/* =========================================================
   OPEN HOBBY MODAL
========================================================= */

function openHobby(type) {

    const modal = document.getElementById("hobbyModal");

    const title = document.getElementById("hobbyTitle");

    const text = document.getElementById("hobbyText");

    if (!modal || !title || !text) {
        return;
    }

    const information = hobbyData[type];

    if (!information) {
        return;
    }

    title.textContent = information.title;

    text.textContent = information.text;

    modal.classList.add("show");

    document.body.classList.add("no-scroll");

}


/* =========================================================
   CLOSE HOBBY MODAL
========================================================= */

function closeHobbyModal() {

    const modal = document.getElementById("hobbyModal");

    if (modal) {

        modal.classList.remove("show");

    }

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

function openLightbox(element) {

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    if (!lightbox || !lightboxImage) {
        return;
    }

    lightboxImage.src = element.src;
    lightboxImage.alt = element.alt;

    lightbox.classList.add("show");

    document.body.classList.add("no-scroll");
}

/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    const lightbox = document.getElementById("lightbox");

    if (lightbox) {

        lightbox.classList.remove("show");

    }

    document.body.classList.remove("no-scroll");

}