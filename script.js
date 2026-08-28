// ========================================
// SEVAGUIDE - MAIN SCRIPT
// ========================================


// ========================================
// PAGE REFERENCES
// ========================================

const home = document.getElementById("home");
const finder = document.getElementById("finder");
const questions = document.getElementById("questions");
const results = document.getElementById("results");
const details = document.getElementById("details");


// ========================================
// BUTTON REFERENCES
// ========================================

const startBtn = document.getElementById("startBtn");
const backHome = document.getElementById("backHome");
const backFinder = document.getElementById("backFinder");
const backQuestions = document.getElementById("backQuestions");
const backResults = document.getElementById("backResults");

const continueBtn = document.getElementById("continueBtn");
const findBtn = document.getElementById("findBtn");

const detailsBtn = document.getElementById("detailsBtn");
const detailsBtn2 = document.getElementById("detailsBtn2");


// ========================================
// SHOW PAGE
// ========================================

function showPage(page) {

    if (!page) return;

    [home, finder, questions, results, details]
        .forEach(function (section) {

            if (section) {
                section.classList.remove("active");
            }

        });

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// HOME → FINDER
// ========================================

if (startBtn) {

    startBtn.addEventListener("click", function () {

        showPage(finder);

    });

}


// ========================================
// FINDER → HOME
// ========================================

if (backHome) {

    backHome.addEventListener("click", function () {

        showPage(home);

    });

}


// ========================================
// SERVICE CARDS
// ========================================

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const service =
            card.getAttribute("data-service");

        if (service === "scholarship") {

            showPage(questions);

        } else {

            alert(
                "This service will be added in a future version."
            );

        }

    });

});


// ========================================
// QUESTIONS → FINDER
// ========================================

if (backFinder) {

    backFinder.addEventListener("click", function () {

        showPage(finder);

    });

}


// ========================================
// QUESTIONS → RESULTS
// ========================================

if (findBtn) {

    findBtn.addEventListener("click", function () {

        const educationElement =
            document.getElementById("education");

        const stateElement =
            document.getElementById("state");

        const education =
            educationElement
                ? educationElement.value
                : "";

        const state =
            stateElement
                ? stateElement.value
                : "";

        if (education === "") {

            alert(
                "Please select your education level."
            );

            return;

        }

        if (state === "") {

            alert(
                "Please select your state."
            );

            return;

        }

        showPage(results);

    });

}


// ========================================
// RESULTS → QUESTIONS
// ========================================

if (backQuestions) {

    backQuestions.addEventListener("click", function () {

        showPage(questions);

    });

}


// ========================================
// RESULTS → DETAILS
// ========================================

if (detailsBtn) {

    detailsBtn.addEventListener("click", function () {

        showPage(details);

    });

}

if (detailsBtn2) {

    detailsBtn2.addEventListener("click", function () {

        showPage(details);

    });

}


// ========================================
// DETAILS → RESULTS
// ========================================

if (backResults) {

    backResults.addEventListener("click", function () {

        showPage(results);

    });

}


// ========================================
// LIVE RENDER BACKEND
// ========================================

const API_BASE_URL =
    "https://sevaguide.onrender.com";


// ========================================
// AI GUIDANCE FUNCTION
// ========================================

async function getAIGuidance(message) {

    try {

        const response = await fetch(
            API_BASE_URL + "/api/ai-guide",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || "Server error"
            );

        }

        return data;

    } catch (error) {

        console.error(
            "AI Guidance Error:",
            error
        );

        return {

            success: false,

            error:
                "Unable to connect to SevaGuide AI. Please try again."

        };

    }

}


// ========================================
// DISPLAY AI RESULT
// ========================================

