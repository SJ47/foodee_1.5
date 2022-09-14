import React, { useEffect, useState } from "react";
// import MenuService from "../services/MenuService";

const TestContainer = () => {
    // const [allMenuItems, setAllMenuItems] = useState([]);

    // const getAllMenuItems = () => {
    //     MenuService.getMenuItems().then((menuItems) =>
    //         setAllMenuItems(menuItems)
    //     );
    // };

    // useEffect(() => {
    //     getAllMenuItems();
    // }, []);

    if (!allMenuItems) {
        return <p>nothing</p>;
    }

    return (
        <>
            <div>Hello</div>
        </>
    );
};

export default TestContainer;
