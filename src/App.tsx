import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/search";
import { Col, Container, Row } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Search</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Search></Search>
          </Col>
        </Row>
      </Container>
      </header>
      <Toaster />
    </div>
  );
}

export default App;
