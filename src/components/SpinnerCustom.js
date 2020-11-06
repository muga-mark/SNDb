import React from 'react';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
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

function SpinnerCustom({ loading }) {
    return (
        <div className="spinner">
            <PulseLoader
                css={override}
                size={50}
                color={"#D1312D"}
                loading={loading}
            />
        </div>
    )
}

export default SpinnerCustom
