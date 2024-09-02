import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import HomePage from '../pages/HomePage';
import Diary from '../pages/Diary';
import DevLog from '../pages/DevLog';
import Profile from '../components/Profile';
import Settings from '../pages/Settings';
import Project from '../components/Project';
import Login from '../pages/Login';
import SignUpPage from '../pages/SignUpPage';

function AnimatedRoutes() {
  const location = useLocation();
  const prevLocationRef = React.useRef(location);

  // Update the previous location reference
  React.useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);

  const isSamePage = location.pathname === prevLocationRef.current.pathname;

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        classNames="page"
        timeout={300}
        unmountOnExit
      >
        <div className="page-wrapper">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/devlog" element={<DevLog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/project" element={<Project />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<SignUpPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AnimatedRoutes;
