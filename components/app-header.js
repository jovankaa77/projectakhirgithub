class AppHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: var(--primary-color);
                    color: #333;
                    padding: 20px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    text-align: center;
                }
                
                h1 {
                    margin: 0;
                    font-size: 1.8rem;
                }
                
                p {
                    margin: 5px 0 0;
                    opacity: 0.9;
                }
            </style>
            
            <header>
                <h1>Notes App</h1>
                <p>Keep your thoughts organized</p>
            </header>
        `;
  }
}

customElements.define("app-header", AppHeader);
