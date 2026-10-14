
import { useState } from "react";
import "./App.css";

const initialQuestions = [
  { id: 1, label: "Question 1", maxMarks: 10 },
  { id: 2, label: "Question 2", maxMarks: 15 },
  { id: 3, label: "Question 3", maxMarks: 20 },
  { id: 4, label: "Question 4", maxMarks: 25 },
];

function App() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState(
    initialQuestions.map((q) => ({ ...q, marks: "", error: "" }))
  );
  const [submitted, setSubmitted] = useState(false);

  const totalMarks = questions.reduce((sum, q) => {
    if (q.marks === "") return sum;
    const value = Number(q.marks);
    return Number.isNaN(value) ? sum : sum + value;
  }, 0);

  const handleMarksChange = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;

        if (value === "") {
          return { ...q, marks: "", error: "" };
        }

        const numeric = Number(value);
        let error = "";

        if (Number.isNaN(numeric) || numeric < 0 || numeric > q.maxMarks) {
          error = `Marks should be between 0 and ${q.maxMarks}.`;
        }

        return { ...q, marks: value, error };
      })
    );

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQuestions = questions.map((q) => {
      if (q.marks === "") {
        return { ...q, error: "Please enter marks for this question." };
      }

      const numeric = Number(q.marks);
      if (Number.isNaN(numeric) || numeric < 0 || numeric > q.maxMarks) {
        return {
          ...q,
          error: `Marks should be between 0 and ${q.maxMarks}.`,
        };
      }

      return { ...q, error: "" };
    });

    setQuestions(updatedQuestions);

    const isValid = updatedQuestions.every((q) => q.error === "");
    if (isValid) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setSubject("");
    setQuestions(initialQuestions.map((q) => ({ ...q, marks: "", error: "" })));
    setSubmitted(false);
  };

  return (
    <div className="marks-app">
      <h1>Faculty Marks Entry</h1>

      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            placeholder="Enter subject name"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Max Marks</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>{q.label}</td>
                <td>{q.maxMarks}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={q.maxMarks}
                    step="1"
                    value={q.marks}
                    onChange={(e) => handleMarksChange(q.id, e.target.value)}
                  />
                  {q.error && <div className="error-message">{q.error}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-box">
          <strong>Total Marks: {totalMarks}</strong>
        </div>

        {submitted && (
          <div className="success-message">
            {subject ? `${subject} marks submitted successfully.` : "Marks submitted successfully."}
          </div>
        )}

        <div className="button-row">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;

