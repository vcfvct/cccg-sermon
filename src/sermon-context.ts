import { createContext } from 'react';
import { PodCastMeta } from './types';

export const SermonContext = createContext<Array<PodCastMeta>>([]);
