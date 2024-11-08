import React from "react";
import STYLES from "./Base.module.scss";
import * as PropTypes from "prop-types";

const Base = ({children}) => {
    return (
        <div className={STYLES.body} id={"main-container"}>
            <main role={"main"}>{children}</main>
        </div>
    );
};

Base.propTypes = {
    children: PropTypes.object
};


export default Base;
