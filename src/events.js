const EventListener = (target, name, functions) => {
    target = target;
    name = name;
    functions = functions;

    return {target, name, functions};
};

const eventModule = (() => {

    let events = [];

    const createEvent = (target, name, functions) => {
        const newEvent = EventListener(target, name, functions);
        console.log(functions)
        events.push(newEvent);
    };

    const assignEvents = () => {
        events.map(event => {
            event.target.addEventListener(event.name, e => {
                event.functions.map(eventFunction => eventFunction());
            });
        });
    };

    return {createEvent, assignEvents};
})();

export { eventModule };