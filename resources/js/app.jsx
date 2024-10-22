import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import Menu from './components/Menu';
import { RecoilRoot } from 'recoil';
import { StrictMode } from 'react';

const container = document.getElementById('app');

// Check if a root already exists
if (!container._reactRoot) {
    // Create the root if it doesn't exist
    const root = ReactDOM.createRoot(container);
    root.render(
        <StrictMode>
            <RecoilRoot>
                <Menu />
            </RecoilRoot>
        </StrictMode>
    );
    container._reactRoot = root; // Store reference to the root
} else {
    // If the root already exists, just update it
    container._reactRoot.render(
        <StrictMode>
            <RecoilRoot>
                <Menu />
            </RecoilRoot>
        </StrictMode>
    );
}
