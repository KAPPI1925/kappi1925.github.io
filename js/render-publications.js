(function () {
    "use strict";

    function renderPublications() {
        const reposContainer = document.getElementById("repos");
        if (!reposContainer || typeof publications === "undefined") {
            return;
        }

        // Clear existing content (hardcoded cards)
        reposContainer.innerHTML = "";

        // Create a wrapper for the flex layout
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexWrap = "wrap";
        wrapper.style.gap = "16px";
        wrapper.style.justifyContent = "space-between";

        publications.forEach(pub => {
            const card = document.createElement("div");
            card.className = "repo-card";
            card.style.flex = "1 0 48%";
            card.style.display = "flex";
            card.style.flexDirection = "column";
            card.style.justifyContent = "space-between";
            card.style.borderRadius = "12px";
            card.style.padding = "16px";
            card.style.fontSize = "14px";
            card.style.background = "linear-gradient(135deg, #4CCEFF, #00AEEF)";
            card.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 10px";
            card.style.transition = "transform 0.2s ease-in-out";
            card.style.cursor = "pointer";

            const link = document.createElement("a");
            link.href = pub.url;
            link.target = "_blank";
            link.style.textDecoration = "none";
            link.style.color = "black";
            link.style.display = "block";
            link.style.height = "100%";

            const title = document.createElement("h4");
            title.className = "repo-heading";
            title.style.margin = "0px";
            title.style.fontSize = "18px";
            title.style.fontWeight = "bold";
            title.textContent = pub.title;

            const desc = document.createElement("p");
            desc.className = "repo-description";
            desc.style.marginTop = "8px";
            desc.style.fontSize = "12px";
            desc.style.color = "rgb(85, 85, 85)";
            desc.textContent = pub.description;

            const stats = document.createElement("div");
            stats.style.display = "flex";
            stats.style.alignItems = "center";
            stats.style.gap = "16px";
            stats.style.marginTop = "12px";
            stats.style.fontSize = "12px";
            stats.style.color = "rgb(102, 102, 102)";

            // Research Interest
            const riDiv = document.createElement("div");
            riDiv.style.display = "flex";
            riDiv.style.alignItems = "center";
            riDiv.style.gap = "4px";
            riDiv.innerHTML = `<img src="https://img.icons8.com/ios-filled/20/financial-growth-analysis.png" alt="research score"> ${pub.stats.researchInterest}`;

            // Citations
            const citeDiv = document.createElement("div");
            citeDiv.style.display = "flex";
            citeDiv.style.alignItems = "center";
            citeDiv.style.gap = "4px";
            citeDiv.innerHTML = `<img src="https://img.icons8.com/ios-glyphs/16/quote-right.png" alt="citation"> ${pub.stats.citations}`;

            // Reads (Views)
            const readsDiv = document.createElement("div");
            readsDiv.style.display = "flex";
            readsDiv.style.alignItems = "center";
            readsDiv.style.gap = "4px";
            readsDiv.innerHTML = `<img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/24/external-eye-graphic-design-tanah-basah-glyph-tanah-basah.png" alt="views"> ${pub.stats.reads}`;

            stats.appendChild(riDiv);
            stats.appendChild(citeDiv);
            stats.appendChild(readsDiv);

            link.appendChild(title);
            link.appendChild(desc);
            link.appendChild(stats);
            card.appendChild(link);
            wrapper.appendChild(card);
        });

        reposContainer.appendChild(wrapper);
    }

    // Run when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderPublications);
    } else {
        renderPublications();
    }
})();
