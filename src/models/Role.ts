import mongoose from "mongoose";
 
const { Schema } = mongoose;
 
const roleSchema = new Schema(
    {
        name: {
            type: Array<String>,
            required: true,
        },


    },
    { timestamps: true }
);
export default mongoose.models.Role || mongoose.model("Role", roleSchema);