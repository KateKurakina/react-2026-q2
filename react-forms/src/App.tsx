import { useState } from 'react'
import Modal from './components/Modal/Modal'
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import SubmissionsList from './components/SubmissionList.tsx/SubmissionList';
import './App.css'

function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);

  const [isRhfOpen, setIsRhfOpen] = useState(false);

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

      <SubmissionsList/>
    </main>
  );
}

export default App
