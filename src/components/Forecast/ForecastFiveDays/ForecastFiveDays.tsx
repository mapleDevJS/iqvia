
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import 'dayjs/locale/en-ca';
import styles from './ForecastFiveDays.module.scss';
import { DetailWeather } from 'types/index';
import { CELSIUS } from 'consts';

type Props = {
    forecast: DetailWeather[];
}

dayjs.locale('en-ca');

const ForecastFiveDays: React.FC<Props> = ({ forecast }) => {
    return (
        <ul className={styles.forecastFiveDays}>
            {forecast.map(forecast => {
                const weatherIcon = require(`assets/icons/${forecast.weather[0].icon}.svg`);
                return (
                    <li key={forecast.dt} className={styles.forecastDay}>
                        <span className={styles.date}>{dayjs.unix(forecast.dt).date()}</span>
                        <span className={styles.weekDay}>{dayjs.unix(forecast.dt).format('ddd')}</span>
                        <img src={weatherIcon.default} alt={forecast.weather[0].description} width="96" height="96" />
                        <span>
                            {forecast.temp.max}&nbsp;{CELSIUS}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default observer(ForecastFiveDays);
