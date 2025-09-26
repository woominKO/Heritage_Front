import React, { useState } from "react";
import MoveTypeForm from "./MoveTypeForm";
import MoveItemForm from "./MoveItemForm";

export default function App() {
  const [step, setStep] = useState(1);
  const [moveTypeData, setMoveTypeData] = useState(null);

  const handleMoveTypeNext = (data) => {
    setMoveTypeData(data);
    setStep(2);
  };

  const handleMoveItemNext = (items) => {
    // 다음 단계로 이동하거나, 데이터 저장 등 처리
    alert("선택된 항목: " + items.join(", "));
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div>
      {step === 1 && <MoveTypeForm onNext={handleMoveTypeNext} />}
      {step === 2 && (
        <MoveItemForm onNext={handleMoveItemNext} onBack={handleBack} />
      )}
    </div>
  );
}