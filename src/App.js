import './App.css';
import {   Routes , Route } from 'react-router-dom';
import routes from './pages/index'


function App() {

    return (
        <Routes >
            {
            routes.map(({path, component},index) => (
                <Route onUpdate={() => window.scrollTo(0, 0)} exact={true} path={path} element={component} key={index} />
            ))
            }
      </Routes>
    );
}

export default App;
