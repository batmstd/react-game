import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import Game from "./Game";

const rootElement = document.getElementById("root");
render(<Game />, rootElement);
