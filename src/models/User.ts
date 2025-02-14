import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true, // Consider hashing with bcrypt or similar
    },
    role: {
      type: String,
      enum: ["teacher", "director", "parent", "superAdmin"], // Ensure only these roles are allowed
      required: true,
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution", // Connect to Institution for teacher/director roles
    },
    groupClass: {
      type: Schema.Types.ObjectId,
      ref: "GroupClass", // Connect to GroupClass for teacher/director roles
      default: null
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Kid", // Connect to Kid for parent roles
      },
    ],
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFirstLogin: { type: Boolean, default: true }, // Track first login status
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
