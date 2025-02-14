import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    institution: {
      type: Schema.Types.ObjectId, // Reference to Institution collection
      ref: "Institution",
      required: true,
    },
    kids: [
      {
        type: Schema.Types.ObjectId, // Array of Kid references
        ref: "Kid",
      },
    ],
    teacher: [
      {
        type: Schema.Types.ObjectId, // Array of User for the group teacher
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.GroupClass || mongoose.model("GroupClass", groupSchema);
