import axios from 'axios';
const API_URL = 'http://localhost:8080/api';

export const postCreatePreference = (object) => {
    return axios.post(`${API_URL}/mp/create_preference`, object)
}

export const postCreateRegistrationPreference = (object) => {
    return axios.post(`${API_URL}/mp/create_registration_preference`, object)
}

export const postLogin = (email, password) => {
  return axios.post(`${API_URL}/login`, {email, password})
}

export const getLoginUser = (email) => {
  return axios.get(`${API_URL}/login/${email}`)
}

export const postRegisterUser = (user) => {
  return axios.post(`${API_URL}/users`, user)
}

export const getEvents = () => {
  return axios.get(`${API_URL}/events`)
}

export const getEventsByUser = (userId) => { 
  return axios.get(`${API_URL}/events/user/${userId}`)
}


export const getEventPrices = (eventId) => {
  return axios.get(`${API_URL}/eventPrice/event/${eventId}`)
}

export const getParametersByEvent = (eventId) => {
  return axios.get(`${API_URL}/events/${eventId}/parameters`)
}

export const postTicket = (ticket) => {
  return axios.post(`${API_URL}/tickets`, ticket)
}

export const postRegistration = (registration) => {
  return axios.post(`${API_URL}/registration`, registration)
}

export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`)
}

export const getEventsTicketsRegistrationsByUserId = (userId) => {
  return axios.get(`${API_URL}/events/user/${userId}/my-events`)
}

export const getRegisteredAthletesByEvent = (eventId) => {
  return axios.get(`${API_URL}/registration/event/${eventId}`)
}

export const postCreateTicket = (ticket) => {
  return axios.post(`${API_URL}/eventPrice`, ticket)
}

export const postCreateEvent = (event) => {
  return axios.post(`${API_URL}/events`, event)
}

export const postCreateTeam = (team) => {
  return axios.post(`${API_URL}/teams`, team)
}

export const postCreateAge = (age) => {
  return axios.post(`${API_URL}/ages`, age)
}

export const postCreateWeight = (weight) => {
  return axios.post(`${API_URL}/weights`, weight)
}

export const postCreateCategory = (category) => {
  return axios.post(`${API_URL}/categories`, category)
}


export const postCreateEventParameters = (eventParameter) => {
  return axios.post(`${API_URL}/eventParameters`, eventParameter)
}

export const getEventParameters = () => {
  return axios.get(`${API_URL}/eventParameters/parameters`)
}