import { Outlet } from "react-router-dom";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import ScrollToTop from "./components/ScrollToTop";
import './App.css'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {/* <Header /> */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
