import { useEffect, useState } from "react";
import { Results } from "./Results";
import { AnswerQuestion } from "./AnswerQuestion";
import { getLocalStorageItem } from "../utils/localstorage";

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
    { selectedAnswerOption ? <Results question={question} answerOptionId={selectedAnswerOption}></Results> : <AnswerQuestion onClick={(ao) => setSelectedAnswerOption(ao)} question={question} handleAnswer={refreshQuestion}></AnswerQuestion>}
  </div>
}