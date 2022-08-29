import React from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { getCurrentMonthOfWeek } from "../../Utils/CommonFunctions";

const DashboardChart = ({ datasets, displayLegend = true, ...props }) => {

    // let total_week = moment().endOf("month").week() - moment().startOf("month").week() + 1;
    let total_week = getCurrentMonthOfWeek();
    const labels = props?.labels || [...new Array(total_week)].map((_, i) => `Week ${i + 1}`);

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
                        display: displayLegend,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            boxWidth: 15
                        }
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "#0000"
                            },
                        }],
                        yAxes: [{
                            ticks: {
                                callback: (label, index, labels) => label >= 1000 ? `${label/1000}k` : label,
                                // stepSize: 1000,
                                min: 0
                            },
                        }]
                    }
                }}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {};
}


export default connect(mapStateToProps)(DashboardChart);
