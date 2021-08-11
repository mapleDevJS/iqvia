import { useCallback, useContext } from 'react';
import { store } from 'store/index';
import { observer } from 'mobx-react';
import { debounce } from 'lodash';
import { Location } from 'types/index';
import commonStyles from 'styles/common.module.scss';
import styles from './RecentLocations.module.scss';
import { ReactComponent as RefreshIcon } from 'assets/icons/refresh.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { CELSIUS } from 'consts';

interface Props {
    locations: Location[];
}

const RecentLocations: React.FC<Props> = ({ locations }) => {
    const { locationsStore } = useContext(store);
    const { fetchLocationById, fetchForecast, deleteLocationById, resetForecast, getForecast } = locationsStore;

    const forecast = getForecast();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchLocationById = useCallback(debounce(fetchLocationById, 400), []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchForecast = useCallback(debounce(fetchForecast, 400), []);

    return (
        <ul className={styles.recentLocations}>
            {locations.map(location => (
                <li key={location.id} className={styles.location}>
                    <div className={styles.locationName}>
                        <button className={styles.locationLink} onClick={() => debouncedFetchForecast(location.id)}>
                            {location.name}
                        </button>
                    </div>
                    <span>
                        {location.main.temp}&nbsp;{CELSIUS}
                    </span>

                    <span className={styles.weatherIcon}>
                        <img
                            src={require(`assets/icons/${location.weather[0].icon}.svg`).default}
                            alt={location.weather[0].description}
                            width="48"
                            height="48"
                        />
                    </span>
                    <span>{location.weather[0].main}</span>

                    <div className={styles.buttonGroup}>
                        <button
                            className={commonStyles.refreshButton}
                            onClick={() => debouncedFetchLocationById(location.id)}
                        >
                            <RefreshIcon />
                        </button>
                        <button
                            className={commonStyles.refreshButton}
                            onClick={() => {
                                if (forecast?.city.id === location.id) resetForecast();
                                deleteLocationById(location.id);
                            }}
                            data-testid="delete-button"
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default observer(RecentLocations);
