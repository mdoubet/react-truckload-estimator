import { toContainHTML } from '@testing-library/jest-dom/dist/matchers';
import '../styles/Head.css'
import logo from '../truck.svg';

export default function Head({ weight, cbf }) {
    return (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Moving Size Estimator
            <br/>
            <a
            className="App-link"
            href="http://www.movingconnections.com"
            target="_blank"
            rel="noopener noreferrer"
            >
                by Moving Connections
            </a>
        </p>
        <article className='Head-totals'>
            {(weight/1000).toFixed(1)}K lbs<br/>
            {cbf} ft<sup>3</sup>
        </article>
      </header>
    )
}