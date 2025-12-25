import {useLivesRemains} from "../data/hooks/useLivesRemains.js";

export const LivesRemainsCounter = () => {
    let {data: items} = useLivesRemains();

    if (!items) {
        items = 0;
    }

    return <div className="counter">
        <span className="lives-count">{items}</span>
    </div>
}