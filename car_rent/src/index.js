import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

import CNavbar from "./components/CNavbar";
import Footer from "./components/Footer";

// index page sections
import Hero from "./IndexSections/Hero";
import Buttons from "./IndexSections/Buttons";
import Inputs from "./IndexSections/Inputs";
import CustomControls from "./IndexSections/CustomControls";
import Menus from "./IndexSections/Menus";
import Navbars from "./IndexSections/Navbars";
import Tabs from "./IndexSections/Tabs";
import Progress from "./IndexSections/Progress";
import Pagination from "./IndexSections/Pagination";
import Pills from "./IndexSections/Pills";
import Labels from "./IndexSections/Labels";
import Alerts from "./IndexSections/Alerts";
import Typography from "./IndexSections/Typography";
import Modals from "./IndexSections/Modals";
import Datepicker from "./IndexSections/Datepicker";
import TooltipPopover from "./IndexSections/TooltipPopover";
import Carousel from "./IndexSections/Carousel";
import Icons from "./IndexSections/Icons";
import Login from "./IndexSections/Login";
import Download from "./IndexSections/Download";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <CNavbar />
        <main ref="main">
          <Hero />
          <Buttons />
          <Inputs />
          <section className="section">
            <Container>
              <CustomControls />
              <Menus />
            </Container>
          </section>
          <Navbars />
          <section className="section section-components">
            <Container>
              <Tabs />
              <Row className="row-grid justify-content-between align-items-center mt-lg">
                <Progress />
                <Pagination />
              </Row>
              <Row className="row-grid justify-content-between">
                <Pills />
                <Labels />
              </Row>
              <Alerts />
              <Typography />
              <Modals />
              <Datepicker />
              <TooltipPopover />
            </Container>
          </section>
          <Carousel />
          <Icons />
          <Login />
          <Download />
        </main>
        <Footer />
      </>
    );
  }
}

export default Index;
