import mongoose from "mongoose";
 
const { Schema } = mongoose;
 
const institutionSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Institution name is required."],
          },
          address: {
            type: String,
            required: [true, "Institution address is required."],
          },
          email: {
            type: String,
            required: [true, "Institution email is required."],
            unique: true,
          },
          uic: {
            type: String,
            required: [true, "Institution UIC (Unique Identification Code) is required."],
            unique: true,
          },
          contactPerson: {
            type: String,
          },
        
    },
    { timestamps: true }
);
export default mongoose.models.Institution || mongoose.model("Institution", institutionSchema);