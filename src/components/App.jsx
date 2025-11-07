import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css"; 
import Workloads from "./Workloads";
import work from "../work.js";
import { Route, Switch } from "react-router-dom";

// These are the routerpages
import NLP from "../pages/NLP";
import ComputerVision from "../pages/ComputerVision";



function CreateWorkload(props) {
  return (
    <Workloads className="workloads" workloadname={props.name} path={props.path} />
  );
}

function App() {
  return (
    <div className="app-container">
      
      <Header />
      
      <Navbar />

      <main className="main-content">
        <Switch>
          {/* Home page remains as default */}
          <Route exact path="/">
            <h2>Welcome to Whats-Ai.ai</h2>
            <p>Explore AI Demos</p>
            <div>
              {work.map(CreateWorkload)}
            </div>
          </Route>

          {/* ✅ NLP route */}
          <Route path="/nlp" component={NLP} />
          <Route path="/computer-vision" component={ComputerVision} />

        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
