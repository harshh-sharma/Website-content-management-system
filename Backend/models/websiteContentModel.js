import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Website', // Reference to the Website model
      required: true,
    },
    type: {
      type: String,
      required: true, // Ensure a type is always provided
      trim: true,     // Remove whitespace around the type
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    metadata: {
      author: {
        type: String,
        default: 'Admin',
      },
      tags: {
        type: [String], // Array of tags for the content
        default: [],
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Content  = mongoose.model('Content', contentSchema);
