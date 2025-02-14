import mongoose from "mongoose";

const { Schema } = mongoose;

const kidSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    midddleName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId, // Reference to the Group collection
      ref: "Group",
      required: true,
    },
    teachers: [
      {
        type: Schema.Types.ObjectId, // Array of references to User (parent(s))
        ref: "User",
        required: true,
      },
    ],
    institution: {
      type: Schema.Types.ObjectId, // Reference to the Institution collection
      ref: "Institution",
      required: true,
    },
    parents: [
      {
        type: Schema.Types.ObjectId, // Array of references to User (parent(s))
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.Kid || mongoose.model("Kid", kidSchema);
