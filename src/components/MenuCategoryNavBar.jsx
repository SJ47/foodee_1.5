import React from "react";
import { Link } from "react-router-dom";

const MenuCategoryNavBar = ({ onCategoryNavClick }) => {
    return (
        <div id="cat-nav-container-buffer">
            <ul className="category-nav-container">
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("main");
                        }}
                    >
                        Mains
                    </Link>
                </li>
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("side");
                        }}
                    >
                        Side
                    </Link>
                </li>
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("snack");
                        }}
                    >
                        Snacks
                    </Link>
                </li>
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("dessert");
                        }}
                    >
                        Desserts
                    </Link>
                </li>
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("child_meal");
                        }}
                    >
                        Kids
                    </Link>
                </li>
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("hard_drink");
                        }}
                    >
                        Beers&nbsp;{"&"}&nbsp;Wines
                    </Link>
                </li>
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("soft_drink");
                        }}
                    >
                        Soft&nbsp;Drinks
                    </Link>
                </li>
                <li className="category-nav-link">
                    <Link
                        to="/menu"
                        onClick={() => {
                            onCategoryNavClick("hot_drink");
                        }}
                    >
                        Tea&nbsp;{"&"}&nbsp;Coffee
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuCategoryNavBar;
