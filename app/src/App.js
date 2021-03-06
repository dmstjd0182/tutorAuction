import React from 'react';
import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider, EuiHorizontalRule } from '@elastic/eui';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Web3ReactComponent from './components/web3_react/Web3ReactComponent';
import FactoryMainPage from './pages/factory/FactoryMainPage';
import ProfilePage from './pages/profile/ProfilePage';
import AuctionMainPage from './pages/auction/AuctionMainPage';

function App() {
  return (
    <div>
      <EuiProvider colorMode='light'>
      <Web3ReactComponent>
      <EuiHorizontalRule size="full" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FactoryMainPage />} />
          <Route path="/profile/:address" element={<ProfilePage />} />
          <Route path="/auction/:address" element={<AuctionMainPage />} />
          {/* <Route path="/swap" element={<SwapPoolMainPage />} /> */}
        </Routes>
      </BrowserRouter>
      </Web3ReactComponent>
      </EuiProvider>
    </div>
  );
}

export default App;
