class NoteForm extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                form {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                h2 {
                    margin-bottom: 20px;
                    color: var(--dark-color);
                }
                
                .form-group {
                    margin-bottom: 15px;
                }
                
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                    color: var(--gray-color);
                }
                
                input, textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }
                
                textarea {
                    min-height: 150px;
                    resize: vertical;
                }
                
                button {
                    background-color: #333;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                
                button:hover {
                    background-color: #3367d6;
                }
            </style>
            
            <form id="noteForm">
                <h2>Add New Note</h2>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="body">Note Content</label>
                    <textarea id="body" name="body" required></textarea>
                </div>
                <button type="submit">Save Note</button>
            </form>
        `;

    this.shadowRoot
      .getElementById("noteForm")
      .addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();

    const title = this.shadowRoot.getElementById("title").value;
    const body = this.shadowRoot.getElementById("body").value;

    this.dispatchEvent(
      new CustomEvent("newNoteAdded", {
        detail: { title, body },
        bubbles: true,
        composed: true,
      })
    );

    this.shadowRoot.getElementById("noteForm").reset();
  }
}

customElements.define("note-form", NoteForm);
