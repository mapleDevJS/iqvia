import { render, screen } from '@testing-library/react';
import App from './App';
// import ForecastDetails from 'components/Forecast/Forecast';

jest.mock('../Forecast/Forecast.tsx', () => () => <div data-testid='forecast'></div>);


describe('when rendered', () => {
    test('renders App component', () => {
        render(<App />);
    });
    it('should contain an expected title', () => {
        render(<App />);
        const titleElement = screen.getByText(/weather/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('should visually hide an title', () => {
        render(<App />);
        const titleElement = screen.getByText(/World Weather Forecast/i);
        expect(titleElement).toHaveClass('visuallyHidden', { exact: true });
    });

    it('should contain an main section', () => {
        render(<App />);
        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();
    });

    it('should not render ForForecastDetails component',() => {
        render(<App />);
        expect(screen.queryByTestId('forecast')).toBeNull();
    });
});

describe('snapshot', () => {
    it('should take a snapshot', () => {
        const { asFragment } = render(<App />);

        expect(asFragment(<App />)).toMatchSnapshot();
    });
});
