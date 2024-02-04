import FadeIn from "react-fade-in/lib/FadeIn";
import { formatAnswerOptions } from "../utils/formatAnswerOptions";
import { PRIMARY_COLOR } from "../utils/theme";

const data = [
  { label: '7-8', value: 41, count: 185 },
  { label: '8-9', value: 28, count: 152 },
  { label: '6-7', value: 19, count: 112 },
  { label: 'Över 8', value: 7, count: 112 },
  { label: '5-6', value: 4, count: 112 },
  { label: 'Under 5', value: 1, count: 112 },
];

export const Results = ({ question, answerOptionId }) => {

  const items = formatAnswerOptions(
    question.answer_options ?? [],
    question?.answers?.length ?? 0,
    true
  );

  const barStyle = {
    backgroundColor: '#E0E0E0',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '5px',
    fontSize: 'medium'
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: 'small',
    flex: 1
  };

  const rowStyle = {
    paddingBottom: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const valueStyle = {
    flex: 1,
    color: PRIMARY_COLOR,
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  };

  return <FadeIn>
     <div style={barStyle}>
      {items.map((item, index) => (
        <div key={item.id} style={rowStyle}>
          <span style={labelStyle}>{item.text}</span>
          <div style={{ ...valueStyle, color: answerOptionId === item.id ? "#1976D2" : 'black'}}>
            <span style={{ fontSize: 'smaller' }}>({item.amount})</span>&nbsp;<span style={{ fontWeight: 'bold' }}>{item.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  </FadeIn>
}