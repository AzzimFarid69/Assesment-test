/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ONE_CALL_WEATHER } from '../../Endpoint';
import './index.css';
import moment from 'moment';
import { Link } from 'react-router-dom'

const FirstScreen  = () => {
    const { REACT_APP_API_URL, REACT_APP_APP_KEY } = process.env
    const [daily, setDaily] = useState([]);      
    const lat = '3.139003';
    const lng = '101.686852';


    const handleWeather = () => {
        const initParam  = {
            lat: lat,
            lon: lng,
            appid: REACT_APP_APP_KEY
        }
        axios.get(`${REACT_APP_API_URL}${ONE_CALL_WEATHER}`, {
            params: initParam
        })
            .then(res => {
                console.log('res', res)
                setDaily(res.data.daily)
            })
    }

    console.log('awdawd', `${REACT_APP_API_URL}${ONE_CALL_WEATHER}`)

    useEffect(() => {
        handleWeather();
      }, []);
      
    return (
        <div>
            <h1>Kuala Lumpur Weather</h1>
            <ul>
                {daily.map(item => (
                    <li key={item.dt}>
                        <div className="column">
                            <text>Day: {moment.unix(item.dt).format('dddd DD/MM/YYYY')}</text>
                            <text>Sunrise: {moment.unix(item.sunrise).format('h:mm a')}</text>
                            <text>Sunset: {moment.unix(item.sunset).format('h:mm a')}</text>
                            <Link
                                to={{
                                    pathname: `/hourly/${lat}/${lng}`,
                                    data: item.dt
                                }}>
                                <text>See every 3 hours</text>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FirstScreen;