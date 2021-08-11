import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';
import Locations from './Locations';

afterEach(cleanup);

describe('when rendered', () => {
    test('renders Locations component', () => {
        render(<Locations />);
    });

    it('should contain an expected input', () => {
        render(<Locations />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();

    });

    it('should contain an expected input with a placeholder', () => {
        render(<Locations />);
        const placeholderElement = screen.getByPlaceholderText('Type city name');
        expect(placeholderElement).toBeInTheDocument();

    });

    it('should contain an expected header', () => {
        render(<Locations />);
        const headerElement = screen.getByText('Recent Locations');
        expect(headerElement).toBeInTheDocument();
    });

    it('should contain an expected add button', () => {
        render(<Locations />);
        const buttonElement = screen.getByText('Add');
        expect(buttonElement).toBeInTheDocument();
    });

    it('should contain an expected clear button', () => {
        render(<Locations />);
        const buttonElement = screen.getByText('Clear');
        expect(buttonElement).toBeInTheDocument();
    });
});

describe('when typed in a City Name input', () => {
    it('should update its value', () => {
        render(<Locations />);

        const inputElement = screen.getByPlaceholderText(/Type city name/);

        userEvent.clear(inputElement);
        userEvent.type(inputElement, 'Toronto');
        expect(inputElement).toHaveValue('Toronto');
    });

    it('should clear its value', () => {
        render(<Locations />);

        const inputElement = screen.getByPlaceholderText(/Type city name/);

        userEvent.clear(inputElement);
        userEvent.type(inputElement, 'Toronto{enter}');
        expect(inputElement).toHaveValue('');
    });
});

describe('snapshot', () => {
    it('should take a snapshot', () => {
        const { asFragment } = render(<Locations />)
        expect(asFragment(<Locations />)).toMatchSnapshot()
    })
});
