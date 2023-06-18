import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        fullName: { type: String, required: true },
        rating: { type: Number, required: true },
        reviewText: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
