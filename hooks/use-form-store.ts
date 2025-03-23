"use client";

import { create } from 'zustand';
import { FormData } from '@/components/FormModal';

interface FormState {
  isFormOpen: boolean;
  lastFormSubmission: {
    data: FormData | null;
    timestamp: string | null;
  };
  setIsFormOpen: (isOpen: boolean) => void;
  setLastFormSubmission: (data: FormData) => void;
}

export const useFormStore = create<FormState>((set) => ({
  isFormOpen: false,
  lastFormSubmission: {
    data: null,
    timestamp: null,
  },
  setIsFormOpen: (isOpen: boolean) => set({ isFormOpen: isOpen }),
  setLastFormSubmission: (data: FormData) => set({ 
    lastFormSubmission: {
      data,
      timestamp: data.submittedAt || new Date().toISOString(),
    }
  }),
})); 