import FadeIn from "react-fade-in/lib/FadeIn";
import { formatAnswerOptions } from "../utils/formatAnswerOptions";
import { PRIMARY_COLOR } from "../utils/theme";
import { useEffect, useState } from "react";
import { supabase } from '../utils/Api';

export const PanelQuestions = ({ panelId }) => {
  const [panelQuestions, setPanelQuestions] = useState([]);

  useEffect(() => {
    fetchPanelQuestions();
  }, [panelId])

  const fetchPanelQuestions = async () => {
    const query = supabase
      .from("questions")
      .select(
        `
          title,
          published_date,
          description,
          id,
          path,
          link_url,
          vote_end_date,
          panel_id,
          profiles(id, username, avatar_url, verified, followers:user_relationships!target_user_id(id)),
          answers(id, user_id, answer_option_id),
          tags:question_tags(tags(id, name)),
          answer_options!question_id(id, answer_title, image_url, answers(id)),
          related:related_questions!question_id(id, questions!target_question_id(id,title,panels(id,image_url),answers(id,user_id),answer_options!question_id(id, answer_title, image_url, answers(id))))
        `
      )
      .eq('panel_id', window.mentoPanelId)
      
    const { data, statusText, error } = await query;

    if (data && data.length > 0) {
      setPanelQuestions(data);
    } else {
      console.log(statusText)
      console.log(error)
    }
  }

  return <FadeIn>
    { panelQuestions.map(question => {
      return <div>
        <span>{question.title}</span>
      </div>
    }) }
  </FadeIn>
}