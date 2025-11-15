import React, { useState, useEffect } from 'react'
import LiveChart from '../blocks/LiveChart'

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
              seriesName: 'Left Liver'
            })

            setRightHip({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field8) || 0),
              color: "black",
              seriesName: 'Right Liver'
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
    <div className="mx-auto">

      <div className="md:flex md:justify-evenly gap-6 mt-6 px-6 space-y-3">
        {/* Current Value Card */}
        <div className="border px-6 py-5 rounded-2xl shadow-md bg-white w-full md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Values</h2>

          <div className="text-center text-primary-950 font-bold text-2xl mb-6 tracking-wide">
            SPINAL BAR
          </div>

          <div className="space-y-4">
            <CardRow label="Recent Cervicel value" className={`${Number(recentCervicalValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`} value={recentCervicalValue} />
            <CardRow label="Recent Thoracic value" className={`${Number(recentThoracicValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`} value={recentThoracicValue} />
            <CardRow label="Recent Lumber value" className={`${Number(recentLumberValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`} value={recentLumberValue} />
            <CardRow label="Recent Sacral value" className={`${Number(recentSacralValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`} value={recentSacralValue} />
            <CardRow label="Recent Left Shoulder value" className={`${Number(recentLeftShoulderValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`} value={recentLeftShoulderValue} />
            <CardRow label="Recent Right Shoulder value" className={`${Number(recentRightShoulderValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`} value={recentRightShoulderValue} />
            <CardRow label="Recent Left Hip value" className={`${Number(recentLeftHipValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`} value={recentLeftHipValue} />
            <CardRow label="Recent Right Hip value" className={`${Number(recentRightHipValue) === Number(EmergencyValue) ? "bg-red-500 text-white" : "bg-secondary-100"}`}  value={recentRightHipValue} />
          </div>
        </div>
      </div>


   
      {/* Charts Section */}
      <div className="flex flex-wrap justify-around gap-2">
        {[cervical, thoracic, lumber , sacral , leftShoulder , rightShoulder , leftHip , rightHip].map((chartData, i) => {
            return (
              <div className=" m-2 border w-11/12 md:w-5/12 rounded-lg" key={i} style={{ marginBottom: "20px" }}>
                <LiveChart data={[chartData]} title={chartData.seriesName} lineStyle={'straight'} lineWidth={1} chartType={'line'} controls={controls} />
              </div>
            )
          })}
      </div>

    </div>
  );
}

export default Home


const CardRow = ({ label, value , className }) => (
  <div className={`${className} flex justify-between items-center  rounded-lg py-2 px-3`}>
    <span className="font-medium">{label}:</span>
    <span className="font-semibold text-secondary-800 bg-secondary-200 py-1 px-2 rounded-md">
      {value}
    </span>
  </div>
);