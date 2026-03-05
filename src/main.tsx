import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Splash } from './components/Splash.tsx';
import { AnimatedBackground } from './components/AnimatedBackground.tsx';
import './index.css';

const Root = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <StrictMode>
      {!isLoaded && <Splash onComplete={() => setIsLoaded(true)} />}
      <AnimatedBackground />
      {isLoaded && <App />}
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
