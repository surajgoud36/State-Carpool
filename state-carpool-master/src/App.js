import "./App.css";
import { Suspense } from 'react';
import Router from "./Components/Router";

export default function App() {
  return( 
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router/>
      </Suspense>
    </>
  )
}
