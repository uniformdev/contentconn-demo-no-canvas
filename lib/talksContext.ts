import React from "react";
import { ITalk } from "./contentstack";

const TalksContext = React.createContext<ITalk[] | undefined>(undefined);

export default TalksContext;
