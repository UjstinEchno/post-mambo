import Project, { colorsArr } from './Project';
import projects from '../data/projects.json';
import Menu from './Menu';

const sortedProjects = [...projects].sort((a, b) => {
	if (!a.date) return 1;
	if (!b.date) return -1;
	return new Date(b.date) - new Date(a.date);
});

// Computed as one pass over the whole list, rather than each card picking its own
// color, so adjacency ("never the same as the previous card") is actually guaranteed
// instead of depending on per-card state that React can reset out from under it.
function assignColors (count) {
	let last = null;
	const colors = [];
	for (let i = 0; i < count; i++) {
		const available = colorsArr.filter((c) => c !== last);
		last = available[Math.floor(Math.random() * available.length)];
		colors.push(last);
	}
	return colors;
}

function Projects () {
	const cardColors = assignColors(sortedProjects.length);
	return (
		<div>
			<Menu />
			{sortedProjects.map((projectinfo, i) => (
				<Project key={projectinfo.id} projectinfo={projectinfo} bgColor={cardColors[i]} />
			))}
		</div>
	);
}

export default Projects;
