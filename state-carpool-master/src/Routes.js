import { lazy } from "react";

export const LandingPage = lazy(() => import('./Components/LandingPage'));
export const LoginForm = lazy(() => import('./Components/Login'));
export const CreateAccountForm = lazy(() => import('./Components/Signup'));
export const Subscription = lazy(() => import('./Components/Subscription'));
export const RiderHistory = lazy(() => import('./Components/RiderHistory'));
export const RiderDashboard = lazy(() => import('./Components/RiderDashboard'));
export const RiderTripDetail = lazy(() => import('./Components/RiderTripDetail'));
export const Profile = lazy(() => import('./Components/Profile'));
export const AdminServices = lazy(() => import('./Components/AdminServices'));
export const UpcomingRides = lazy(() => import('./Components/UpcomingRides'));
export const CurrentRide = lazy(() => import('./Components/CurrentRide'));
export const UpcomingRideDetails = lazy(() => import('./Components/UpcomingRideDetails'));
