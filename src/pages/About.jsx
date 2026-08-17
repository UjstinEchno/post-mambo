import { useState } from 'react';
import people from '../data/people.json';
import projects from '../data/projects.json';
import Person from './Person';
import PersonDetail from './PersonDetail';
import Menu from './Menu';

function findProjectsByCredit (name) {
	return projects.filter((p) => p.creditspriority.some((c) => c.name === name));
}

function findRoleByName (name, project) {
	return project.creditspriority.find((c) => c.name === name);
}

// Temporarily disabled for launch — flip back to true to re-enable the click-to-reveal
// bio/credits popup. Nothing else needs to change; Person/PersonDetail are untouched.
const PERSON_DETAIL_ENABLED = false;

function randomOffset () {
	return {
		marginLeft:
			Math.random() < 0.7
				? `${(-(0.25 + Math.random() * 1.25)).toFixed(2)}rem`
				: `${(0.5 + Math.random() * 2.5).toFixed(2)}rem`,
		marginTop: `${(Math.random() * 1.25).toFixed(2)}rem`,
		transform: `rotate(${(Math.random() * 4 - 2).toFixed(2)}deg) scale(${(0.98 + Math.random() * 0.04).toFixed(2)})`,
		zIndex: Math.floor(Math.random() * 10) + 1,
		position: 'relative',
	};
}

function About () {
	const [selectedIndex, setSelectedIndex] = useState(null);

	const selectedPerson = selectedIndex !== null ? people[selectedIndex] : null;
	const selectedCredits = selectedPerson
		? findProjectsByCredit(selectedPerson.name).map((item) => ({
				id: item.id,
				title: item.title,
				role: findRoleByName(selectedPerson.name, item)?.role,
			}))
		: [];

	return (
		<div className='bg-amber min-h-screen'>
			<Menu />
			<div className='flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-3 px-4 md:px-10 pt-24 pb-10 md:h-screen'>
				{people.map((personinfo, i) => (
					<Person
						key={personinfo.name}
						personinfo={personinfo}
						style={randomOffset()}
						onClick={PERSON_DETAIL_ENABLED ? () => setSelectedIndex((cur) => (cur === i ? null : i)) : undefined}
					/>
				))}
			</div>

			{PERSON_DETAIL_ENABLED && selectedPerson && (
				<PersonDetail
					personinfo={selectedPerson}
					credits={selectedCredits}
					onClose={() => setSelectedIndex(null)}
					onPrev={() => setSelectedIndex((i) => (i - 1 + people.length) % people.length)}
					onNext={() => setSelectedIndex((i) => (i + 1) % people.length)}
				/>
			)}
		</div>
	);
}

export default About;
