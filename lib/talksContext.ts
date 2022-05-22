import React from 'react';
import { ITalk } from '../@types/generated/contentful';

const TalksContext = React.createContext<ITalk[] | undefined>(undefined);

export default TalksContext;
