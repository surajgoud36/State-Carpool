import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { LandingPage, LoginForm, CreateAccountForm,
    Subscription, RiderHistory, RiderDashboard, RiderTripDetail, Profile, AdminServices,
     UpcomingRides, CurrentRide, UpcomingRideDetails
 } from "../Routes";

export default function Router() {

  const router = createBrowserRouter([
    { path: "/", element: <LandingPage/>},
    { path: "/login", element: <LoginForm/>},
    { path: "/signup", element: <CreateAccountForm/>},
    { path: "/profile", element: <Profile/>},

    { path: "/subscription", element: <Subscription/>},
    { path: "/riderhome", element: <RiderDashboard/>},
    { path: "/riderhistory", element: <RiderHistory/>}, 
    { path: "/riderbookingdetails", element: <RiderTripDetail/>},
    
    { path: "/currentRide", element: <CurrentRide/>},
    { path: "/upcomingRides", element: <UpcomingRides/>},
    { path: "/upcomingRideDetails", element: <UpcomingRideDetails/>},

    { path: "/adminhome", element: <AdminServices/>}
  ])

  return (
      <RouterProvider router={router} fallbackElement={<React.Suspense fallback={<div>Loading...</div>}/>}/>
  )
}
