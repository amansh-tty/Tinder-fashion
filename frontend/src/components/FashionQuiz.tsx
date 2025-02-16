// import { useState } from "react";
// import { storeQuizAnswers } from "../utils/storage"

// const questions = [
//   { id: "1", text: "What's your preferred style?", options: ["Casual", "Formal", "Streetwear"] },
//   { id: "2", text: "What colors do you like?", options: ["Bright", "Neutral", "Dark"] },
//   { id: "3", text: "What's your budget range?", options: ["<$50", "$50-$100", "$100+"] },
// ];

// const FashionQuiz = () => {
//   const [answers, setAnswers] = useState<Record<string, string>>({});

//   const handleSelect = (questionId: string, answer: string) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: answer }));
//   };

//   const handleSubmit = () => {
//     storeQuizAnswers(answers);
//     alert("Quiz submitted! Your preferences are saved.");
//   };

//   return (
//     <div>
//       <h2>Fashion Quiz</h2>
//       {questions.map((q) => (
//         <div key={q.id}>
//           <p>{q.text}</p>
//           {q.options.map((opt) => (
//             <button key={opt} onClick={() => handleSelect(q.id, opt)}>
//               {opt}
//             </button>
//           ))}
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default FashionQuiz;
