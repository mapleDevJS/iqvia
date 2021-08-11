import { observer } from 'mobx-react';
import { useContext } from 'react';
import styles from './App.module.scss';
import utilityStyles from 'styles/utils.module.scss';
import ForecastDetails from 'components/Forecast/Forecast';
import Locations from 'components/Locations/Locations';
import { store } from 'store/index';

function App() {
    const { locationsStore } = useContext(store);
    const { getForecast } = locationsStore;

    const forecast = getForecast();

    return (
        <div className={styles.app}>
            <main className={styles.container}>
                <h1 className={utilityStyles.visuallyHidden} data-testid="visibility-hidden">World Weather Forecast</h1>
                <Locations />
                {forecast && <ForecastDetails forecast={forecast} />}
            </main>
        </div>
    );
}

export default observer(App);
