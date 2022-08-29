import { useContext, useState } from "react";
import { Context } from "../context/globalContext";

const AddEditAnswer = ({
  questionID,
  setAnswers,
  text = "",
  shortText = "",
  nextQuestion = null,
  id,
  toggleEditAnswer,
}) => {
  const [answerText, setAnswerText] = useState(text);
  const [shortAnswerText, setShortAnswerText] = useState(shortText);
  const [answerNextQuestion, setAnswerNextQuestion] = useState(nextQuestion);
  const [state, dispatch] = useContext(Context);
  const handleSubmitAnswer = () => {
    if (typeof setAnswers === "function") {
      setAnswers((prevState) => {
        if (prevState.some((answer) => answer.id === id)) {
          return [
            ...prevState.filter((answer) => !(answer.id === id)),
            {
              id,
              text: answerText,
              next_question: answerNextQuestion
                ? Number(answerNextQuestion)
                : null,
              short_name: shortAnswerText,
            },
          ];
        }
        return [
          ...prevState,
          {
            id: new Date().valueOf(),
            text: answerText,
            next_question: answerNextQuestion
              ? Number(answerNextQuestion)
              : null,
            short_name: shortAnswerText,
          },
        ];
      });
    } else if (id) {
      dispatch({
        type: "edit-answer",
        payload: {
          id: questionID,
          answer: {
            id,
            text: answerText,
            next_question: answerNextQuestion
              ? Number(answerNextQuestion)
              : null,
            short_name: shortAnswerText,
          },
        },
      });
    } else {
      dispatch({
        type: "create-answer",
        payload: {
          id: questionID,
          answer: {
            id: new Date().valueOf(),
            text: answerText,
            next_question: answerNextQuestion
              ? Number(answerNextQuestion)
              : null,
            short_name: shortAnswerText,
          },
        },
      });
    }
    // typeof toggleEditAnswer === "function" ? toggleEditAnswer(false) : null;
    setAnswerText("");
    setAnswerNextQuestion("");
    setShortAnswerText("");
  };

  return (
    <div class='flex'>
      <div class=''>
        <label class='form-label' for='input-example-1'>
          Answer Text
        </label>
        <input
          className='border px-2 py-2  border-slate-400 mr-2'
          type='text'
          value={answerText}
          onChange={(e) => {
            setAnswerText(e.target.value);
          }}
          id='input-example-1'
          placeholder='Enter your question'
        />
      </div>
      <div class='column col-2 form-group'>
        <label class='form-label' for='input-example-1'>
          Short Text
        </label>
        <input
         className='border px-2 py-2  border-slate-400 mr-2'
          type='text'
          value={shortAnswerText}
          onChange={(e) => {
            setShortAnswerText(e.target.value);
          }}
          id='input-example-1'
          placeholder=''
        />
      </div>
      <div class='column col-3 form-group'>
        <label class='form-label' for='input-example-1'>
          Next Question
        </label>
        <select
          class='border  py-2 border-slate-400 mr-2'
          value={answerNextQuestion}
          onChange={(e) => setAnswerNextQuestion(e.target.value)}>
          <option>-- next question default --</option>
          {state.diagnosticquestion_set
            .filter((obj) => !(obj.id === questionID))
            .map(({ text, id }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
        </select>
      </div>
      <button
        class='px-2 button-styling'
        onClick={handleSubmitAnswer}>
        Save
      </button>
    </div>
  );
};

export default AddEditAnswer;
