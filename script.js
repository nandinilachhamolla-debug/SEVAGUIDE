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
// SHOW PAGE FUNCTION
// ========================================

function showPage(page) {

    home.classList.remove("active");
    finder.classList.remove("active");
    questions.classList.remove("active");
    results.classList.remove("active");
    details.classList.remove("active");

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// HOME → FINDER
// ========================================

startBtn.addEventListener("click", function () {

    showPage(finder);

});


// ========================================
// FINDER → HOME
// ========================================

backHome.addEventListener("click", function () {

    showPage(home);

});


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
// AI GUIDANCE FUNCTION
// ========================================

async function getAIGuidance(message) {

    try {

        const response = await fetch(
            "http://localhost:3000/api/ai-guide",
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


        const data = await response.json();


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
                "Unable to connect to SevaGuide AI. Please make sure the backend server is running."

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


    // Save AI result for later use

    window.sevaGuideAIResult = data;


    // Move user to results page

    showPage(results);


    // Find the first result card

    const firstResultCard =
        document.querySelector(".result-card");


    if (!firstResultCard) {

        return;

    }


    // Update category

    const tag =
        firstResultCard.querySelector(".result-tag");

    if (tag) {

        tag.textContent =
            data.category.toUpperCase();

    }


    // Update title

    const title =
        firstResultCard.querySelector("h3");

    if (title) {

        title.textContent =
            data.title;

    }


    // Update match badge

    const badge =
        firstResultCard.querySelector(".match-badge");

    if (badge) {

        badge.textContent =
            data.confidence;

    }


    // Update explanation section

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
            data.explanation;


        explanation.style.color =
            "#697386";

        explanation.style.lineHeight =
            "1.6";

        explanation.style.marginBottom =
            "15px";


        whyMatch.appendChild(explanation);


        // AI next questions

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


    // Update next-step information

    const infoBoxes =
        firstResultCard.querySelectorAll(
            ".result-info > div"
        );


    if (
        infoBoxes.length > 0 &&
        data.nextStep
    ) {

        const firstInfo =
            infoBoxes[0];


        firstInfo.querySelector("strong")
            .textContent =
            "Next Step";


        firstInfo.querySelector("p")
            .textContent =
            data.nextStep;

    }


    if (
        infoBoxes.length > 1 &&
        data.verification
    ) {

        const secondInfo =
            infoBoxes[1];


        secondInfo.querySelector("strong")
            .textContent =
            "Verification";


        secondInfo.querySelector("p")
            .textContent =
            data.verification;

    }

}


// ========================================
// TEXT REQUEST → AI
// ========================================

continueBtn.addEventListener(
    "click",
    async function () {


        const request =
            document
                .getElementById("userRequest")
                .value
                .trim();


        if (request === "") {

            alert(
                "Please tell us what you need help with."
            );

            return;

        }


        // Change button while AI is working

        continueBtn.disabled = true;

        continueBtn.textContent =
            "Understanding your request...";


        // Call backend

        const aiResult =
            await getAIGuidance(request);


        // Restore button

        continueBtn.disabled = false;

        continueBtn.textContent =
            "Continue →";


        // Show result

        displayAIResult(aiResult);

    }
);


// ========================================
// QUESTIONS → FINDER
// ========================================

backFinder.addEventListener(
    "click",
    function () {

        showPage(finder);

    }
);


// ========================================
// QUESTIONS → RESULTS
// ========================================

findBtn.addEventListener(
    "click",
    function () {


        const education =
            document
                .getElementById("education")
                .value;


        const state =
            document
                .getElementById("state")
                .value;


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

    }
);


// ========================================
// RESULTS → QUESTIONS
// ========================================

backQuestions.addEventListener(
    "click",
    function () {

        showPage(questions);

    }
);


// ========================================
// RESULTS → DETAILS
// ========================================

detailsBtn.addEventListener(
    "click",
    function () {

        showPage(details);

    }
);


detailsBtn2.addEventListener(
    "click",
    function () {

        showPage(details);

    }
);


// ========================================
// DETAILS → RESULTS
// ========================================

backResults.addEventListener(
    "click",
    function () {

        showPage(results);

    }
);