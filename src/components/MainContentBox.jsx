import { useEffect, useState } from "react";
import { Results } from "./Results";
import { AnswerQuestion } from "./AnswerQuestion";
import { getLocalStorageItem } from "../utils/localstorage";
import { PanelQuestions } from "./PanelQuestions";

export const MainContentBox = ({ question, refreshQuestion }) => {
  const [selectedAnswerOption, setSelectedAnswerOption] = useState(null);

  const updateSelectedAnswerOption = () => {
    const answerOption = getLocalStorageItem(question.id);
    setSelectedAnswerOption(answerOption ?? null);
  }

  useEffect(() => {
    updateSelectedAnswerOption();
  }, [question])
  
  return <div>
    {/* Todo: Add cross */}
    <div style={{ marginBottom: '8px', marginTop: '8px' }}>
      <span style={{ fontSize: 'medium' }}>{ question.title }</span>
    </div>
    { selectedAnswerOption ? 
      <div>
        <Results question={question} answerOptionId={selectedAnswerOption}></Results>
        <PanelQuestions panelId={question.panelId} questionId={question.id}></PanelQuestions>
      </div> : <AnswerQuestion onClick={(ao) => setSelectedAnswerOption(ao)} question={question} handleAnswer={refreshQuestion}></AnswerQuestion>
    }
  </div>
}