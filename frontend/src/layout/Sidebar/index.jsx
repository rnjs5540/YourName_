import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<nav className="fixed inset-y-0 left-0 w-52 bg-gray-900 text-white z-5">
			<ul className="space-y-2 pt-33">
				<li>
					<Link className="flex items-center gap-3 py-2 px-5" to="/">
						<span></span>
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center gap-3 py-2 px-5"
						to="/friends"
					>
						<span>Friends</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Sidebar;
