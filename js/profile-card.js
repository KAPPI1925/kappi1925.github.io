window.addEventListener("DOMContentLoaded", async function () {
    async function get(url) {
        const resp = await fetch(url);
        return resp.json();
    }

    // NOTE: ResearchGate does not provide a public API to fetch user data dynamically.
    // The data is currently static and needs to be updated manually in user-data/user-data.js.
    function createResearchGateCard(profile) {
        const el = document.querySelector(".researchgate-card");
        el.innerHTML = `
        <a href="${profile.url}" target="_blank" style="text-decoration: none; color: black; display: block; border-radius: 12px; padding: 16px; font-size: 14px; background: linear-gradient(135deg, #4CCEFF, #00AEEF); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease-in-out;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <img style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #fff;" src="${profile.avatar}" alt="Profile image"></img>
                <div style="flex-grow: 1;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold;">${profile.name}</h3>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #555;">
                        @${profile.url.replace("https://www.", "")}
                    </p>
                </div>
            </div>
            <div style="margin-top: 16px; display: flex; justify-content: space-between; text-align: center;">
                <div>
                    <p style="font-size: 12px; color: #666; margin: 0;">RESEARCH INTEREST</p>
                    <p style="font-size: 20px; font-weight: bold; color: #222;">${profile.stats.researchInterest}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: #666; margin: 0;">CITATIONS</p>
                    <p style="font-size: 20px; font-weight: bold; color: #222;">${profile.stats.citations}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: #666; margin: 0;">H-INDEX</p>
                    <p style="font-size: 20px; font-weight: bold; color: #222;">${profile.stats.hIndex}</p>
                </div>
            </div>
        </a>
        `;
    }

    async function createGitHubCard(username) {
        const el = document.querySelector(".github-card");
        const response = await get(`https://api.github.com/users/${username}`);
        const { name, avatar_url, public_repos, followers, html_url, following } =
            response;

        el.innerHTML = `
        <a href="${html_url}" target="_blank" style="text-decoration: none; color: black; display: block; border-radius: 12px; padding: 16px; font-size: 14px; background: linear-gradient(135deg, #4CCEFF, #00AEEF); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); transition: transform 0.2s ease-in-out;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <img style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #fff;" src="${avatar_url}" alt="Profile image"></img>
                <div style="flex-grow: 1;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold;">${name}</h3>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #555;">
                        @${html_url.replace("https://", "")}
                    </p>
                </div>
            </div>
            <div style="margin-top: 16px; display: flex; justify-content: space-between; text-align: center;">
                <div>
                    <p style="font-size: 12px; color: #666; margin: 0;">REPOSITORIES</p>
                    <p style="font-size: 20px; font-weight: bold; color: #222;">${public_repos}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: #666; margin: 0;">FOLLOWERS</p>
                    <p style="font-size: 20px; font-weight: bold; color: #222;">${followers}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: #666; margin: 0;">FOLLOWING</p>
                    <p style="font-size: 20px; font-weight: bold; color: #222;">${following}</p>
                </div>
            </div>
        </a>
        `;
    }

    createResearchGateCard(researchGateProfile);
    createGitHubCard(githubProfile.username);
});
