import React from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';
import SpinnerContentCustom from "./SpinnerContentCustom";
import CarouselCustom from "./CarouselCustom";

import Hidden from '@material-ui/core/Hidden';
import './Row.css';

function Row({ type, chartLink, chartResult, page, title, loading,  }) {
    return (
        <>
            <div className="row__title">
                <Link to={`/${type}/${chartLink}/${page}`} className="row__link">
                    <span>{title}</span>
                </Link>
            </div>
            <Hidden xsDown>
                <div className="row__container">
                    {loading?
                        <SpinnerContentCustom 
                            loading={loading} 
                            size={20} 
                            color={"#D1312D"} 
                        />
                    :
                        <CarouselCustom 
                            desktop={5}
                            small_desktop={4}
                            tablet={3}
                            small_tablet={2}
                            mobile={2}
                            content={chartResult.length>0 && chartResult.map((result)=> (
                                            <div key={result.id}>
                                                <Card key={result.id} {...result} type={type} />
                                            </div>
                                        ))}
                        />
                    }
                </div>
            </Hidden>  
            <Hidden smUp>
                <div className="row__container row__container_scroll">
                    {loading?
                        <SpinnerContentCustom 
                            loading={loading} 
                            size={20} 
                            color={"#D1312D"} 
                        />
                    :
                        <>
                        {chartResult.length>0 && chartResult.map((result)=> (
                            <div key={result.id} className="content__card">
                                <Card key={result.id} {...result} type={type} />
                            </div>
                        ))}
                        </>
                    }
                </div>
            </Hidden> 
        </>
    )
}

export default Row
