import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { getRangeForTitle } from '../utils/Vlidator';

const CustomApexChart = ({
    data,
    title,
    lineStyle = 'straight',
    lineWidth = 2,
    chartType = 'line',
    controls,
    markers = {},
    xaxisTitle = "Time",
    yaxisTitle = "Pressure (mmHg)"
}) => {

    const safeData = Array.isArray(data) ? data : [];


    const { min, max } = getRangeForTitle(title, markers.threshold);



    const markerSize = markers.size;
    const markerFill = markers.fillColor;
    const markerStroke = markers.strokeColor;

    const discreteMarkers = [];

    const series = safeData.map((serie, seriesIndex) => {
        let rawX = serie["x-axis"];
        let rawY = serie["y-axis"];

        let builtData = [];

        if (Array.isArray(rawX) && Array.isArray(rawY)) {
            const lastX = rawX.slice(-100);
            const lastY = rawY.slice(-100);
            builtData = lastX.map((x, i) => ({ x, y: lastY[i] }));
        } else if (Array.isArray(serie.data)) {
            builtData = serie.data.slice(-100);
        }

        const seriesData = builtData
            .filter(pt => pt && pt.x !== undefined && pt.y !== undefined)
            .sort((a, b) => new Date(a.x) - new Date(b.x));

        seriesData.forEach((pt, dataPointIndex) => {
            const value = Number(pt.y);

            if (value >= Number(min) || value >= Number(max)) {
                discreteMarkers.push({
                    seriesIndex,
                    dataPointIndex,
                    fillColor: markerFill,
                    strokeColor: markerStroke,
                    size: markerSize
                });
            }
        });

        return {
            name: serie.seriesName ?? `Series ${seriesIndex + 1}`,
            data: seriesData,
            ...(serie.color && { color: serie.color })
        };
    });

    const firstSeries = series.find(s => s.data.length > 0);
    const xMin = firstSeries?.data[0]?.x;
    const xMax = firstSeries?.data[firstSeries.data.length - 1]?.x;

    const options = {
        chart: {
            height: 350,
            type: chartType,
            selection: { enabled: false },
            zoom: {
                enabled: controls?.zoomEnabled ?? true,
                type: controls?.zoomType || "x",
                autoScaleYaxis: controls?.autoScaleYaxis ?? true
            },
            toolbar: {
                show: controls?.show ?? true,
                tools: {
                    download: controls?.download ?? true,
                    selection: controls?.selection ?? false,
                    zoom: controls?.zoom ?? true,
                    zoomin: controls?.zoomin ?? true,
                    zoomout: controls?.zoomout ?? true,
                    pan: controls?.pan ?? true,
                    reset: controls?.reset ?? true
                }
            }
        },

        stroke: { curve: lineStyle, width: lineWidth },

        title: { text: title, align: "left" },

        grid: {
            row: {
                colors:
                    title === "Heart rate"
                        ? ["transparent", "transparent"]
                        : ["#f3f3f3", "#fff"],
                opacity: 0.5
            }
        },

        // ⭐ X AXIS
        xaxis: {
            type: "datetime",
            title: { text: xaxisTitle },   // ⭐ ADDED
            tickAmount: 20,
            labels: {
                formatter: (value) => new Date(value).toLocaleString(),
                rotate: -45
            },
            ...(xMin ? { min: xMin } : {}),
            ...(xMax ? { max: xMax } : {})
        },

        // ⭐ Y AXIS
        yaxis: {
            title: { text: yaxisTitle }   // ⭐ ADDED
        },

        markers: {
            size: markerSize,
            discrete: discreteMarkers
        },

        dataLabels: { enabled: false }
    };

    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type={chartType}
                height={350}
                width="100%"
            />
        </div>
    );
};

export default CustomApexChart;
