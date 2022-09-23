import React, { useState } from 'react'
import { connect } from 'react-redux';

const CounterContainer = ({
    containerClassName = "dashboard_one common_grid_css bg-white p-3 br-5 mb-3",
    name = "Total Count",
    counter,
}) => {



    return (
        <div className="col-md-3 pr-0">
            <div className={`${containerClassName}`}>
                <div className="d-flex justify-content-between">
                    <p className="font-size-14">{name}</p>
                </div>

                <h4 className="text-primary font-size-24">
                    {
                        counter
                    }
                </h4>
            </div>
        </div>
    )
}
export default CounterContainer;