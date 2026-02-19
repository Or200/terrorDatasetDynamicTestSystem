import React, { useEffect, useState } from "react";
import axios from "axios";

function DynamicTestPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    const getData = async () => {
      const myData = await axios.get("http://localhost:3000/loadcsv");
      const random = Math.floor(Math.random() * 50);
      const randQuestion = myData.data[random];
      setQuestion(randQuestion);
    };
    getData();
  }, []);

  const goodAnswer = question.attacktype1_txt

  const checkAnswer = (answer) => {
    if (answer === goodAnswer) {

    }
  }

  return (
    <div>
      when Country = {question.country_txt} and Year = {question.iyear}, what is
      the Attack Type?
      <hr />
      Your Answer:
      <input type="text" onChange={(a) => setAnswer(a.target.value, console.log(a.target.value))} />
      <button onClick={console.log(answer)}>Submit Answer</button>
      {/* {messageStatus.msg && <p className="">{messageStatus.msg}</p>} */}
      <hr />
      <button>Back to data page </button>
      <button></button>
    </div>
  );
}

export default DynamicTestPage;
