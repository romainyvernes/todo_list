const EventListener = (target, name, functions=[]) => {
    target = target;
    name = name;
    functions = functions;
    let event;

    return {target, name, functions, event};
};

const eventModule = (() => {

    let events = [];

    const createEvent = (event) => {
        events.push(event);
    };

    const assignEvents = () => {
        events.map(event => {
            event.target.addEventListener(event.name, e => {
                event.event = e;
                event.functions.map(eventFunction => eventFunction());
            });
        });
    };

    return {createEvent, assignEvents};
})();

export { eventModule, EventListener };