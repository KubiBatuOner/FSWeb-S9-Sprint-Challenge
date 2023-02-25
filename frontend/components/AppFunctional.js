import React, { useState, useEffect } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [coordinates, setCoordinates] = useState({
    x: 2,
    y: 2,
  });
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);

  const [email, setEmail] = useState(initialEmail);

  function getXY() {
    if (coordinates.x === 1 && coordinates.y === 1) {
      setIndex(0);
    } else if (coordinates.x === 2 && coordinates.y === 1) {
      setIndex(1);
    } else if (coordinates.x === 3 && coordinates.y === 1) {
      setIndex(2);
    } else if (coordinates.x === 1 && coordinates.y === 2) {
      setIndex(3);
    } else if (coordinates.x === 2 && coordinates.y === 2) {
      setIndex(4);
    } else if (coordinates.x === 3 && coordinates.y === 2) {
      setIndex(5);
    } else if (coordinates.x === 1 && coordinates.y === 3) {
      setIndex(6);
    } else if (coordinates.x === 2 && coordinates.y === 3) {
      setIndex(7);
    } else if (coordinates.x === 3 && coordinates.y === 3) {
      setIndex(8);
    }
  }

  function getXYMesaj(event) {
    const { id } = event.target;
    if (id === "down" && coordinates.y < 3) {
      setCoordinates({ ...coordinates, y: coordinates.y + 1 });
      setSteps(steps + 1);
      setMessage(initialMessage);
    }
    if (id === "down" && coordinates.y >= 3) {
      setMessage("Aşağıya gidemezsiniz");
    }
    if (id === "up" && coordinates.y >= 2) {
      setCoordinates({ ...coordinates, y: coordinates.y - 1 });
      setSteps(steps + 1);
      setMessage(initialMessage);
    }
    if (id === "up" && coordinates.y <= 1) {
      setMessage("Yukarıya gidemezsiniz");
    }
    if (id === "right" && coordinates.x < 3) {
      setCoordinates({ ...coordinates, x: coordinates.x + 1 });
      setSteps(steps + 1);
      setMessage(initialMessage);
    }
    if (id === "right" && coordinates.x >= 3) {
      setMessage("Sağa gidemezsiniz");
    }
    if (id === "left" && coordinates.x >= 2) {
      setCoordinates({ ...coordinates, x: coordinates.x - 1 });
      setSteps(steps + 1);
      setMessage(initialMessage);
    }
    if (id === "left" && coordinates.x <= 1) {
      setMessage("Sola gidemezsiniz");
    }
  }

  function reset() {
    setCoordinates({
      x: 2,
      y: 2,
    });
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  useEffect(getXY, [coordinates]);

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const formData = {
      email: email,
      x: coordinates.x,
      y: coordinates.y,
      steps: steps,
    };
    axios
      .post("http://localhost:9000/api/result", formData)
      .then((response) => {
        setMessage(response.data.message);
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({coordinates.x}, {coordinates.y})
        </h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={getXYMesaj}>
          SOL
        </button>
        <button id="up" onClick={getXYMesaj}>
          YUKARI
        </button>
        <button id="right" onClick={getXYMesaj}>
          SAĞ
        </button>
        <button id="down" onClick={getXYMesaj}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
