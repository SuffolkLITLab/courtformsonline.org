import Link from "next/link";
import React from "react";
import Button from 'react-bootstrap/Button';

const HeroSection = () => {
  return (
    <section className="hero-section mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6" id="hero-left">
            <h1>Find and file DIY legal forms in Massachusetts</h1>
            <p>
              Court Forms Online provides official Massachusetts court forms that can be 
              completed step-by-step on a smart phone or desktop. We provide you 
              with a streamlined experience to ensure you have all you need to 
              get through the legal process.
            </p>
          </div>
          <div className="col-lg-6" id="hero-right">
            <h2>Describe your legal problem</h2>
            <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Describe your legal problem here"
              aria-label="Describe your legal problem here"
            />
            <div className="d-flex align-items-center justify-content-end mt-3">
            <Link href="/help" className="btn btn-primary">
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