function displayAIResult(data) {

    if (!data.success) {

        alert(data.error);

        return;

    }

    window.sevaGuideAIResult = data;

    showPage(results);

    const firstResultCard =
        document.querySelector(".result-card");

    if (!firstResultCard) {

        return;

    }


    // CATEGORY

    const tag =
        firstResultCard.querySelector(".result-tag");

    if (tag && data.category) {

        tag.textContent =
            data.category.toUpperCase();

    }


    // TITLE

    const title =
        firstResultCard.querySelector("h3");

    if (title && data.title) {

        title.textContent =
            data.title;

    }


    // MATCH BADGE

    const badge =
        firstResultCard.querySelector(".match-badge");

    if (badge && data.confidence) {

        badge.textContent =
            data.confidence;

    }


    // WHY MATCH

    const whyMatch =
        firstResultCard.querySelector(".why-match");

    if (whyMatch) {

        whyMatch.innerHTML = "";

        const heading =
            document.createElement("h4");

        heading.textContent =
            "🤖 Why SevaGuide suggested this";

        whyMatch.appendChild(heading);


        const explanation =
            document.createElement("p");

        explanation.textContent =
            data.explanation || "";

        explanation.style.color =
            "#697386";

        explanation.style.lineHeight =
            "1.6";

        explanation.style.marginBottom =
            "15px";

        whyMatch.appendChild(explanation);


        // NEXT QUESTIONS

        if (
            data.nextQuestions &&
            data.nextQuestions.length > 0
        ) {

            const questionContainer =
                document.createElement("div");

            questionContainer.className =
                "match-points";

            data.nextQuestions.forEach(
                function (question) {

                    const questionElement =
                        document.createElement("span");

                    questionElement.textContent =
                        "❓ " + question;

                    questionContainer.appendChild(
                        questionElement
                    );

                }
            );

            whyMatch.appendChild(
                questionContainer
            );

        }

    }


    // RESULT INFORMATION

    const infoBoxes =
        firstResultCard.querySelectorAll(
            ".result-info > div"
        );


    // NEXT STEP

    if (
        infoBoxes.length > 0 &&
        data.nextStep
    ) {

        const firstInfo =
            infoBoxes[0];

        const strong =
            firstInfo.querySelector("strong");

        const paragraph =
            firstInfo.querySelector("p");

        if (strong) {

            strong.textContent =
                "Next Step";

        }

        if (paragraph) {

            paragraph.textContent =
                data.nextStep;

        }

    }


    // VERIFICATION

    if (
        infoBoxes.length > 1 &&
        data.verification
    ) {

        const secondInfo =
            infoBoxes[1];

        const strong =
            secondInfo.querySelector("strong");

        const paragraph =
            secondInfo.querySelector("p");

        if (strong) {

            strong.textContent =
                "Verification";

        }

        if (paragraph) {

            paragraph.textContent =
                data.verification;

        }

    }

}


// ========================================
// TEXT REQUEST → AI
// ========================================

const userRequest =
    document.getElementById("userRequest");


if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        async function () {

            const request =
                userRequest
                    ? userRequest.value.trim()
                    : "";

            if (request === "") {

                alert(
                    "Please type or speak what you need help with."
                );

                return;

            }

            continueBtn.disabled = true;

            continueBtn.textContent =
                "Understanding your request...";


            const aiResult =
                await getAIGuidance(request);


            continueBtn.disabled = false;

            continueBtn.textContent =
                "Continue →";


            displayAIResult(aiResult);

        }
    );

}


// ========================================
// 🎤 VOICE INPUT
// ========================================

function setupVoiceInput() {

    if (!userRequest) {

        console.warn(
            "userRequest element was not found."
        );

        return;

    }


    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech recognition is not supported in this browser."
        );

        return;

    }


    // Prevent duplicate microphone buttons

    if (
        document.getElementById("voiceBtn")
    ) {

        return;

    }


    // CREATE MICROPHONE BUTTON

    const voiceButton =
        document.createElement("button");

    voiceButton.type =
        "button";

    voiceButton.id =
        "voiceBtn";

    voiceButton.textContent =
        "🎤 Speak";

    voiceButton.setAttribute(
        "aria-label",
        "Speak your request"
    );


    // BUTTON STYLE

    voiceButton.style.marginTop =
        "10px";

    voiceButton.style.padding =
        "12px 18px";

    voiceButton.style.border =
        "none";

    voiceButton.style.borderRadius =
        "10px";

    voiceButton.style.cursor =
        "pointer";

    voiceButton.style.fontSize =
        "15px";


    // ADD BUTTON

    if (userRequest.parentNode) {

        userRequest.parentNode.insertBefore(
            voiceButton,
            userRequest.nextSibling
        );

    }


    // SPEECH RECOGNITION

    const recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;

    recognition.interimResults =
        false;

    recognition.lang =
        "en-IN";


    // START LISTENING

    voiceButton.addEventListener(
        "click",
        function () {

            try {

                recognition.start();

                voiceButton.textContent =
                    "🔴 Listening...";

                voiceButton.disabled =
                    true;

            } catch (error) {

                console.log(
                    "Voice recognition:",
                    error
                );

            }

        }
    );


    // SPEECH RESULT

    recognition.addEventListener(
        "result",
        function (event) {

            const transcript =
                event.results[0][0].transcript;

            userRequest.value =
                transcript;

            voiceButton.textContent =
                "🎤 Speak";

            voiceButton.disabled =
                false;

        }
    );


    // SPEECH END

    recognition.addEventListener(
        "end",
        function () {

            voiceButton.textContent =
                "🎤 Speak";

            voiceButton.disabled =
                false;

        }
    );


    // SPEECH ERROR

    recognition.addEventListener(
        "error",
        function (event) {

            console.error(
                "Voice recognition error:",
                event.error
            );

            voiceButton.textContent =
                "🎤 Speak";

            voiceButton.disabled =
                false;


            if (
                event.error === "not-allowed"
            ) {

                alert(
                    "Please allow microphone permission and try again."
                );

            }

        }
    );

}


// ========================================
// START VOICE FEATURE
// ========================================

setupVoiceInput();


// ========================================
// END OF SEVAGUIDE SCRIPT
// ========================================