import { createStore } from "redux";
import rootRed from "./redux/reducers/Main";
const store = createStore(
    rootRed
);

export default store