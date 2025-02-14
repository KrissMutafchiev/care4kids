import mongoose from "mongoose";
 
const { Schema } = mongoose;
 
const feedbackSchema = new Schema(
    {
        providedBy: {
            type: String,
            required: true,
        },
        isHappy: {
            type: String,
            required: true,
        },
        eatBreakfast: {
            type: String,
            required: true,
        },
        eatLunch: {
            type: String,
            required: true,
        },
        eatSnacks: {
            type: String,
            required: true,
        },
        sleep: {
            type: String,
            required: true,
        },
        additionalInfo: {
            type: String,
            required: true,
        },
        Improvements: {
            type: String,
            required: true,
        },
        teacher: {
            type: Schema.Types.ObjectId, // Reference to the User collection
            ref: "User",
            required: true,
        },
        kid: {
            type: Schema.Types.ObjectId, // Reference to the Kid collection
            ref: "Kid",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);
export default mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);