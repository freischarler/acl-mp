import {  Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResponsiveAppBar } from "../components/ResponsiveAppBar"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Tickets } from "../pages/TicketBuy";
import { MyTickets } from "../pages/MyTickets";
import { Profile } from "../pages/Profile";
import { TicketPurchased } from "../pages/TicketPurchased";
import { TicketFailed } from "../pages/TicketFailed";
import { TicketPending } from "../pages/TicketPending";
import { Events } from "../pages/Events";
import { Event } from "../pages/Event";
import { Participate } from "../pages/Participate";
import { MyEvents } from "../pages/MyEvents";
import { RegisteredAthletes } from "../pages/RegisteredAthletes";

import '../styles/Root.css';

function Root() {
  const [loggedIn, setLoggedIn] = useState(false)
  //const [idx, setIdx] = useState(0)

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = localStorage.getItem('user')
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      //setIdx(0)
      return
    }
    else {
      setLoggedIn(true)
      //setIdx(1)
    }
  }, [])

  //const admin = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).admin : false
  //create const admin that check if idx is 1
  //const admin = idx === 1 ? true : false*/

  return (
    <div>
        <ResponsiveAppBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login" element={<Login setLoggedIn={setLoggedIn} isLoggedIn={loggedIn} />} />
          <Route exact path="signup" element={<SignUp />} />
          <Route exact path="buy-ticket" element={<Tickets />} />

          <Route exact path="events" element={<Events />} />
          <Route exact path="events/:id" element={<Event />} />

          <Route exact path="my-events" element={<MyEvents />} />
          <Route exact path="my-tickets/:id" element={<MyTickets />} />
          <Route exact path="participate" element={<Participate />} />

          <Route exact path="registered-athletes" element={<RegisteredAthletes />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="ticket-purchased" element={<TicketPurchased />} />
          <Route exact path="ticket-failed" element={<TicketFailed />} />
          <Route exact path="ticket-pending" element={<TicketPending />} />
         
        </Routes>
        </div>
    </div>
  );
}

export default Root;