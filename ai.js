const aiSolverBtn = document.getElementById("aiSolverBtn");
const displayDiv = document.getElementById("displayDiv");

export function goToAISolver() {
    displayDiv.innerHTML = `
    <div class="container">
    <div button="backBtnDiv">
        <button id="backBtn">Back to Calculator</button>
    </div>

    <h1>AI Math Solver 📷</h1>

    <p>Take a photo</p>

    <video id="video" autoplay playsinline muted></video>

    <button id="captureBtn">Capture</button>
    <button id="solveBtn">Solve Problem</button>

    <canvas id="canvas" style="display:none;"></canvas>

    <div id="preview"></div>

    <div id="resultBox">
        <h2>Solution</h2>
        <div id="solution"></div>
    </div>
</div>`;

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
    location.reload(); // simple way to go back to calculator
});

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const solveBtn = document.getElementById("solveBtn");
const preview = document.getElementById("preview");
const solution = document.getElementById("solution");

let imageBase64 = "";

/* =========================
   START CAMERA
========================= */
async function startCamera() {

    // Check support first
    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        alert("Camera API not supported");

        return;
    }

    try {

        const stream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },

            audio: false

        });

        video.srcObject = stream;

        console.log("Camera started");

    } catch (err) {

    console.log("Camera Error:", err);

    // Permission denied
    if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
    ) {

        const openSettings = confirm(
            "Camera permission is blocked.\n\n" +
            "To enable it:\n\n" +
            "ANDROID:\n" +
            "1. Tap the lock icon near the URL\n" +
            "2. Open Site Settings\n" +
            "3. Allow Camera Permission\n\n" +
            "Then refresh the page.\n\n" +
            "Press OK to reload."
        );

        if(openSettings){
            location.reload();
        }

    }

    // Camera missing
    else if (
        err.name === "NotFoundError" ||
        err.name === "DevicesNotFoundError"
    ) {

        alert("No camera device found.");

    }

    // Other errors
    else {

        alert(
            "Camera not supported on this device/browser.\n\n" +
            "Use Chrome browser."
        );

    }
}
}

startCamera();

/* =========================
   CAPTURE IMAGE
========================= */
captureBtn.addEventListener("click", () => {

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    imageBase64 = canvas.toDataURL(
        "image/jpeg",
        0.7
    );

    preview.innerHTML = `<img src="${imageBase64}">`;
});

/* =========================
   SOLVE WITH AI (same logic)
========================= */
solveBtn.addEventListener("click", async () => {

    if (!imageBase64) {
        alert("Capture an image first!");
        return;
    }

    solution.innerHTML = "Solving... ⏳";

    const API_KEY = `AIzaSyDaGQVJFGa5IKMGhqrayK08oZG8PSJaWuE`;

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            text: `
                        You are a math tutor.

                        Read the math problem carefully from the image.

                        Then:

                        1. Rewrite the question
                        2. Solve step by step
                        3. Explain clearly
                        4. Give final answer

                        If image is unclear, say:
                        "Image unclear"
                            `
                        },
                        {
                            inline_data: {
                                mime_type: "image/jpeg",
                                data: imageBase64.split(",")[1]
                            }
                        }
                    ]
                }]
            })
        }
    );

    const data = await res.json();
    console.log(data);

    if(data.candidates){

        const answer =
            data.candidates[0].content.parts[0].text;

        solution.innerHTML = answer;

    }else if(data.error){

        solution.innerHTML =
            "Error: " + data.error.message;

    }else{

        solution.innerHTML =
            "No solution found.";

    }
    });
}