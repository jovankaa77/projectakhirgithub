class NoteItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "Untitled Note";
    const body = this.getAttribute("body") || "No content";
    const createdAt =
      this.getAttribute("created-at") || new Date().toISOString();

    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    padding: 20px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .note-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                
                h3 {
                    margin: 0 0 10px;
                    color: var(--primary-color);
                    font-size: 1.2rem;
                }
                
                .note-body {
                    flex-grow: 1;
                    margin-bottom: 15px;
                    color: var(--gray-color);
                    white-space: pre-line;
                }
                
                .note-date {
                    font-size: 0.8rem;
                    color: #999;
                    margin-top: auto;
                }
                
                .note-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 15px;
                }
                
                button {
                    padding: 5px 10px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                }
                
                .archive-btn {
                    background-color: var(--secondary-color);
                    color: white;
                }
                
                .delete-btn {
                    background-color: var(--danger-color);
                    color: white;
                }
            </style>
            
            <div class="note-card">
                <h3>${title}</h3>
                <div class="note-body">${body}</div>
                <div class="note-date">Created: ${formattedDate}</div>
                <div class="note-actions">
                    <button class="archive-btn">Archive</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;

    this.shadowRoot
      .querySelector(".archive-btn")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("archiveNote", {
            bubbles: true,
            composed: true,
          })
        );
      });

    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("deleteNote", {
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define("note-item", NoteItem);
