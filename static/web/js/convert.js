document.getElementById("convertForm").addEventListener("submit", async e => {
    e.preventDefault();

    let url = document.getElementById("videoUrl").value;
    let format = document.getElementById("format").value;

    try {
        let req = await axios.post("/api/check", {
            url: url
        });

        if(req.status === 400) {

        } else {
            showError("Unable to download", "Hmm... Something unexpected happened, your download was unable to complete.");
        }
    } catch (e) {
        if(!e.response.data.valid) {
            showError("Unable to download", "YouTube video is either private or doesn't exist")
        } else {
            showError("Unable to download", "Hmm... Something unexpected happened, your download was unable to complete.");
        }
    }
});

const showError = (header, message) => {
    const div = document.createElement("div");

    div.className = "modal";

    div.style="max-width: 600px; min-height: 205px;"

    div.innerHTML = `
        <div class="modal-content" style="text-align: center; color: #282828; margin-bottom: 40px;">
            <h3 style="font-weight: 450; margin-top: 15px;">${header}</h3>
            <h5>${message}</h5>
        </div>
        <div class="modal-footer" style="position: absolute; bottom: 0;">
            <a href="#!" class="modal-close waves-effect waves-light btn modalBtn" style="display: block; margin: auto; width: 96%;">Close</a>
        </div>
    `;

    document.body.appendChild(div);

    M.Modal.init(div);

    M.Modal.getInstance(div).open();
}