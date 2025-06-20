import mongoose from "mongoose";
const logSchema = new mongoose.Schema(
  {
    path: String,
    method: String,
    status: Number,
    success: Boolean,
    requestBody: Object,
    responseBody: Object,
    error: String,
  },
  { timestamps: true }
);
export default mongoose.model("Log", logSchema);
