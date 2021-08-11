import { useCallback, useContext } from 'react';
import { store } from 'store/index';
import { observer } from 'mobx-react';
import debounce from 'lodash.debounce';
import dayjs from 'dayjs';
import 'dayjs/locale/en-ca';
import commonStyles from 'styles/common.module.scss';
import styles from './Forecast.module.scss';
import { Forecast } from 'types/index';
import { ReactComponent as RefreshIcon } from 'assets/icons/refresh.svg';
import ForecastFiveDays from './ForecastFiveDays/ForecastFiveDays';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import { Country } from 'consts';
import { Notification } from '../Notification/Notification';

interface Props {
    forecast: Forecast;
}

dayjs.locale('en-ca');

const ForecastDetails: React.FC<Props> = ({ forecast }) => {
    const { locationsStore } = useContext(store);
    const { fetchLocationById, getIsFetching, getUpdateError } = locationsStore;

    const isFetching = getIsFetching();
    const error = getUpdateError();

    const { city, list } = forecast;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchLocationById = useCallback(debounce(fetchLocationById, 400), []);

    return (
        <section className={styles.forecast}>
            {isFetching ? (
                <Notification message={'Loading...'} />
            ) : (
                <>
                    {error ? (
                        <Notification message={error.message} />
                    ) : (
                        <>
                            <h3 className={styles.location}>
                                {city.name}, {Country[city.country]}
                            </h3>

                            <CurrentWeather weather={forecast} />
                            <ForecastFiveDays forecast={list} />
                        </>
                    )}

                    <button
                        className={`${commonStyles.refreshButton} ${styles.updateButton}`}
                        onClick={() => debouncedFetchLocationById(city.id)}
                    >
                        <RefreshIcon />
                    </button>
                </>
            )}
        </section>
    );
};

export default observer(ForecastDetails);
