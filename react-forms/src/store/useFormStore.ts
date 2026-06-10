import { create } from "zustand";
import type { FormSubmission } from "../types/form";

type CreateSubmission = Omit<FormSubmission, 'id' | 'createdAt'>;

type FormStore = {
    submissions: FormSubmission[];

    countries: string[];

    addSubmission: (data: CreateSubmission) => void;

    clearNewFlag: (id: string) => void;
};

export const useFormStore = create<FormStore>((set) => ({
    submissions: [],

    countries: [
        'Germany',
        'Poland',
        'Italy',
        'Spain',
        'England',
        'Russia'
    ],

    addSubmission: (data: CreateSubmission) =>
        set((state) => ({
            submissions: [
                {
                    ...data,
                    id: crypto.randomUUID(),
                    createdAt: Date.now(),
                    isNew: true,
                },
                ...state.submissions,                
            ],
        })),

    clearNewFlag: (id) =>
        set((state) => ({
            submissions: state.submissions.map((item) =>
                item.id === id ? { ...item, isNew: false } : item
            ),
        })),
}));