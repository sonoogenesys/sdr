import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

const WalletChart = ({ chartData }) => {

    const [state, setState] = useState({
        labels: [...new Array(12)].map((_, i) => moment.months()[i].substring(0, 3)),
        datasets: [],
    });

    const preload = () => {
        let credit = [];
        let debit = [];

        [...new Array(12)].forEach((_, i) => {
            credit = [...credit, parseFloat(chartData?.credit[i]?.total_amount).toFixed(2) || 0];
            debit = [...debit, parseFloat(chartData?.debit[i]?.total_amount).toFixed(2) || 0];
        });

        let datasets = [
            {
                label: "Credit",
                backgroundColor: "#2b3eb1",
                data: credit,
            },
            {
                label: "Debit",
                backgroundColor: "#fc7100",
                data: debit,
            },
        ];

        setState({
            ...state,
            datasets: datasets,
        });
    }

    useEffect(() => {
        preload();
    }, [chartData]);

    const { labels, datasets } = state;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Bar
                data={{
                    labels: labels,
                    datasets: datasets,
                }}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true
                        }
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "#0000"
                            },
                        }],
                        yAxes: [{
                            // gridLines: {
                            //     color: "#0000"
                            // },
                            ticks: {
                                callback: (label, index, labels) => label >= 1000 ? `₹ ${label/1000}k` : `₹ ${label}`,
                                // stepSize: 1000,
                                min: 0,
                            },
                        }]
                    }
                }}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    let { userId } = ownProps;
    let loggedInUser = state.loggedInUser?.data?.data;

    let chart;
    if (userId && loggedInUser?._id !== userId) {
        let dashboard = state.wallet?.wallets[userId];
        chart = dashboard?.chart;
    } else {
        chart = state.wallet?.chart;
    }

    return {
        chartData: chart,
    };
}


export default connect(mapStateToProps)(WalletChart);
