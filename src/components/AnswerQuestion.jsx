import FadeIn from "react-fade-in/lib/FadeIn";
import { setLocalStorageItem } from "../utils/localstorage"
import { Button } from "./ui/Button";
import { supabase } from "../utils/Api";

export const AnswerQuestion = ({ question, onClick, handleAnswer }) => {

  const answerQuestion = async (aoId) => {
    const params = {
      answer_option_id: aoId,
      question_id: question.id,
      feeling: "UNKNOWN",
      anonymous: true,
    }
    await supabase.from("answers").insert(params).select("id")
    handleAnswer();
  }

  return <FadeIn>
    { question.answer_options.map(ao => <div key={ao.id}>
      <div style={{ marginTop: '4px' }}>
      <Button
        onClick={() => {
          answerQuestion(ao.id);
          setLocalStorageItem(question.id, ao.id);
          onClick(ao.id);
        }}
        text={ao.answer_title}
      >
      </Button>
      </div>
    </div>) }
  </FadeIn>
}