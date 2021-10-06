import { Type } from "../../components/App/Text";
import React from 'react';
import { RowCenter } from "../../components/App/Row";

const Errors = ({ text }) => {
    return (<RowCenter alignItems="center" height="40vh" >
        <Type.XXL color="#fff" >
            {text || `oooops 404 Not Found 🤷‍♂️ `}
        </Type.XXL>
    </RowCenter>);
}

export default Errors;