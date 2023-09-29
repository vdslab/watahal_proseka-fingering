"use client";
import React, { useEffect, useState, useRef } from "react";
import Slider from "@mui/material/Slider";
import { sliderClasses } from "@mui/base/Slider";

function valueLabelFormat(value) {
  const minute_second = 60;
  const minute = Math.floor(value / minute_second);
  const second = value % minute_second;
  const label = minute == 0 ? `${second}秒` : `${minute}分${second}秒`;
  return label;
}

const minDistance = 10;

export default function TimeSlider({
  playBtn,
  currentTime,
  max,
  setSeek,
  setPlayTimeState,
  playTimeState,
  YTPlayer,
}) {
  const [value, setValue] = useState([0, max]); //指定してる区間の秒数

  useEffect(() => {
    console.log(playBtn, flowSec);
  });

  //動画の長さをすぐにvalueへ
  useEffect(() => {
    setValue([0, max]);
  }, [max]);

  function handleTimeChange(e, newValue, activeThumb) {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      const leftValue = Math.min(newValue[0], value[1] - minDistance);
      setValue([leftValue, value[1]]);
      setSeek({ value: leftValue });
      setPlayTimeState({ ...playTimeState, current: leftValue });
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  }

  const marks = [
    {
      value: 0,
    },
  ];

  const [PlayMark, setPlayMark] = useState(0); //再生されてる目的の場所px
  const [stop, setStop] = useState(1); //停止再生
  const [PlayBack, setPlayBack] = useState(1); //戻る(1)再生(-1)の判断
  const [flowSec, setFlowSec] = useState(`${max}s`); //再生速度
  function calcPx(value) {
    return (value / max) * SliderWidth; //value[0]のpxを計算
  }

  //ループ処理
  const handleTransitionEnd = (event) => {
    setSeek({ value: value[0] });
    if (PlayBack == 1) {
      setPlayBack(PlayBack * -1);
      setPlayMark(calcPx(value[0]));
    } else {
      setPlayBack(PlayBack * -1);
      setPlayMark(calcPx(value[1]));
    }
  };

  //動画を止めた時の動作
  useEffect(() => {
    if (playBtn == 1) {
      setPlayMark(calcPx(value[1]));
    } else {
      setPlayMark(calcPx(currentTime));
      setFlowSec(`0s`);
    }
  }, [playBtn]);

  //sliderをいじった時の速度変化
  useEffect(() => setFlowSec(`${value[1] - value[0]}s`), [value]);
  //再生停止をいじった時の速度変化
  useEffect(() => setFlowSec(`${value[1] - currentTime}s`), [currentTime]);
  const [SliderWidth, setSliderWidth] = useState(0);

  //sliderの全長を算出(px)
  const elm = useRef(null);
  useEffect(() => {
    const { clientWidth, clientHeight } = elm.current;
    setSliderWidth(clientWidth);
  }, []);

  return (
    <>
      <Slider
        ref={elm}
        onTransitionEnd={handleTransitionEnd}
        color="secondary"
        sx={{
          "&.MuiSlider-markActive": {
            color: "primary",
          },

          [`& .${sliderClasses.mark}`]: {
            position: "absolute",
            color: "primary",
            width: "20px",
            height: "20px",
            borderRadius: "99%",
            top: "15%",
            transform: `translateX(${PlayMark - 10}px)`,
            transition: `transform ${PlayBack == 1 ? flowSec : "0.01s"} linear`,
          },

          [`& .${sliderClasses.markLabel}`]: {
            color: "primary",
          },
        }}
        getAriaLabel={() => "seek bar"}
        value={value}
        max={max}
        onChange={handleTimeChange}
        valueLabelDisplay="auto"
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        disableSwap
        marks={marks}
      />
    </>
  );
}
