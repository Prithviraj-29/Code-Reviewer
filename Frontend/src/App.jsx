import { useState } from 'react';
import './App.css';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'

function App() {
  const [code, setCode] = useState(`// Write your code here\nconsole.log('Hello, World!');`);
  const [reviewedCode, setReviewedCode] = useState('Your reviewed code will appear here...');

  async function reviewCode() {
    try {
      const response = await axios.post('https://code-reviewer-dv26.onrender.com/ai/get-review', { code });
      setReviewedCode(response.data || 'No review available');
      console.log('Review Response:', response.data);
    } catch (error) {
      console.error('Error fetching code review:', error);
      setReviewedCode('Failed to get review. Please try again.');
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Code Review App</h1>
      </header>

      <main>
        <div className="editor-section">
          <h2>Your Code</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
        </div>

        <div className="review-section">
          <h2>Reviewed Code</h2>
          <div className="review-output">

            <ReactMarkdown>{reviewedCode}</ReactMarkdown>
          </div>
        </div>
      </main>

      <div className="actions">
        <button onClick={reviewCode}>Submit for Review</button>
      </div>
    </div>
  );
}

export default App;
