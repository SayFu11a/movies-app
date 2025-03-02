import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Offline, Online } from 'react-detect-offline';

import App from './components/App';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Online>
            <App />
        </Online>
        <Offline>
            <ErrorAlert errMessage="You are Offline📵⛔" />
        </Offline>
    </StrictMode>
);
