
import { createContext, useReducer } from "react";
import FormSchema from "../form_schema";

export const Context = createContext();

const Provider = ({ children }) => {
  const reducer = (state, action) => {
    if (action.type === "edit-answer") {
        return {
          diagnosticquestion_set: [
            ...state.diagnosticquestion_set.reduce((acc, obj) => {
              if (obj.id === action.payload.id) {
                return [
                  ...acc,
                  {
                    ...obj,
                    answer_to_question: [
                      ...obj.answer_to_question.reduce((acc, obj) => {
                        if (obj.id === action.payload.answer.id) {
                          return [...acc, { ...action.payload.answer }];
                        }
                        return [...acc, obj];
                      }, []),
                    ],
                  },
                ];
              }
              return [...acc, { ...obj }];
            }, []),
          ],
        };
      }else if (action.type === "edit") {
        return {
          diagnosticquestion_set: [
            ...state.diagnosticquestion_set.reduce((acc, obj) => {
              if (obj.id === action.payload.id) {
                return [...acc, { ...action.payload }];
              }
              return [...acc, { ...obj }];
            }, []),
          ],
        };
      }  else if (action.type === "create-question") {
      return {
        diagnosticquestion_set: [
          ...state.diagnosticquestion_set,
          { ...action.payload },
        ],
      };
    } else if (action.type === "create-answer") {
      const selectedQuestion = state.diagnosticquestion_set
        .filter((question) => question.id === action.payload.id)
        .pop();
      return {
        diagnosticquestion_set: [
          ...state.diagnosticquestion_set.filter(
            (question) => !(question.id === action.payload.id)
          ),
          {
            ...selectedQuestion,
            answer_to_question: [
              ...selectedQuestion.answer_to_question,
              action.payload.answer,
            ],
          },
        ],
      };
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, FormSchema);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Provider;
