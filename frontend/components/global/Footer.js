import React from "react";

const Footer = () => {
    return (
        <span id={"Logos"}>
            <a className={"logo-container"} href={"https://www.bnf.fr/fr"}>
                <img className={"logo"} src={"/static/img/footer/bnf_logo.jpg"}/>
            </a>
            <a className={"logo-container"} href={"https://web.mit.edu/"}>
                <img className={"logo"} src={"/static/img/footer/MIT-modern-logo.jpg"}/>
            </a>
            <a className={"logo-container"} href={"https://digitalhumanities.mit.edu/"}>
                <img className={"logo"} src={"/static/img/footer/dh_logo.png"}/>
            </a>
            <a className={"logo-container"} href={"https://www.performantsoftware.com/"}>
                <img className={"logo"} style={{height: "100px"}} src={"/static/img/footer/performant-logo.png"}/>
            </a>
        </span>
    );
};

export default Footer;
