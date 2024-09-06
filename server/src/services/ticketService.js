import   Ticket  from '../models/ticket.js';
import  ApiError from '../utils/ApiError.js';

class TicketService {
  async createTicket(ticketData) {
    return Ticket.create(ticketData);
  }

  async getTicketById(ticketId) {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      throw new ApiError(404, 'Ticket not found');
    }
    return ticket;
  }
  
  async getTicketsByUserId(userId) {
    return Ticket.findAll({
      where: {
        user_id: userId,
      },
    });
  }

  async getAllTickets() {
    return Ticket.findAll();
  }

  async updateTicket(ticketId, ticketData) {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      throw new ApiError(404, 'Ticket not found');
    }
    await ticket.update(ticketData);
    return ticket;
  }

  async updateTicketsByOrderId(orderId, ticketData) {
    const tickets = await Ticket.findAll({
      where: {
        order_id: orderId,
      },
    });
  
    if (tickets.length === 0) {
      throw new ApiError(404, 'Tickets not found');
    }
  
    const updatedTickets = await Promise.all(
      tickets.map(ticket => ticket.update(ticketData))
    );
  
    return updatedTickets;
  }

  async deleteTicket(ticketId) {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      throw new ApiError(404, 'Ticket not found');
    }
    await ticket.destroy();
    return ticket;
  }
}

export default new TicketService();
