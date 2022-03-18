import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders learn react link', () => {
    render(<App />)
    const linkElements = screen.queryAllByText(/Kategorie/i)
    linkElements.forEach(el => {
        expect(el).toBeInTheDocument()
    })
});
