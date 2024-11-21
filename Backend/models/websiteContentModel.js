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
    contentImage:{
      public_id:String,
      secure_url:String
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
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Content  = mongoose.model('Content', contentSchema);
