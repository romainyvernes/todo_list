const EventListener = (target, name, functions=[]) => {
    target = target;
    name = name;
    functions = functions;

    const assignEvent = () => {
        target.addEventListener(name, function (e) {
            for (let i = 0; i < functions.length; i++) {
                functions[i](e);
            }
        });
    };

    return {target, name, functions, assignEvent};
};

export { EventListener };