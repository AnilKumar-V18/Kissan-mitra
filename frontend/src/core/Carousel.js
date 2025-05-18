import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import "./nav.css";

import Image0 from "../core/images/far2.jpg";
import Image1 from "../core/images/far1.jpg";
import Image2 from "../core/images/far3.jpg";
// import Image3 from "../core/images/c3.jpg";

const CarouselPage = () => {
  return (
    <MDBContainer
    className="carousel_home"
    >
      <MDBCarousel
      activeItem={1}
      length={3}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1" className="carHover">
          <MDBView>
            <img
              className="d-block"
              src={Image0}
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Directly from the Farm</h3>
            <p>Place your order now!</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2" className="carHover">
          <MDBView>
            <img
              className="d-block"
              src={Image1}
              alt="Second slide"
            />
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Hand Plucked Just For You!</h3>
            <p>Only the best for you</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3" className="carHover">
          <MDBView>
            <img
              className="d-block"
              src={Image2}
              alt="Third slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">No Harmful Pesticides Used</h3>
            <p>FOR YOUR HEALTH</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
		 {/* <MDBCarouselItem itemId="4" className="carHover">
          <MDBView>
            <img
              className="d-block"
              src={Image3}
              alt="Fourth slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">KisaanPortal</h3>
            <p>Discover the best veggies</p>
          </MDBCarouselCaption>
        </MDBCarouselItem> */}
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;
