import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { Offline, Online } from 'react-detect-offline';

import useOnlineStatus from './utils/useOnlineStatus';

import App from './components/App';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';

const RootComponent = () => {
    const isOnline = useOnlineStatus();

    return isOnline ? <App /> : <ErrorAlert errMessage="You are Offline📵⛔" />;
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RootComponent />
    </StrictMode>
);
