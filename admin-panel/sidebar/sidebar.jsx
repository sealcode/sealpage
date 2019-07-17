import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
	const [toggle, setToggle] = useState(true);

	const toggle_class = basename =>
		toggle ? `${basename}--show` : `${basename}--hide`;

	//Close sidebar after clicking on a link but only on smaller resolutions since it takes to much space
	const conditionally_close_sidebar = () => {
		if (window.innerWidth <= 768) {
			setToggle(false);
		}
	};

	const routes = ['collections', 'components', 'logs', 'users', 'settings'];
	const external_links = {
		documentation: '#',
		'request a feature': '#',
		'about sealpage': '#',
		'contact sealcode': '#',
	};

	return (
		<div className={`sidebar__wrapper ${toggle_class('sidebar__wrapper')}`}>
			<div className={`sidebar ${toggle_class('sidebar')}`}>
				<div
					className={`sidebar__header ${toggle_class(
						'sidebar__header'
					)}`}
				>
					<NavLink onClick={conditionally_close_sidebar} to="/">
						<h1 className="sidebar__title">Sealpage</h1>
					</NavLink>
					<h2 className="sidebar__subtitle">Admin Panel</h2>
				</div>
				<ul
					className={`sidebar__main-menu sidebar__main-menu--primary ${toggle_class(
						'sidebar__main-menu'
					)}`}
				>
					{routes.map((route, index) => (
						<li
							key={`${route}#${index}`}
							onClick={conditionally_close_sidebar}
							className="sidebar__menu-item"
						>
							<NavLink to={`/${route}`}>{route}</NavLink>
						</li>
					))}
				</ul>
				<ul
					className={`sidebar__main-menu sidebar__main-menu--secondary ${toggle_class(
						'sidebar__main-menu'
					)}`}
				>
					{Object.keys(external_links).map((link, index) => (
						<li
							key={`${external_links}#${index}`}
							onClick={conditionally_close_sidebar}
							className="sidebar__menu-item sidebar__menu-item--secondary"
						>
							<a href={external_links[link]}>{link}</a>
						</li>
					))}
				</ul>
			</div>
			<div className="sidebar__separator">
				<button
					onClick={() => setToggle(!toggle)}
					className={`sidebar__arrow ${toggle_class(
						'sidebar__arrow'
					)}`}
				>
					{toggle ? '<' : '>'}
				</button>
			</div>
		</div>
	);
}
