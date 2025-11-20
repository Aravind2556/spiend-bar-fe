import React, { useState, useEffect } from 'react'
import LiveChart from '../blocks/LiveChart'
import SensorBG from '../../assets/spine.jpg'
import ThoracicIm from '../../assets/Thoracic.avif'
import SacralIm from '../../assets/Thoracic.avif'
import LumberIm from '../../assets/lumbar.png'
import CervicalIm from '../../assets/Cervical.png'
import LeftShoulderIm from '../../assets/Leftshoulder.png'
import RigthShoulderIm from '../../assets/right shoulder.jpg'
import HipIm from '../../assets/hip-pain-new.jpg'
import { 
  RangeValue, 
  URL ,
  carvideRangeMin,
  carvideRangeMax,

  thoracicRangeMin,
  thoracicRangeMax,

  lumberRangeMin,
  lumberRangeMax,

  sacralRangeMin,
  sacralRangeMax,

  leftCarvideRangeMin,
  leftCarvideRangeMax,

  rightCarvideRangeMin,
  rightCarvideRangeMax,

  leftIliumRangeMin,
  leftIliumRangeMax,

  rightIliumRangeMin,
  rightIliumRangeMax
} from '../utils/Range'
import CustomApexChart from '../blocks/CustomApexChart'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Home() {

  const [cervical, setCervical] = useState(null)
  const [thoracic, setThoracic] = useState(null)
  const [lumber, setLumber] = useState(null)
  const [sacral,setSacral]=useState(null)
  const [leftShoulder,setLeftShoulder]=useState(null)
  const [rightShoulder, setRightShoulder] = useState(null)
  const [leftHip, setLeftHip] = useState(null)
  const [rightHip,setRightHip]=useState(null)

  const [createdAt, setCreateAt]=useState(null)

  const [showListing, setShowListing] = useState(false)

  const [recentCervicalValue, setRecentCervicalValue] = useState(null)
  const [recentThoracicValue, setRecentThoracicValue] = useState(null)
  const [recentLumberValue, setRecentLumberValue] = useState(null)
  const [recentSacralValue,setRecentSacralValue]=useState(null)
  const [recentLeftShoulderValue, setRecentLeftShoulderValue] = useState(null)
  const [recentRightShoulderValue, setRecentRightShoulderValue] = useState(null)
  const [recentLeftHipValue, setRecentLeftHipValue] = useState(null)
  const [recentRightHipValue, setRecentRightHipValue] = useState(null)

  const controls = {
    show: true,
    download: true,
    selection: false,
    zoom: false,
    zoomin: true,
    zoomout: true,
    pan: true,
    reset: true,
    zoomEnabled: true,
    autoSelected: 'zoom'
  };

  console.log("create at" , createdAt)

  useEffect(() => {
    const fetchData = async () => {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          
          if (data && data.feeds && data.feeds.length > 0) {
            const xAxis = data.feeds.map(feed => new Date(feed.created_at).getTime())
            setCreateAt(data.feeds[data.feeds.length - 1])



            setCervical({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field1) || 0),
              seriesName: 'Cervical'
            })

            setThoracic({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field2) || 0),
              seriesName: 'Thoracic'
            })

            setLumber({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field3) || 0),
              seriesName: 'Lumber'
            })

            setSacral({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field4) || 0),
              seriesName: 'Sacrum'
            })

            setLeftShoulder({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field5) || 0),
              seriesName: 'Left Clavicle'
            })

            setRightShoulder({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field6) || 0),
              seriesName: 'Right Clavicle'
            })

            setLeftHip({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field7) || 0),
              seriesName: 'Left Ilium'
            })

            setRightHip({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field8) || 0),
              seriesName: 'Right Ilium'
            })

            const lastFeed = data.feeds[data.feeds.length - 1];
            setRecentCervicalValue(lastFeed.field1);
            setRecentThoracicValue(lastFeed.field2);
            setRecentLumberValue(lastFeed.field3);
            setRecentSacralValue(lastFeed.field4);
            setRecentLeftShoulderValue(lastFeed.field5);
            setRecentRightShoulderValue(lastFeed.field6);
            setRecentLeftHipValue(lastFeed.field7);
            setRecentRightHipValue(lastFeed.field8);

          }
        })
        .catch(err => console.log("Fetch error:", err))
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);



  /** Extract values for Table **/
  const cervicalY = cervical?.["y-axis"] || []
  const thoracicY = thoracic?.["y-axis"] || []
  const lumberY = lumber?.["y-axis"] || []
  const sacrumY = sacral?.["y-axis"] || []
  const leftClavicleY = leftShoulder?.["y-axis"] || []
  const rightClavicleY = rightShoulder?.["y-axis"] || []
  const leftilium = leftHip?.["y-axis"] || []
  const rightilium = rightHip?.["y-axis"] || []
  const timestamps = cervical?.["x-axis"] || []



  /** Excel Download **/
  const downloadExcel = () => {
    const excelData = cervicalY.map((value, index) => ({
      "Sl.No": index + 1,
      "Cervical": cervicalY[index] ?? "-",
      "Thoracic": thoracicY[index] ?? "-",
      "Lumber": lumberY[index] ?? "-",
      "Sacrum": sacrumY[index] ?? "-",
      "Left Clavicle": leftClavicleY[index] ?? "-",
      "Right Clavicle": rightClavicleY[index] ?? "-",
      "Left Ilium": leftilium[index] ?? "-",
      "Right Ilium": rightilium[index] ?? "-",
      "Date & Time": new Date(timestamps[index]).toLocaleString() || "-"
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = { Sheets: { Data: worksheet }, SheetNames: ["Data"] };
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Spine-Report.xlsx");
  };


  if (!cervical) return <div>Loading...</div>


  return (
    <div className="mx-auto space-y-10 md:px-10 px-2 mb-10">


      <div className="flex justify-end">
        <button
          onClick={() => setShowListing(true)}
          className='bg-primary-600 px-10 py-2 font-semibold text-white rounded-xl'
        >
          View Data
        </button>
      </div>


          <div className="md:flex md:justify-evenly gap-6 mt-6 space-y-3">
          {/* Current Value Card */}
           <div className="border rounded-2xl shadow-md bg-white w-full p-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 w-full">
              Current Values
            </h2>

            <div>
              <div className="flex items-center gap-6">
                {/* {Warning} */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <p className="text-sm text-gray-700 font-medium">Warning</p>
                </div>

                {/* Normal */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                  <p className="text-sm text-gray-700 font-medium">Normal</p>
                </div>
              </div>

              <div className='border px-2 py-1 rounded-xl'>
                Date and Time : {new Date(createdAt?.["created_at"]).toLocaleString() || "-"}
              </div>

            </div>
          </div>

             <div className="space-y-4 flex flex-wrap">
                <CardRow
                    label="Cervical Value"
                    value={recentCervicalValue}
                    bgImage={CervicalIm}
                    className={
                      Number(recentCervicalValue) >= Number(carvideRangeMin) || Number(recentCervicalValue) >= Number(carvideRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />
                  <CardRow
                    label="Thoracic Value"
                    value={recentThoracicValue}
                    bgImage={ThoracicIm}
                    className={
                      Number(recentThoracicValue) >= Number(thoracicRangeMin) || Number(recentThoracicValue) >= Number(thoracicRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />

                  <CardRow
                    label="Lumber Value"
                    value={recentLumberValue}
                    bgImage={LumberIm}
                    className={
                      Number(recentLumberValue) >= Number(lumberRangeMin) || Number(recentLumberValue) >= Number(lumberRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />

                  <CardRow
                    label="Sacrum Value"
                    value={recentSacralValue}
                    bgImage={SacralIm}
                    className={
                      Number(recentSacralValue) >= Number(sacralRangeMin) || Number(recentSacralValue) >= Number(sacralRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />

                  <CardRow
                    label="Left Clavicle Value"
                    value={recentLeftShoulderValue}
                    bgImage={LeftShoulderIm}
                    className={
                      Number(recentLeftShoulderValue) >= Number(leftCarvideRangeMin) || Number(recentLeftShoulderValue) >= Number(leftCarvideRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />

                  <CardRow
                    label="Right Clavicle Value"
                    value={recentRightShoulderValue}
                    bgImage={RigthShoulderIm}
                    className={
                      Number(recentRightShoulderValue) >= Number(rightCarvideRangeMin) || Number(recentRightShoulderValue) >= Number(rightCarvideRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />

                  <CardRow
                    label="Left llium Value"
                    value={recentLeftHipValue}
                    bgImage={HipIm}
                    className={
                      Number(recentLeftHipValue) >= Number(leftIliumRangeMin) || Number(recentLeftHipValue) >= Number(leftIliumRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />

                  <CardRow
                    label="Right llium Value"
                    value={recentRightHipValue}
                    bgImage={HipIm}
                    className={
                      Number(recentRightHipValue) >= Number(rightIliumRangeMin) || Number(recentRightHipValue) >= Number(rightIliumRangeMax)
                        ? "bg-red-500"
                        : "bg-primary-500"
                    }
                  />
                </div>
              </div>
            </div>


            {/* Charts Section */}
            <div className="flex flex-wrap justify-center md:justify-between gap-4">
              {[
                cervical, thoracic, lumber, sacral,
                leftShoulder, rightShoulder, leftHip, rightHip
              ]
                .filter(item => item && (Array.isArray(item['x-axis']) || Array.isArray(item['y-axis']) || Array.isArray(item.data)))
                .map((chartData, i) => (
                  <div key={i} className="w-full md:w-[48%] bg-white rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 shadow shadow-primary-300">
                    <h3 className="text-center font-semibold text-primary-600 mb-3 text-lg">
                      {chartData.seriesName}
                    </h3>

                    <CustomApexChart
                      data={[chartData]}
                      title={chartData.seriesName} 
                      lineStyle="straight"
                      lineWidth={1}
                      chartType="line"
                      controls={controls}
                      markers={{
                        threshold: {
                          carvideRangeMin,
                          carvideRangeMax,
                          thoracicRangeMin,
                          thoracicRangeMax,
                          lumberRangeMin,
                          lumberRangeMax,
                          sacralRangeMin,
                          sacralRangeMax,
                          leftCarvideRangeMin,
                          leftCarvideRangeMax,
                          rightCarvideRangeMin,
                          rightCarvideRangeMax,
                          leftIliumRangeMin,
                          leftIliumRangeMax,
                          rightIliumRangeMin,
                          rightIliumRangeMax
                        },
                        size: 4,
                        fillColor: "red",
                        strokeColor: "red"
                      }}

                      /** ADD THIS PART **/
                      xaxisTitle="Time"
                      yaxisTitle="Pressure (mmHg)"
                    />
                  </div>
                ))}
            </div>



      {/* ------- POPUP ------- */}
      {showListing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] md:w-[80%] relative">

            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setShowListing(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">SPINAL BAR LIST</h2>

            {/* Download Button */}
            <div className=' flex justify-end'>
              <button
                onClick={downloadExcel}
                className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                Download Excel
              </button>
            </div>


            <div className="overflow-auto max-h-[70vh]">
              <table className="w-full border">
                <thead className=' sticky top-0 z-10'>
                  <tr className='bg-primary-100'>
                    <th className='border text-center'>Sl.no</th>
                    <th className='border text-center'>Cervical</th>
                    <th className='border text-center'>Thoracic</th>
                    <th className='border text-center'>Lumber</th>
                    <th className='border text-center'>Sacrum</th>
                    <th className='border text-center'>Left Clavicle</th>
                    <th className='border text-center'>Right Clavicle</th>
                    <th className='border text-center'>Left Ilium</th>
                    <th className='border text-center'>Right Ilium</th>
                    <th className='border text-center'>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {cervicalY.map((value, index) => (
                    <tr key={index}>
                      <td className='border text-center'>{index + 1}</td>
                      <td className={`border text-center ${cervicalY[index] >= Number(carvideRangeMin) ||
                        cervicalY[index] >= Number(carvideRangeMax)
                        ? "bg-red-500"
                        : ""
                        }`}>{cervicalY[index] ?? "-"}</td>
                      <td className={`border text-center ${thoracicY[index] >= Number(thoracicRangeMin) ||
                        thoracicY[index] >= Number(thoracicRangeMin)
                        ? "bg-red-500"
                        : ""
                        }`}>{thoracicY[index] ?? "-"}</td>
                      <td
                        className={`border text-center ${lumberY[index] >= Number(lumberRangeMin) ||
                            lumberY[index] >= Number(lumberRangeMax)
                            ? "bg-red-500"
                            : ""
                          }`}
                      >
                        {lumberY[index] ?? "-"}
                      </td>
                      <td className={`border text-center ${sacrumY[index] >= Number(sacralRangeMin) ||
                        sacrumY[index] >= Number(sacralRangeMax)
                        ? "bg-red-500"
                        : ""
                        }`}>{sacrumY[index] ?? "-"}</td>
                      <td className={`border text-center ${leftClavicleY[index] >= Number(leftCarvideRangeMin) ||
                        leftClavicleY[index] >= Number(leftCarvideRangeMin)
                        ? "bg-red-500"
                        : ""
                        }`}>{leftClavicleY[index] ?? "-"}</td>
                      <td className={`border text-center ${rightClavicleY[index] >= Number(rightCarvideRangeMin) ||
                        rightClavicleY[index] >= Number(rightCarvideRangeMin)
                        ? "bg-red-500"
                        : ""
                        }`}>{rightClavicleY[index] ?? "-"}</td>
                      <td className={`border text-center ${leftilium[index] >= Number(leftIliumRangeMin) ||
                        leftilium[index] >= Number(leftIliumRangeMin)
                        ? "bg-red-500"
                        : ""
                        }`}>{leftilium[index] ?? "-"}</td>
                      <td className={`border text-center ${rightilium[index] >= Number(rightIliumRangeMin) ||
                        rightilium[index] >= Number(rightIliumRangeMin)
                        ? "bg-red-500"
                        : ""
                        }`}>{rightilium[index] ?? "-"}</td>
                      <td className='border text-center'>{new Date(timestamps[index]).toLocaleString() || "-"}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Home


const CardRow = ({ label, value, bgImage, className }) => (
  <div className={`shadow-lg rounded-2xl p-4 w-full max-w-sm mx-auto relative border`}>

    {/* 🖼 Product / Sensor Image */}
    <img
      src={bgImage}
      alt={label}
      className="h-32 mx-auto mt-6 mb-2 drop-shadow-md rounded-xl"
    />

    {/* Title */}
    <h3 className="text-lg font-semibold text-center mt-2">
      {label}
    </h3>

    {/* Category / Value */}
    <p className={` ${className} text-white font-semibold text-sm text-center py-1 rounded-lg`}>
      Value: {value}
    </p>

  </div>
);
