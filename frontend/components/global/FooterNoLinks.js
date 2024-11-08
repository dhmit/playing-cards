import React from "react";

const FooterNoLinks = () => {
    return (
        <span id={"Logos"}>
            <div className="logo-container">
                <img className="logo" src={"/static/img/footer/bnf_logo.jpg"}/>
            </div>
            <div className="logo-container">
                <img className="logo" src={"/static/img/footer/MIT-modern-logo.jpg"}/>
            </div>
            <div className="logo-container">
                <img className="logo" src={"/static/img/footer/dh_logo.png"}/>
            </div>
            <div className="logo-container">
                <img className="logo" src={"/static/img/footer/performant-logo.png"}/>
            </div>            
        </span>
    );
};

export default FooterNoLinks;