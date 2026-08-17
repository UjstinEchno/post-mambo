import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projects from './pages/Projects';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Project from './pages/Project';
import HeaderLogo from './pages/HeaderLogo';

function App () {
	return (
		<Router>
			<div className='w-full h-full overflow-hidden relative shrink-0 m-0 p-0'>
				<HeaderLogo />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/projects' element={<Projects />} />
					<Route path='/projects/:id' element={<Project />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
