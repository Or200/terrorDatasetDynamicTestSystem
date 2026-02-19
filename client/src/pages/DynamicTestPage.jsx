import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DynamicTestPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerStatus, setAnswerStatus] = useState({
    style: NaN,
    msg: "",
  });

  const nextQuestion = () => {
    navigate("/test");
  };

  const backPage = () => {
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      const myData = await axios.get("http://localhost:3000/loadcsv");
      const random = Math.floor(Math.random() * 50);
      const randQuestion = myData.data[random];
      setQuestion(randQuestion);
    };
    getData();
  }, []);

  const goodAnswer = question.attacktype1_txt;

  const checkAnswer = () => {
    console.log(goodAnswer);

    if (answer === goodAnswer) {
      setAnswerStatus({
        style: { background: "green" },
        msg: `Good - Corect Answer is:${goodAnswer}`,
      });
      console.log(111);
    } else {
      setAnswerStatus({
        style: { background: "red" },
        msg: `Error - try again`,
      });
    }
  };

  return (
    <div>
      when Country = {question.country_txt} and Year = {question.iyear}, what is
      the Attack Type?
      <hr />
      Your Answer:
      <input type="text" onChange={(a) => setAnswer(a.target.value)} />
      <button onClick={checkAnswer}>Submit Answer</button>
      {/* {<p style={answerStatus.style}>{answerStatus.msg}</p>} */}
      <hr />
      <button onClick={backPage}>Back to data page </button>
      <button onClick={nextQuestion}>next question</button>
    </div>
  );
}

export default DynamicTestPage;
