import Link from "next/link";
import React from "react";
import heroImage from "../../../public/hero.jpg" // style={{ backgroundImage: `url(${heroImage.src})` }}
import Button from 'react-bootstrap/Button';

const HeroSection = () => {
  return (
    <section id="hero-section">
      <div className="container"> 
        <div className="row gx-5">
          
          <div className="col-lg-6" id="hero-left" >
            <h1>Free DIY legal help for Massachusetts</h1>
            <p>
              Use our free step-by-step interactive forms to get help with your
              legal problem. Use your own words to find the right 
              form or browse forms by category.
            </p>
          </div>
          <div className="col-lg-6" id="hero-right">
            <h2>Describe your legal problem</h2>
            <textarea  
              className="form-control form-control-lg" 
              placeholder="Describe your legal problem here"
              aria-label="Describe your legal problem here"
            />
            <div className="d-flex align-items-center justify-content-end mt-3">
            <Link href="/help" className="btn" style={{backgroundColor: "#15284b", color: "#fff", fontWeight: "bold"}}>
              Find Help
            </Link>            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
