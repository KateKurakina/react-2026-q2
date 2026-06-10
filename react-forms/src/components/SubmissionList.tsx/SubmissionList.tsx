import { useFormStore } from "../../store/useFormStore";

import SubmissionCard from "../SubmissionCard/SubmissionCard";

export default function SubmissionsList() {
    const submissions = useFormStore((state) => state.submissions);

    if (submissions.length === 0) return <p>No submissions yet</p>;

    return (
        <section>
            {submissions.map((submission) => (
                <SubmissionCard
                key={submission.id}
                submission={submission}
                />
            ))}
        </section>
    );
}