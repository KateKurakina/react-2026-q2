import { create } from "zustand";
import type { FormSubmission } from "../types/form";

type FormStore = {
    submissions: FormSubmission[];

    addSubmission: (
        submission: FormSubmission
    ) => void;
};

export const useFormStore = create<FormStore>((set) => ({
    submissions: [],

    addSubmission: (submission) =>
        set((state) => ({
            submissions: [
                submission,
                ...state.submissions,
            ],
        })),
}));