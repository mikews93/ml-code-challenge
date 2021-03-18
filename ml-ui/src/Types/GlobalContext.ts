import React from 'react';
import { Toaster } from './Toaster';

export interface GlobalContext {
    showToaster: (data: Partial<Toaster>) => void;
    setIsFetchingData: React.Dispatch<React.SetStateAction<boolean>>
}