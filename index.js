class Snippet {
    constructor(title, language, code) {
        this.title = title;
        this.language = language;
        this.code = code;
        this.id = Date.now();
    }

}

class snippetManager{
    constructor(){
        this.snippets = [];
    }

    addSnippet(snippet){
        this.snippets.push(snippet);
    }

    deleteSnippet(id){
        this.snippets = this.snippets.filter(snippet => snippet.id !== id);
        const snippetList = document.getElementById("snippet-list");
        snippetList.innerHTML = "";
        this.saveData();
        this.render();
    }

    saveData(){
        localStorage.setItem("snippets", JSON.stringify(this.snippets));
    }

    loadData(){
        const savedSnippets = localStorage.getItem("snippets");
        if (savedSnippets) {
            this.snippets = JSON.parse(savedSnippets);
            this.render();
        }
    }
    
    copyCode(id, button){
        const snippet = this.snippets.find(snippet => snippet.id === id);
        navigator.clipboard.writeText(snippet.code);
        button.textContent = "Copied!";
        setTimeout(() => {
            button.textContent = "Copy";
        }, 2000);
    }

    render(){
        const snippetList = document.getElementById("snippet-list");
        snippetList.innerHTML = "";
        this.snippets.forEach(snippet => {
            const snippetCard = document.createElement("div");
            snippetCard.classList.add("glass-card");
            snippetCard.innerHTML = `
            <h2>${snippet.title}</h2>
            <p>${snippet.language}</p>
            <pre><code>${snippet.code}</code></pre>
            <button onclick="manager.deleteSnippet(${snippet.id})">Delete</button>
            <button onclick="manager.copyCode(${snippet.id}, this)">Copy</button>
            `;
            snippetList.appendChild(snippetCard);
        })
    }
}

class sendCode{
    inputTitle = document.getElementById("title");
    inputLanguage = document.getElementById("language");
    inputCode = document.getElementById("code");
    submitBtn = document.querySelector(".submit-btn");


    init(){
        this.submitBtn.addEventListener("click", () => {
            const snippet = new Snippet(this.inputTitle.value, this.inputLanguage.value, this.inputCode.value);
            this.inputTitle.value = "";
            this.inputLanguage.value = "";
            this.inputCode.value = "";
            console.log(snippet);
            manager.addSnippet(snippet);
            manager.saveData();
            manager.render();
        })
    }
}

const manager = new snippetManager();
manager.loadData();
new sendCode().init();