import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./scss/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Base from "./components/global/Base";
import Nav from "./components/global/Nav";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Manufacture from "./components/pages/Manufacture";
import Material from "./components/pages/Material";
import Fronts from "./components/pages/Fronts";
import Backs from "./components/pages/Backs";
import Envelopes from "./components/pages/Envelopes";
import Iconography from "./components/pages/Iconography";
import Search from "./components/pages/DatabaseSearch";
import Games from "./components/pages/Games";
import Bibliography from "./components/pages/Bibliography";
import CardSearch from "./components/CardSearch";

ReactDOM.render(
    <div>
        <Base>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/manufacture" element={<Manufacture />} />
                    <Route exact path="/material-aspects" element={<Material />} />
                    <Route exact path="/material-aspects/fronts" element={<Fronts />} />
                    <Route exact path="/material-aspects/backs" element={<Backs />} />
                    <Route exact path="/material-aspects/envelopes" element={<Envelopes />} />
                    <Route exact path="/iconography" element={<Iconography />} />
                    <Route exact path="/iconography/search" element={<Search />} />
                    <Route exact path="/games" element={<Games />} />
                    <Route exact path="/bibliography" element={<Bibliography />} />
                </Routes>
            </BrowserRouter>
        </Base>
    </div>,
    document.getElementById("app_root")
);


