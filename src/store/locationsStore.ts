import { observable, makeObservable, runInAction, action } from 'mobx';
import { Forecast, Location } from 'types/index';
import { BASE_URL } from 'consts';

export class LocationsStore {
    isFetching: boolean;
    locations: Location[];
    error: Error | null;
    updateError: Error | null;
    forecast: Forecast | null;

    constructor() {
        this.isFetching = false;
        this.locations = [];
        this.error = null;
        this.updateError = null;
        this.forecast = null;

        makeObservable(this, {
            isFetching: observable,
            locations: observable,
            error: observable,
            forecast: observable,
            fetchLocations: action,
            fetchLocationById: action,
        });
    }

    setIsFetching = (status: boolean) => runInAction(() => (this.isFetching = status));
    getIsFetching = () => this.isFetching;

    setError = (error: Error | null) => runInAction(() => (this.error = error));
    getError = () => this.error;
    resetError = () => runInAction(() => (this.error = null));

    setUpdateError = (error: Error | null) => runInAction(() => (this.updateError = error));
    getUpdateError = () => this.updateError;
    resetUpdateError = () => runInAction(() => (this.updateError = null));

    setLocations = (location: Location) =>
        runInAction(() => {
            const isDuplicated = Boolean(
                this.locations.find(recentLocation => recentLocation.id === location.id),
            );

            if (!isDuplicated) {
                this.locations.unshift(location);

                if (this.locations.length > 8) {
                    this.locations.pop();
                }
            }
        });

    setLocationByIdx = (idx: number, location: Location) =>
        runInAction(() => (this.locations[idx] = location));

    getLocations = (): Location[] => this.locations;
    getLocationById = (id: number) => this.locations.find(location => location.id === id);
    deleteLocationById = (id: number) =>
        runInAction(() => {
            this.locations = this.locations.filter(location => location.id !== id);
        });
    resetLocations = () => runInAction(() => (this.locations = []));

    setForecast = (forecast: Forecast | null) => runInAction(() => (this.forecast = forecast));
    getForecast = () => this.forecast;
    resetForecast = () => runInAction(() => this.setForecast(null));

    fetchLocations = async (cityName: string) => {
        try {
            this.setIsFetching(true);
            this.resetUpdateError();
            const location: Location = await fetch(
                `${BASE_URL}/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
            ).then(res => res.json());

            if (location.cod === '404') {
                this.setError(new Error(location.message));
            } else {
                this.setError(null);
                this.setLocations(location);
                this.fetchForecast(location.id);
            }
        } catch (err) {
            this.setError(err);
        }
        this.setIsFetching(false);
    };

    fetchLocationById = async (id: number) => {
        try {
            this.setIsFetching(true);
            const location: Location = await fetch(
                `${BASE_URL}/weather?id=${id}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
            ).then(res => res.json());

            if (location.cod === '404') {
                this.setUpdateError(new Error(location.message));
            } else {
                this.setError(null);
                const idx = this.locations.findIndex(location => location.id === id);
                this.setLocationByIdx(idx, location);
            }
        } catch (err) {
            this.setUpdateError(err);
        }
        this.setIsFetching(false);
    };

    fetchForecast = async (id: number) => {
        try {
            this.setIsFetching(true);
            const forecast: Forecast = await fetch(
                `${BASE_URL}/forecast/daily?id=${id}&cnt=5&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
            ).then(res => res.json());

            this.setError(null);
            this.setForecast(forecast);

        } catch (err) {
            this.setError(err);
        }
        this.setIsFetching(false);
    };
}
