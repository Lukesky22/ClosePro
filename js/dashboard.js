document.addEventListener("DOMContentLoaded", () => {
    // 1. Affiche le titre du projet
    const project = localStorage.getItem("currentproject") || "Aucun projet";
    document.getElementById("projectTitle").textContent = "Projet : " + project;

    // 2. Affiche le menu selon la discipline
    const discipline = localStorage.getItem("currentDiscipline") || "plumbing";
    const menu = document.getElementById("sidebarMenu");

    const modulesByDiscipline = {
        plumbing: [
            { label: "Équipements", html: "equipment", js: "equipplumbing" },
            { label: "Matériaux", html: "material", js: "material"  },
            { label: "Équipements de Finition", html: "finish", js: "finitionplumbing" },
            { label: "Équipements de Chauffage", html: "heating", js: "heatingequipment" },
            { label: "Sous-contrat", html: "sous-contratP", js: "sous-contrat" },
            { label: "Dépense", html: "DepenseP", js: "Depense" },
            { label: "Main-d'œuvre", html: "pMD", js: "MD" },
            { label: "Résumer", html: "recapP", js: "recap" }
        ],
        hvac: [
            { label: "Équipements CVCA", html: "hequipment", js: "hvacequipment" },
            { label: "Matériaux", html: "hmaterial", js: "material"  },
            { label: "Sous-contrat", html: "hsous-contrat", js: "sous-contrat" },
            { label: "Dépense", html: "hDepense", js: "Depense" },
            { label: "Main-d'œuvre", html: "hMD", js: "MD" },
            { label: "Résumer", html: "recapP", js: "recap" }
        ]
    };

    const modules = modulesByDiscipline[discipline] || [];

    modules.forEach(module => {
        const li = document.createElement("li");
        if (module.placeholder) {
            li.innerHTML = `<span onclick="showPlaceholder('${module.label}')">${module.label}</span>`;
        } else {
            li.innerHTML = `<span onclick="loadModule('modules/${discipline}/${module.html}.html', 'js/JsSection/${module.js}.js')">${module.label}</span>`;
        }
        menu.appendChild(li);
    });
});

function loadModule(path, scriptPath) {
    fetch(path)
        .then(res => res.text())
        .then(html => {
            const main = document.querySelector("main.content");
            main.innerHTML = html;

            // Remet le titre du projet en haut
            const title = localStorage.getItem("currentproject") || "Aucun projet";
            const titleElement = document.createElement("h1");
            titleElement.id = "projectTitle";
            titleElement.textContent = "Projet : " + title;
            main.prepend(titleElement);

            // Charge dynamiquement le JS du module
            if (scriptPath) {
                const existingScript = document.getElementById("dynamic-script");
                if (existingScript) existingScript.remove();

                const script = document.createElement("script");
                script.src = scriptPath;
                script.id = "dynamic-script";
                script.onload = () => {
                    const functionName = getInitFunctionName(scriptPath);
                    if (typeof window[functionName] === "function") {
                        window[functionName](); // Appelle initXxxModule() si existe
                    }
                };
                document.body.appendChild(script);
            }
        })
        .catch(err => {
            console.error("Erreur de chargement du module :", err);
        });
}

function getInitFunctionName(scriptPath) {
    const filename = scriptPath.split("/").pop().split(".")[0]; // exemple: heatingequipment
    const base = filename.replace(/[^a-zA-Z]/g, ""); // nettoie les caractères
    const capitalized = base.charAt(0).toUpperCase() + base.slice(1);
    return "init" + capitalized + "Module"; // donne: initHeatingequipmentModule
}

function showPlaceholder(sectionName) {
    const main = document.querySelector("main.content");
    const title = localStorage.getItem("currentproject") || "Aucun projet";
    main.innerHTML = `
        <h1 id="projectTitle">Projet : ${title}</h1>
        <h2>Section : ${sectionName}</h2>
        <p>Contenu à venir...</p>
    `;
}

function changeProject() {
    localStorage.removeItem("currentproject");
    localStorage.removeItem("currentDiscipline");
    window.location.href = "index.html";
}

function openModule(moduleName) {
    const discipline = localStorage.getItem("currentDiscipline") || "plumbing";
    const htmlPath = `modules/${discipline}/${moduleName}.html`;
    const jsPath = `js/JsSection/${moduleName}${discipline}.js`;
    loadModule(htmlPath, jsPath);
}



