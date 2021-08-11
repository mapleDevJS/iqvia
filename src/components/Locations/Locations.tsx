import { ChangeEvent, useContext, useState } from 'react';
import { observer } from 'mobx-react';
import { store } from 'store/index';
import RecentLocations from './RecentLocations/RecentLocations';
import Button from 'components/Button/Button';
import styles from './Locations.module.scss';

enum ButtonText {
    ADD = 'Add',
    CLEAR = 'Clear',
}

const Locations = () => {
    const { locationsStore } = useContext(store);
    const { fetchLocations, getLocations, resetLocations, resetForecast, getError, resetError } =
        locationsStore;

    const [cityName, setCityName] = useState<string>('');

    const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setCityName(evt.target.value);
    };

    const onKeyPressHandler = (evt: React.KeyboardEvent) => {
        if (evt.key === 'Enter') {
            setCityName('');
            fetchLocations(cityName);
        }
    };

    const error = getError();
    const locations = getLocations();
    const isAnyLocation = locations.length > 0;

    const addButtonClickHandler = (cityName: string) => {
        setCityName('');
        fetchLocations(cityName);
    };

    const clearButtonClickHandler = () => {
        resetForecast();
        resetLocations();
    };

    return (
        <section className={styles.locations}>
            <div className={styles.searchBox}>
                <input
                    className={styles.inputLocation}
                    placeholder={'Type city name'}
                    value={cityName}
                    onKeyPress={onKeyPressHandler}
                    onChange={inputChangeHandler}
                    onFocus={resetError}
                />
                <Button onClick={() => addButtonClickHandler(cityName)} text={ButtonText.ADD} />
                {error && <span className={styles.notFound}>{error.message}</span>}
            </div>

            <h2 className={styles.title}>Recent Locations</h2>

            {isAnyLocation && <RecentLocations locations={locations} />}

            <div className={styles.bottomControls}>
                <Button onClick={clearButtonClickHandler} text={ButtonText.CLEAR} />
            </div>
        </section>
    );
};

export default observer(Locations);
