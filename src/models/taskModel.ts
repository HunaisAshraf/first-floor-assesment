import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
