import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Review from "../../models/Review";

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.method === "POST") {
        try {
            await db.connect();

            const { productId, fullName, rating, reviewText } = req.body;

            // Create a new review instance
            const review = new Review({
                productId,
                fullName,
                rating,
                reviewText,
                userId: session.user.id, // Assuming you have a user ID associated with the review
            });

            // Save the review to the database
            await review.save();
            console.log("Review added successfully:", review);
            return res.status(201).json({ message: "Review added successfully" });
        } catch (error) {
            console.error("Failed to add review:", error);
            return res.status(500).json({ message: "Failed to add review" });
        }
    }

    return res.status(404).end();
}

