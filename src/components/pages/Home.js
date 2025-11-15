import React, { useState, useEffect } from 'react'
import LiveChart from '../blocks/LiveChart'

function Home() {

  const [gripLevel, setGripLevel] = useState(null) // field 1
  const [temperature, setTemperature] = useState(null) // field 2
  const [fallDetect, setFallDetect] = useState(null) // field 3
  const [batteryPercentage,setBatteryPercentage]=useState(null) //field 5
  const [haertRate,setHeartRate]=useState(null) //field 6
  const [spo2,setSPo2]=useState(null) // field 7

  const [recentGripValue, setRecentGripValue] = useState(null)
  const [recentTemperatrueValue, setRecentTemperatrueValue] = useState(null) 
  const [recentFallDelectValue, setRecentFallDetectValue] = useState(null) 
  const [recentPostureValue,setRecentPostureValue]=useState(null)
  const [recentBatteryPercentageValue, setRecentBatteryPercentageValue] = useState(null) 
  const [recentHaertRateValue, setRecentHaertRateValue] = useState(null)
  const [recentSPo2Value, setRecentSPo2Value] = useState(null) 

  const url = process.env.REACT_APP_ThinkSpeak_URL

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

            setGripLevel({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field1) || 0),
              color: "black",
              seriesName: 'Grip level'
            })

            setTemperature({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field2) || 0),
              color: "black",
              seriesName: 'Temperature'
            })

            setFallDetect({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field3) || 0),
              color: "black",
              seriesName: 'Fall Detect'
            })

            setBatteryPercentage({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field5) || 0),
              color: "black",
              seriesName: 'Battery Percentage'
            })

            setHeartRate({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field6) || 0),
              color: "black",
              seriesName: 'Heart Rate'
            })

            setSPo2({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field7) || 0),
              color: "black",
              seriesName: 'Spo2'
            })

            const recentGripLevel = data.feeds.slice(-1)[0].field1.toUpperCase()
            setRecentGripValue(recentGripLevel)

            const recentTemperatureLevel = data.feeds.slice(-1)[0].field2.toUpperCase()
            setRecentTemperatrueValue(recentTemperatureLevel)

            const recentFallDetectLevel = data.feeds.slice(-1)[0].field3.toUpperCase()
            setRecentFallDetectValue(recentFallDetectLevel)

            const recentPostureLevel = data.feeds.slice(-1)[0].field4.toUpperCase()
            setRecentPostureValue(recentPostureLevel)

            const recentBatteryPercentageLevel = data.feeds.slice(-1)[0].field5.toUpperCase()
            setRecentBatteryPercentageValue(recentBatteryPercentageLevel)

            const recentHeartRateLevel = data.feeds.slice(-1)[0].field6.toUpperCase()
            setRecentHaertRateValue(recentHeartRateLevel)

            const recentSpo2Level = data.feeds.slice(-1)[0].field7.toUpperCase()
            setRecentSPo2Value(recentSpo2Level)

          }
          else{
            setGripLevel({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'Heart rate'
            })
            setTemperature({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'temperature'
            })
            setFallDetect({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'Snoring Level'
            })
            setBatteryPercentage({
              "x-axis": [],
              "y-axis": [],
              color: "#ED254E",
              seriesName: 'Roll'
            })
            setHeartRate({
              "x-axis": [],
              "y-axis": [],
              color: "#00F874",
              seriesName: 'Pitch'
            })
            setSPo2({
              "x-axis": [],
              "y-axis": [],
              color: "#2A4494",
              seriesName: 'Yaw'
            })
            setRecentGripValue("No Data")
            setRecentTemperatrueValue("No Data")
            setRecentFallDetectValue("No Data")
            setRecentPostureValue("No Data")
            setRecentBatteryPercentageValue("No Data")
            setRecentHaertRateValue("No Data")
            setRecentSPo2Value("No Data")
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



  if (!gripLevel || !temperature || !fallDetect || !batteryPercentage || !haertRate || !spo2 || !recentGripValue || !recentTemperatrueValue || !recentFallDelectValue || !recentBatteryPercentageValue || !recentHaertRateValue || !recentSPo2Value || !recentGripValue) {
    return <div>Loading...</div>
  }


  return (
    <div className="mx-auto">

        <h1 className="text-center text-primary-950 font-semibold my-6 text-xl">SMART CRUTCHES</h1>
        <h2 className='my-6 text-center'>Recent Grip Level: <span className={`text-secondary-800 rounded-md font-semibold bg-secondary-200 py-1 px-2`}>{recentGripValue}</span></h2>
        <h2 className='my-6 text-center'>Recent Temperature: <span className={`text-secondary-800 rounded-md font-semibold bg-secondary-200 py-1 px-2`}>{recentTemperatrueValue}</span></h2>
        <h2 className='my-6 text-center'>Recent Fall Detect: <span className={`text-secondary-800 rounded-md font-semibold bg-secondary-200 py-1 px-2`}>{recentFallDelectValue}</span></h2>
        <h2 className='my-6 text-center'>Recent Posture: <span className={`text-secondary-800 rounded-md font-semibold bg-secondary-200 py-1 px-2`}>{recentPostureValue}</span></h2>
        <h2 className='my-6 text-center'>Recent Battery Percentage: <span className={`text-secondary-800 rounded-md font-semibold bg-secondary-200 py-1 px-2`}>{recentBatteryPercentageValue}</span></h2>
        <h2 className='my-6 text-center'>Recent Heart Rate: <span className={`text-secondary-800 rounded-md font-semibold bg-secondary-200 py-1 px-2`}>{recentHaertRateValue}</span></h2>
        <h2 className='my-6 text-center'>Recent Spo2: <span className={`text-secondary-800 rounded-md font-semibold bg-secondary-200 py-1 px-2`}>{recentSPo2Value}</span></h2>
   
      {/* Charts Section */}
      <div className="flex flex-wrap justify-around gap-2">
        {[gripLevel, temperature, fallDetect , batteryPercentage , haertRate , spo2].map((chartData, i) => {
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