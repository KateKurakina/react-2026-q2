import { useState } from 'react'
import Modal from './components/Modal/Modal'
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import { useFormStore } from './store/useFormStore';
import './App.css'

function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);

  const [isRhfOpen, setIsRhfOpen] = useState(false);

  const submissions = useFormStore((state) => state.submissions);

  return (
    <main>
      <h1>React Forms</h1>

      <button
      type="button"
      onClick={() => setIsUncontrolledOpen(true)}
      >
        Open Uncontrolled Form
      </button>

      <button
      type="button"
      onClick={() => setIsRhfOpen(true)}
      >
        Open React Hook Form
      </button>

      <Modal
      isOpen={isUncontrolledOpen}
      onClose={() => setIsUncontrolledOpen(false)}
      >
        <UncontrolledForm/>
      </Modal>

      <Modal
      isOpen={isRhfOpen}
      onClose={() => setIsRhfOpen(false)}
      >
        <h2>React Hook Form</h2>

      </Modal>

       <section>
        <h2>Submissions</h2>

        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          <div>
            {submissions.map((submission) => (
              <article key={submission.id}>
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
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App
