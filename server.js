const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ========================================
// HOME / SERVER TEST
// ========================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SEVAGUIDE backend is running successfully!"
    });
});


// ========================================
// API TEST
// ========================================

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "SEVAGUIDE API is working!"
    });
});


// ========================================
// AI GUIDE
// ========================================

app.post("/api/ai-guide", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {

            return res.status(400).json({
                success: false,
                error: "Please provide a message."
            });

        }


        /*
         * DEMO AI RESPONSE
         *
         * This allows the prototype to work without
         * exposing an API key in the frontend.
         *
         * Later, a real AI API can be connected here
         * through a secure Render environment variable.
         */


        let response = {

            success: true,

            category: "Scholarship",

            title: "Higher Education Scholarship",

            confidence: "Potential Match",

            explanation:
                "Based on the information you provided, this scholarship may be relevant to students pursuing higher education. Please verify the latest eligibility requirements through the official government source.",

            nextQuestions: [
                "Check your eligibility",
                "Check the required documents",
                "Verify the latest application dates"
            ],

            nextStep:
                "Review the eligibility criteria and prepare the required documents.",

            verification:
                "Always verify eligibility, dates and application instructions through the official government website."

        };


        // ----------------------------------------
        // SIMPLE REQUEST-BASED DEMO RESPONSES
        // ----------------------------------------

        const lowerMessage =
            message.toLowerCase();


        if (
            lowerMessage.includes("job") ||
            lowerMessage.includes("employment")
        ) {

            response.category =
                "Employment";

            response.title =
                "Government Employment Services";

            response.explanation =
                "Your request appears to be related to employment opportunities. SevaGuide can help identify potentially relevant government employment services and schemes.";

        }


        if (
            lowerMessage.includes("scholarship") ||
            lowerMessage.includes("student") ||
            lowerMessage.includes("college") ||
            lowerMessage.includes("b.tech") ||
            lowerMessage.includes("education")
        ) {

            response.category =
                "Education";

            response.title =
                "Higher Education Scholarship";

            response.explanation =
                "Your request appears to be related to higher education. This scholarship may be relevant depending on your eligibility, state, income and other official criteria.";

        }


        if (
            lowerMessage.includes("health") ||
            lowerMessage.includes("hospital") ||
            lowerMessage.includes("medical")
        ) {

            response.category =
                "Healthcare";

            response.title =
                "Government Healthcare Services";

            response.explanation =
                "Your request appears to be related to healthcare. SevaGuide can help you identify potentially relevant government healthcare services.";

        }


        if (
            lowerMessage.includes("housing") ||
            lowerMessage.includes("house")
        ) {

            response.category =
                "Housing";

            response.title =
                "Government Housing Services";

            response.explanation =
                "Your request appears to be related to housing assistance. Please verify the latest eligibility requirements through the official government source.";

        }


        res.json(response);


    } catch (error) {

        console.error(
            "AI Guide Error:",
            error
        );

        res.status(500).json({

            success: false,

            error:
                "Unable to process your request right now."

        });

    }

});


// ========================================
// START SERVER
// ========================================

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `SEVAGUIDE backend running on port ${PORT}`
        );

    }
);