import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  const ticketsData = req.body.tickets || [req.body]; 
  const client_id = req.user._id;

  try {
    const createdTickets = [];

    for (const ticketData of ticketsData) {
      const { title, description } = ticketData;
      const ticket = new Ticket({ title, description, client_id });
      await ticket.save();
      createdTickets.push(ticket);
    }

    res.status(201).json({
      message: "Tickets created successfully!",
      tickets: createdTickets
    });
  } catch (error) {
    res.status(500).json({ error: `Error creating tickets: ${error.message}` });
  }
};


export const getAllTickets = async (req, res) => {
  try {
    let tickets;
    if (req.user.role === "admin") {
      // Admin can access all tickets
      tickets = await Ticket.find().populate("client_id", "username email");
    } else {
      // Clients can only access their own tickets
      tickets = await Ticket.find({ client_id: req.user._id }).populate("client_id", "username email");
    }

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: `Error getting tickets: ${error.message}` });
  }
};

export const getTicketById = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (
      user.role === "client" &&
      ticket.client_id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json({ticket: ticket, user: user});
  } catch (err) {
    res.status(500).json({ error: "Error fetching ticket" });
  }
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { title, description, status } = req.body;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (
      user.role === "client" &&
      ticket.client_id.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (user.role === "client") {
      if (status && status !== ticket.status) {
        return res
          .status(403)
          .json({
            error: "Clients are not allowed to change the ticket status",
          });
      }
      // Client hanya bisa mengubah judul dan deskripsi
      ticket.title = title || ticket.title;
      ticket.description = description || ticket.description;
    } else if (user.role === "admin") {
      // Admin bisa mengubah status tiket
      ticket.status = status || ticket.status;
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: "Error updating ticket" });
  }
};

export const respondToTicket = async (req, res) => {
  const { id } = req.params;
  const { admin_response } = req.body;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.admin_response = admin_response;
    await ticket.save();

    res.json({ message: "Response added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error responding to ticket" });
  }
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
      const ticket = await Ticket.findByIdAndDelete(id);
      if (!ticket) {
          return res.status(404).json({ error: 'Ticket not found' });
      }

      res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Error deleting ticket', details: err.message });
  }
};

