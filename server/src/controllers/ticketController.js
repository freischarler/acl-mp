import ticketService from '../services/ticketService.js';
import { v4 as uuidv4 } from 'uuid';

class TicketController {
  async createTicket(req, res, next) {
    try {
      console.log(req.body)
      //get count of the tickets of the body
      const count = req.body.count;
      //create a ticket for each count
      const tickets = [];
      for (let i = 0; i < count; i++) {
        // add uuid to the ticket in ticket_id
        req.body.ticket_id = uuidv4();
        const ticket = await ticketService.createTicket(req.body);
        tickets.push(ticket);
      }
      //const ticket = await ticketService.createTicket(req.body);
      res.status(201).json(tickets);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async getTicketById(req, res, next) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async getAllTickets(req, res, next) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async getTicketsByUserId(req, res, next) {
    try {
      console.log(req.params.id)
      const tickets = await ticketService.getTicketsByUserId(req.params.userId);
      res.status(200).json(tickets);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async updateTicket(req, res, next) {
    try {
      const ticket = await ticketService.updateTicket(req.params.id, req.body);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async deleteTicket(req, res, next) {
    try {
      await ticketService.deleteTicket(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController();
