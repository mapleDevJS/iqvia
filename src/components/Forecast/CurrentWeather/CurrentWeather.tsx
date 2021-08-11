import { useContext } from 'react';
import { store } from 'store/index';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import 'dayjs/locale/en-ca';
import styles from './CurrentWeather.module.scss';
import { Forecast } from 'types/index';
import { CELSIUS } from 'consts';

interface Props {
    weather: Forecast;
}

dayjs.locale('en-ca');

const CurrentWeather: React.FC<Props> = ({ weather }) => {
    const { locationsStore } = useContext(store);
    const { getLocationById } = locationsStore;

    const currentWeather = getLocationById(weather.city.id);

    return (
        <div className={styles.currentWeather}>
            <div>
                <img
                    src={require(`assets/icons/${currentWeather?.weather[0].icon}.svg`).default}
                    width="240"
                    height="240"
                    alt={currentWeather?.weather[0].description}
                />
            </div>
            <ul className={styles.currentWeatherDetails}>
                <li>
                    {currentWeather?.main.temp}&nbsp;{CELSIUS}
                </li>
                <li className={styles.description}>{currentWeather?.weather[0].description}</li>
                <li>
                    Wind: {currentWeather?.wind.speed}ms {currentWeather?.wind.deg}deg
                </li>
                <li>Pressure {currentWeather?.main.pressure}</li>
            </ul>
        </div>
    );
};

export default observer(CurrentWeather);
