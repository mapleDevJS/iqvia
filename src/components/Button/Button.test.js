import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('when rendered', () => {
    it('renders Button component', () => {
        render(<Button />);
    });

    it('should contain an expected text', () => {
        render(<Button text={'text'}/>);
        const buttonElement = screen.getByText('text');
        expect(buttonElement).toBeInTheDocument();
    });

    it('should contain a button tag', () => {
        render(<Button />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    it('calls the onClick callback handler', () => {
        const onClick = jest.fn();

        render(
            <Button className="" onClick={onClick} text={''}>
                text
            </Button>,
        );

        userEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
