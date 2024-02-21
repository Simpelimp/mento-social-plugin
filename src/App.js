import { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import './App.css';
import { MainContentBox } from './components/MainContentBox';
import { supabase } from './utils/Api';

const iconSize = 75;
const windowWidth = 250;


function App() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [displayBox, setDisplayBox] = useState(true);


  
  // Todo: Fetch question with current url. If question does not exist, return null
  // useEffect(() => {
  //   fetchQuestion("https://www.dn.se/sport/matchguide-osterrike-sverige/")
  // }, [])

  const fetchQuestionFromCurrentURL = () => {
    fetchQuestion(window.location.href);
  };

  useEffect(() => {
    fetchQuestionFromCurrentURL();
  
    // Listen for URL changes
    window.addEventListener('popstate', fetchQuestionFromCurrentURL);
  
    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', fetchQuestionFromCurrentURL);
    };
  }, []);

  const fetchQuestion = async (url) => {
    const parsedUrl = new URL(url);
    const formattedUrl = parsedUrl.hostname + parsedUrl.pathname;
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
      .like("link_url", `%${formattedUrl}%`)

    if (window.mentoPanelId) {
      query.eq('panel_id', window.mentoPanelId);
    }
      
    const { data, statusText, error } = await query;

    if (data && data.length > 0) {
      setActiveQuestion(data[0]);
    } else {
      console.log(statusText)
      console.log(error)
    }
  }
  
  return <FadeIn delay={200} visible={activeQuestion}>
      { activeQuestion && (<div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 2000, fontFamily: 'Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif', fontSize: 'small' }}>
        <div onClick={() => setDisplayBox(!displayBox)} style={{ backgroundColor: '#223C8E', width: `${iconSize}px`, height: `${iconSize}px`, borderRadius: '50px' }}>
          <img src="https://gyrstiqzamltthbjartl.supabase.co/storage/v1/object/public/website/widget-icon.png?t=2024-02-07T07%3A38%3A31.642Z" alt="Widget Icon" style={{ width: '100%', height: '100%' }} />
        </div>
        <FadeIn visible={displayBox}>
          <div style={{ position: 'absolute', backgroundColor: 'white', height: `auto`, width: `${windowWidth}px`, bottom: `${iconSize + 10}px`, left: `-${windowWidth - (iconSize + 10)}px`, boxSizing: 'border-box', padding: '8px', boxShadow: '0px 0px 10px -5px black', borderRadius: '8px' }}>
            <MainContentBox question={activeQuestion} refreshQuestion={fetchQuestionFromCurrentURL}></MainContentBox>
          </div>
        </FadeIn>
      </div>)}
    </FadeIn>;
}

export default App;
