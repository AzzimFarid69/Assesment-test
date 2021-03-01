import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css';
import { useParams } from 'react-router-dom';
import { EVERY_HOUR } from '../../Endpoint';

const SecondScreen = ({ location }) => {
    const params = useParams();
    const { REACT_APP_API_URL, REACT_APP_APP_KEY } = process.env;
    const [hourly, setHourly] = useState([]);

    const handleWeather = () => {
        const initParam  = {
            lat: params.lat,
            lon: params.lng,
            appid: REACT_APP_APP_KEY
        }
        axios.get(`${REACT_APP_API_URL}${EVERY_HOUR}`, {
            params: initParam
        })
            .then(res => {
                console.log('res1', res)
                setHourly(res.data.list)
            })
    }

    const converter = (val) => {


        const DegC = (val - 32)*5/9;

        return DegC
    }

    useEffect(() => {
        handleWeather();
    }, [])
    return (
        <div>
            <text>{moment.unix(location.data).format('dddd')}</text>
            <ul>
                {hourly.map(item => {
                        if (moment.unix(location.data).format('dddd') === moment.unix(item.dt).format('dddd')) {
                            return (
                                <li>
                                    <div className="column">
                                        <text>Time: {moment(item.dt_txt).format('h:mm a')}</text>
                                        <text>Humidity: {item.main.humidity}</text>
                                    </div>
                                </li>
                            )
                        }
                    })}
            </ul>
        </div>
    )
}

export default SecondScreen;
