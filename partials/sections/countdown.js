
import { useState, useEffect } from "react";

import SectionHead from '../../components/section-head';

import * as api from '../../lib/api'

import RichText from '../../components/richtext';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    dateTarget
    labelDate
    labelCountDays
    labelCountHours
    labelCountMinutes
    labelCountSeconds
    completionInfoText {
        json
    }
    `
    const data = (await api.getData(preview, "countdownPage", fields, locale)) ?? []
    return data
}


export default function Countdown({ data }) {

    const [ dateTarget ] = useState(data.countdown.dateTarget)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            // Set the date we're counting down to
            let date = new Date(dateTarget)
            let countDownDate = date.getTime()

            // Get todays date and time
            let now = new Date().getTime()
            //var now = new Date("Mar 19, 2020 12:05:00").getTime();

            // Find the distance between now an the count down date
            let distance = 0
            if (countDownDate > now) {		
                distance = countDownDate - now
            } else {
                document.querySelector(".finished").classList.remove("d-none")  
                distance = now - countDownDate
            }

            // Time calculations for days, hours, minutes and seconds
            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000))

        }, 1000)

    });

    return (
        <>
            <div className="container">
                <SectionHead data={data.countdown} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">                
                    <div className="col-lg-12 p-0 m-1 text-center wow fadeInUp">
                        <div className="row g-3 countdown justify-content-center mb-4">
                            <div className="col text-center text-light">
                                <span className="fs-2 me-2">{data.countdown.labelDate}</span> 
                                <span className="date fs-4 text-dark">{new Date(data.countdown.dateTarget).toLocaleString("de-DE")}</span>
                            </div>  
                        </div>
                        <div className="row finished d-none justify-content-center mb-4">
                            <div className="col text-center">
                                <div className="fs-2 text-light">
                                    <RichText text={data.countdown.completionInfoText} />                          
                                </div>
                            </div>    	  	
                        </div>                        
                        <div className="row g-3 justify-content-center">  	
                            <div className="col-lg-2">
                                <div className="block bg-highlight text-white shadow-lg rounded-circle p-5 text-center">
                                <span className="days display-1">{days}</span>
                                <div className="fw-lighter">{data.countdown.labelCountDays}</div>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="block bg-highlight text-white shadow-lg rounded-circle p-5 text-center">
                                <span className="hours display-1">{hours}</span>
                                <div className="fw-lighter">{data.countdown.labelCountHours}</div>	    	
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="block bg-highlight text-white shadow-lg rounded-circle p-5 text-center">
                                <span className="minutes display-1">{minutes}</span>
                                <div className="fw-lighter">{data.countdown.labelCountMinutes}</div>
                                </div>
                            </div>
                            <div className="col-lg-2">
                            <div className="block bg-highlight text-white shadow-lg rounded-circle p-5 text-center">
                                <span className="seconds display-1">{seconds}</span>
                                <div className="fw-lightere">{data.countdown.labelCountSeconds}</div>
                                </div>
                            </div>
                        </div>
                    </div>                                        
                </div>
            </div>    
        </>
    );
}
