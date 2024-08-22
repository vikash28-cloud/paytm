import { BrowserRouter, Route, Routes } from "react-router-dom"
import  Dashboard  from "./components/Dashboard.jsx"
import  SignIn  from "./components/SignIn.jsx"
import  SingnUp  from "./components/SignUp.jsx"
import  SendMoney  from "./components/SendMoney.jsx"
import Header from "./components/Header.jsx"
import Appbar from "./components/Appbar.jsx"
import SignUp from "./components/SignUp.jsx"
import LandingPage from "./components/LandingPage.jsx"
function App() {

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signup" element={<SingnUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
