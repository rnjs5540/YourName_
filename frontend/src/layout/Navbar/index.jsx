import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Sections/NavItem";

const Navbar = () => {
	const [menu, setMenu] = useState(false);

	const handleMenu = () => {
		setMenu(!menu);
	};

	return (
		<section className="relative z-10 text-white bg-gray-900 ">
			<div className="w-full">
				<div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-10 pt-1">
					{/* logo */}
					<div className="flex items-center text-2xl h-14">
						<Link to="/">YourPlan</Link>
					</div>

					{/* menu button */}
					<div className="text-2xl sm:hidden">
						<button onClick={handleMenu}>{menu ? "-" : "+"}</button>
					</div>

					{/* nav-items */}
					<div className="hidden sm:block">
						<NavItem />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Navbar;
