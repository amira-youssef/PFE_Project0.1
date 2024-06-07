import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import AdminDash from "./pages/AdminDash";
import ManagerDash from "./pages/ManagerDash";
import Registration from "./pages/Registration";
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import RentPage from "./pages/RentPage";
import { render } from "react-dom";
import CarsPage from "./pages/CarsPage";
import Layout from "./components/layout/layout";
import CarDisplay from "./pages/CarDisplay";
import AgenciesList from "./pages/AgenciesList";
import AgencyForm from "./pages/AgencyForm";


const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        <Route path="/rent" element={<RentPage/>} />
        <Route path="/cars" element={<CarsPage/>} />
        <Route path="/cars/:id" element={<CarDisplay/>} />
        <Route path="/agencies" element={<AgenciesList/>} />
        <Route path="/create" element={< AgencyForm/>} />



        </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/manager" element={<ManagerDash />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);

const root = document.getElementById('root');
render(<App />, root); // Render the App component using createRoot

export default App;
