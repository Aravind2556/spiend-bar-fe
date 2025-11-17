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


function Home() {

  const [cervical, setCervical] = useState(null) // field 1
  const [thoracic, setThoracic] = useState(null) // field 2
  const [lumber, setLumber] = useState(null) // field 3
  const [sacral,setSacral]=useState(null) //field 4
  const [leftShoulder,setLeftShoulder]=useState(null) //field 5
  const [rightShoulder, setRightShoulder] = useState(null) // field 6
  const [leftHip, setLeftHip] = useState(null) // field 7
  const [rightHip,setRightHip]=useState(null) // field 8

  const [recentCervicalValue, setRecentCervicalValue] = useState(null)
  const [recentThoracicValue, setRecentThoracicValue] = useState(null) 
  const [recentLumberValue, setRecentLumberValue] = useState(null) 
  const [recentSacralValue,setRecentSacralValue]=useState(null)
  const [recentLeftShoulderValue, setRecentLeftShoulderValue] = useState(null) 
  const [recentRightShoulderValue, setRecentRightShoulderValue] = useState(null)
  const [recentLeftHipValue, setRecentLeftHipValue] = useState(null)
  const [recentRightHipValue, setRecentRightHipValue] = useState(null)

  const url = process.env.REACT_APP_ThinkSpeak_URL
  const EmergencyValue = 2000

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

  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("data:", data)
          if (data && data.feeds && data.feeds.length > 0) {
            const xAxis = data.feeds.map(feed => new Date(feed.created_at).getTime())

            setCervical({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field1) || 0),
              color: "black",
              seriesName: 'Cervical'
            })

            setThoracic({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field2) || 0),
              color: "black",
              seriesName: 'Thoracic'
            })

            setLumber({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field3) || 0),
              color: "black",
              seriesName: 'Lumber'
            })

            setSacral({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field4) || 0),
              color: "black",
              seriesName: 'Sacral'
            })

            setLeftShoulder({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field5) || 0),
              color: "black",
              seriesName: 'Left Shoulder'
            })

            setRightShoulder({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field6) || 0),
              color: "black",
              seriesName: 'Right Shoulder'
            })

            setLeftHip({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field7) || 0),
              color: "black",
              seriesName: 'Left Hip'
            })

            setRightHip({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field8) || 0),
              color: "black",
              seriesName: 'Right Hip'
            })

            const recentGripLevel = data.feeds.slice(-1)[0].field1.toUpperCase()
            setRecentCervicalValue(recentGripLevel)

            const recentTemperatureLevel = data.feeds.slice(-1)[0].field2.toUpperCase()
            setRecentThoracicValue(recentTemperatureLevel)

            const recentFallDetectLevel = data.feeds.slice(-1)[0].field3.toUpperCase()
            setRecentLumberValue(recentFallDetectLevel)

            const recentPostureLevel = data.feeds.slice(-1)[0].field4.toUpperCase()
            setRecentSacralValue(recentPostureLevel)

            const recentBatteryPercentageLevel = data.feeds.slice(-1)[0].field5.toUpperCase()
            setRecentLeftShoulderValue(recentBatteryPercentageLevel)

            const recentHeartRateLevel = data.feeds.slice(-1)[0].field6.toUpperCase()
            setRecentRightShoulderValue(recentHeartRateLevel)

            const recentSpo2Level = data.feeds.slice(-1)[0].field7.toUpperCase()
            setRecentLeftHipValue(recentSpo2Level)

            const recentSpo3Level = data.feeds.slice(-1)[0].field8.toUpperCase()
            setRecentRightHipValue(recentSpo3Level)

          }
          else{
            setCervical({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'Heart rate'
            })
            setThoracic({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'thoracic'
            })
            setLumber({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'Snoring Level'
            })
            setSacral({
              "x-axis": [],
              "y-axis": [],
              color: "#ED254E",
              seriesName: 'Roll'
            })
            setLeftShoulder({
              "x-axis": [],
              "y-axis": [],
              color: "#00F874",
              seriesName: 'Pitch'
            })
            setRightShoulder({
              "x-axis": [],
              "y-axis": [],
              color: "#2A4494",
              seriesName: 'Yaw'
            })
            setRecentCervicalValue("No Data")
            setRecentThoracicValue("No Data")
            setRecentLumberValue("No Data")
            setRecentSacralValue("No Data")
            setRecentLeftShoulderValue("No Data")
            setRecentRightShoulderValue("No Data")
            setRecentLeftHipValue("No Data")
            setRecentRightHipValue("No Data")
          }
        })
        .catch(err => {
          console.log("Error in fetching from Thinkspeak:", err)
        })
    };

    let intervalId
    if (url) {
      fetchData();
      // Optionally, set up polling for live data updates (e.g., every 30 seconds)
      intervalId = setInterval(fetchData, 5000);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [url]);



  if (!cervical || !thoracic || !lumber || !sacral || !leftShoulder || !rightShoulder ) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto space-y-10 md:px-10 px-2">
      <div className="md:flex md:justify-evenly gap-6 mt-6 space-y-3">
        {/* Current Value Card */}
        <div className="border rounded-2xl shadow-md bg-white w-full p-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Values</h2>

          <div className="text-center text-primary-950 font-bold text-2xl mb-6 tracking-wide">
            SPINAL BAR
          </div>

          <div className="space-y-4 flex flex-wrap">
            <CardRow
              label="Recent Cervical Value"
              value={recentCervicalValue}
              bgImage={CervicalIm}
              className={
                Number(recentCervicalValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white "
              }
            />
            <CardRow
              label="Recent Thoracic Value"
              value={recentThoracicValue}
              bgImage={ThoracicIm}
              className={
                Number(recentThoracicValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white "
              }
            />

            <CardRow
              label="Recent Lumber Value"
              value={recentLumberValue}
              bgImage={LumberIm}
              className={
                Number(recentLumberValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white "
              }
            />

            <CardRow
              label="Recent Sacral Value"
              value={recentSacralValue}
              bgImage={SacralIm}
              className={
                Number(recentSacralValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white "
              }
            />

            <CardRow
              label="Recent Left Shoulder Value"
              value={recentLeftShoulderValue}
              bgImage={LeftShoulderIm}
              className={
                Number(recentLeftShoulderValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white "
              }
            />

            <CardRow
              label="Recent Right Shoulder Value"
              value={recentRightShoulderValue}
              bgImage={RigthShoulderIm}
              className={
                Number(recentRightShoulderValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white "
              }
            />

            <CardRow
              label="Recent Left Hip Value"
              value={recentLeftHipValue}
              bgImage={HipIm}
              className={
                Number(recentLeftHipValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white "
              }
            />

            <CardRow
              label="Recent Right Hip Value"
              value={recentRightHipValue}
              bgImage={HipIm}
              className={
                Number(recentRightHipValue) === Number(EmergencyValue)
                  ? "shadow-md shadow-red-500 animate-pulse"
                  : "bg-white"
              }
            />
          </div>
        </div>
      </div>


      {/* Charts Section */}
      <div className="flex flex-wrap justify-center md:justify-between gap-4">
        {[cervical, thoracic, lumber, sacral, leftShoulder, rightShoulder, leftHip, rightHip].map(
          (chartData, i) => (
            <div
              key={i}
              className="
          w-full md:w-[48%] 
          bg-white rounded-2xl p-4 
          transition-all duration-300 
          hover:-translate-y-1 shadow shadow-primary-300
        "
            >
              {/* Title */}
              <h3 className="text-center font-semibold text-primary-600 mb-3 text-lg">
                {chartData.seriesName}
              </h3>

              {/* Chart Component */}
              <LiveChart
                data={[chartData]}
                lineStyle={"straight"}
                lineWidth={1}
                chartType={"line"}
                controls={controls}
              />
            </div>
          )
        )}
      </div>




    </div>
  );
}

export default Home


const CardRow = ({ label, value, bgImage, className }) => (
  <div className={`${className} shadow-lg rounded-2xl p-4 w-full max-w-sm mx-auto relative`}>

    {/* 🖼 Product / Sensor Image */}
    <img
      src={bgImage}
      alt={label}
      className="w-32 mx-auto mt-6 mb-2 drop-shadow-md"
    />

    {/* Title */}
    <h3 className="text-lg font-semibold text-center mt-2">
      {label}
    </h3>

    {/* Category / Value */}
    <p className="text-gray-500 text-sm text-center">
      Value: {value}
    </p>

  </div>
);

