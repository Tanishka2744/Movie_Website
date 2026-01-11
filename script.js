/* MOVIE SLIDER */
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
    const items = movieLists[i].querySelectorAll(".movie-list-item").length;
    let clickCount = 0;

    arrow.addEventListener("click", () => {
        const visibleItems = Math.floor(window.innerWidth / 270);
        clickCount++;

        if (items - (clickCount + visibleItems) >= 0) {
            movieLists[i].style.transform = `translateX(${-300 * clickCount}px)`;
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCount = 0;
        }
    });
});

/* DARK / LIGHT TOGGLE */
const toggleBall = document.querySelector(".toggle-ball");
const toggleItems = document.querySelectorAll(".container,.navbar,.sidebar,.left-menu-icon,.movie-list-title,.toggle");

toggleBall.addEventListener("click", () => {
    toggleItems.forEach(item => item.classList.toggle("active"));
    toggleBall.classList.toggle("active");
});

/* WATCH MODAL */
const watchButtons = document.querySelectorAll(".movie-list-item-button");

watchButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".movie-list-item");
        const posterSrc = card.querySelector("img").src;
        const title = card.querySelector(".movie-list-item-tittle").innerText;

        let oldModal = document.getElementById("movieModal");
        if (oldModal) oldModal.remove();

        const modal = document.createElement("div");
        modal.id = "movieModal";
        Object.assign(modal.style, {
            position: "fixed", inset: "0", background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: "9999"
        });

        const content = document.createElement("div");
        Object.assign(content.style, {
            background: "#1c1c1c", padding: "20px", borderRadius: "15px",
            width: "320px", textAlign: "center", color: "#fff", position: "relative"
        });

        content.innerHTML = `
            <span style="position:absolute; top:10px; right:15px; font-size:26px; cursor:pointer;">&times;</span>
            <img src="${posterSrc}" style="width:100%; border-radius:10px;">
            <h3 style="margin:15px 0;">${title}</h3>
            <p style="color:#ffcc70;">Action | Drama</p>
            <button style="margin-top:15px; padding:10px 25px; background:#f03e7a; border:none; border-radius:25px; color:white; font-weight:bold; cursor:pointer;">
                Get Started →
            </button>
        `;

        content.querySelector("span").onclick = () => modal.remove();
        modal.onclick = e => e.target === modal && modal.remove();

        modal.appendChild(content);
        document.body.appendChild(modal);
    });
});
