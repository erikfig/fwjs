export const modelDirective = function (el, value, data) {
    el.parentElement.addEventListener('keyup', (e) => {
        console.log(e.target, el, e.target === el)
        if (e.target.innerHTML == el.innerHTML) {
            e.preventDefault();
            data[value] = e.target.value;
        }
    });
};
