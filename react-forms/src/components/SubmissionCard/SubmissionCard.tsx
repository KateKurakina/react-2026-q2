import { useEffect } from "react";

import { useFormStore } from "../../store/useFormStore";

import type { FormSubmission } from "../../types/form";

import styles from './SubmissionCard.module.css'

type Props = {
    submission: FormSubmission;
}

export default function SubmissionCard({
    submission,
}: Props) {
    const clearNewFlag = useFormStore((state) => state.clearNewFlag);

    useEffect(() => {
        if (!submission.isNew) return;

        const timeout = setTimeout(() => {
            clearNewFlag(submission.id);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [
        submission.id,
        submission.isNew,
        clearNewFlag,
    ]);

    return (
        <article
        className={submission.isNew ? `${styles.card} ${styles.cardNew}` : styles.card}
        >
            <h3>{submission.name}</h3>

            <p>Age: {submission.age}</p>

            <p>Email: {submission.email}</p>

            <p>Gender: {submission.gender}</p>

            <p>Country: {submission.country}</p>

            <img
                src={submission.image}
                alt={submission.name}
                width={120}
            />
        </article>
    )
}