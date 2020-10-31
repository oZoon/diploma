// functional component:
//  https://medium.com/free-code-camp/how-to-detect-an-outside-click-with-react-and-hooks-25dbaa30abcd

// class component:
// https://askdev.ru/q/obnaruzhenie-komponenta-click-outside-react-10267/


import React, { useEffect } from "react";

function ClickOutside({ children, onClick }) {
    const refs = React.Children.map(children, () => React.createRef());
    const handleClick = (e) => {
        const isOutside = refs.every(ref => {
            if (ref.current !== null) {
                return !ref.current.contains(e.target);
            }
        });
        if (isOutside) {
            onClick(e);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return function () {
            document.removeEventListener("click", handleClick);
        };
    });

    return React.Children.map(children, (element, idx) =>
        React.cloneElement(element, { ref: refs[idx] })
    );
}

export default ClickOutside;
