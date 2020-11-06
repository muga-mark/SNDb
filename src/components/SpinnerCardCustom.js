import React from 'react';
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
import './SpinnerCustom.css';

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;    
`;

function SpinnerCardCustom({ loading }) {
    return (
        <div className="spinner">
            <DotLoader
                css={override}
                size={30}
                color={"#D1312D"}
                loading={loading}
            />
        </div>
    )
}

export default SpinnerCardCustom
