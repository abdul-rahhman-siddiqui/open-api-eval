import mongoose from "mongoose";
const summarySchema = new mongoose.Schema(
  {
    specName: String,
    total: Number,
    successes: Number,
    failures: Number,
    breakdown: Object, // { "/pets GET": 0.9, ... }
    swagger: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);
export default mongoose.model("Summary", summarySchema);
