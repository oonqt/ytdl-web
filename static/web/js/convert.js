let isDownloading = false;

document.getElementById("convertForm").addEventListener("submit", async e => {
    e.preventDefault();

    if(isDownloading) { 
        return showError("Unable to download", "A video is already being converted")
    } else {
        isDownloading = true;
    }

    let url = document.getElementById("videoUrl").value;
    let format = document.getElementById("format").value;

    await axios.post("/api/info", {
        url
    })
    .then(async response => {
        if(response.status === 200) { 
            showSpinner(true);
    
            await axios({
                method: "POST",
                url: "/api/convert",
                responseType: "blob",
                data: {
                    url,
                    format
                }
            })
            .then(data => {
                showSpinner(false);
                download(data.data, `${response.data.title}.${format}`);
                isDownloading = false;
            })
            .catch(e => {
                showSpinner(false);
                isDownloading = false;
                showError("Failed to download", "Hmm... Something unexpected happened. Your download was unable to complete.");
                console.error(e);
            });
        } else {
            isDownloading = false;
            showError("Failed to download", "Hmm... Something unexpected happened. Your download was unable to complete.");
        }
    })
    .catch(e => {
        if(e.response && e.response.status === 400) {
            isDownloading = false;
            showError("Failed to download", e.response.data.msg)
        } else {
            isDownloading = false;
            showError("Failed to download", "Hmm... Something unexpected happened. Your download was unable to complete.");
            console.error(e);
        }
    });
});

const showSpinner = (show) => {
    const loader = document.getElementById("loadingSpinner");

    loader.hidden = !show;
}

const showError = (header, message) => {
    const div = document.createElement("div");

    div.className = "modal";

    div.style="max-width: 600px; min-height: 205px;"

    div.innerHTML = `
        <div class="modal-content" style="text-align: center; color: #282828; margin-bottom: 50px;">
            <h3 style="font-weight: 450; margin-top: 5px;">${header}</h3>
            <h5 style="margin-top: 20px; font-weight: 350;">${message}</h5>
        </div>
        <div class="modal-footer" style="position: absolute; bottom: 0;">
            <button class="modal-close waves-effect waves-light btn modalBtn" style="display: block; margin: auto; width: 96%; height: 40px;">Close</button>
        </div>
    `;

    document.body.appendChild(div);

    M.Modal.init(div);

    M.Modal.getInstance(div).open();
}