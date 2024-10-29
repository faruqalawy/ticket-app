import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    admin_response: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  })

  ticketSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
  });

  export default mongoose.model("Ticket", ticketSchema);