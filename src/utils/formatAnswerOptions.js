export const formatAnswerOptions = (
  answerOptions,
  answersLength,
  sort,
  hidePercentage
) => {
  const formatted = answerOptions
    .sort((a, b) =>
      sort ? (b.answers?.length ?? 0) - (a.answers?.length ?? 0) : 0
    )
    .map((ao) => ({
      percentage: hidePercentage
        ? null
        : answersLength && ao?.answers?.length
        ? calculatePercentage(answersLength, ao?.answers?.length)
        : 0,
      id: ao.id,
      text: ao.answer_title,
      amount: hidePercentage ? null : ao?.answers?.length ?? 0,
    }));
  return formatted;
};

export const calculatePercentage = (totalAmount, amount) => {
  return Math.round((amount / totalAmount) * 100)
}