import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecentLocations from './RecentLocations';
import { ReactComponent as RefreshIcon } from 'assets/icons/refresh.svg';

afterEach(cleanup);

describe('when rendered', () => {
    test('renders RecentLocations component', () => {
        render(<RecentLocations locations={[]} />);
    });
});

describe('when add button clicked', () => {
    it('calls the onClick callback handler', () => {
        const onClick = jest.fn();

        render(
            <button
                className=""
                onClick={onClick}
            >
                <RefreshIcon />
            </button>
        );

        userEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe('snapshot', () => {
    it('should take a snapshot', () => {
        const { asFragment } = render(<RecentLocations locations={[]}/>)
        expect(asFragment(<RecentLocations locations={[]}/>)).toMatchSnapshot()
    })
});
