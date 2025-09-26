import React, { useState } from "react";

const options = [
  { value: "family", label: "가정이사 (투룸 이상)" },
  { value: "small", label: "소형이사 (원룸)" },
  { value: "heritage", label: "유산상속/보관" },
  { value: "storage", label: "보관이사 (이삿짐 보관)" },
];

export default function MoveTypeForm({ onNext }) {
  const [selected, setSelected] = useState(null);
  const [region, setRegion] = useState("");

  const handleNext = () => {
    if (selected === "heritage") {
      if (region) {
        onNext({ type: selected, region });
      }
    } else if (selected) {
      onNext({ type: selected });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>이사 종류를 선택해주세요.</h3>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        margin: "24px 0 0 0"
      }}>
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            style={{
              padding: "14px 28px",
              borderRadius: 32,
              border: selected === opt.value ? "2px solid #4f6cff" : "1px solid #ddd",
              background: selected === opt.value ? "#e6f0ff" : "#f8f8f8",
              color: selected === opt.value ? "#2176ff" : "#222",
              fontWeight: selected === opt.value ? 700 : 400,
              fontSize: 16,
              marginBottom: 0,
              cursor: "pointer",
              minWidth: 120,
              textAlign: "center",
              transition: "all 0.18s",
              boxShadow: selected === opt.value ? "0 2px 8px rgba(33,118,255,0.08)" : "none",
              outline: "none",
              userSelect: "none"
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>

      {/* heritage 선택 시 지역 선택 버블 표시 */}
      {selected === "heritage" && (
        <div style={{ marginTop: 18, marginBottom: 8 }}>
          <div style={{ marginBottom: 8, fontSize: 15, color: "#444" }}>거주 지역을 선택하세요:</div>
          <div style={{ display: "flex", gap: 12 }}>
            <div
              onClick={() => setRegion("안산")}
              style={{
                padding: "13px 32px",
                borderRadius: 32,
                border: region === "안산" ? "2px solid #4f6cff" : "1px solid #ddd",
                background: region === "안산" ? "#e6f0ff" : "#f8f8f8",
                color: region === "안산" ? "#2176ff" : "#222",
                fontWeight: region === "안산" ? 700 : 400,
                fontSize: 16,
                cursor: "pointer",
                minWidth: 80,
                textAlign: "center",
                transition: "all 0.18s",
                boxShadow: region === "안산" ? "0 2px 8px rgba(33,118,255,0.08)" : "none",
                outline: "none",
                userSelect: "none"
              }}
            >
              안산
            </div>
          </div>
        </div>
      )}

      <button
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 8,
          border: "none",
          background:
            selected && (selected !== "heritage" || region)
              ? "#4f6cff"
              : "#eee",
          color:
            selected && (selected !== "heritage" || region)
              ? "#fff"
              : "#aaa",
          fontSize: 18,
          marginTop: 32,
          cursor:
            selected && (selected !== "heritage" || region)
              ? "pointer"
              : "not-allowed",
        }}
        disabled={!selected || (selected === "heritage" && !region)}
        onClick={handleNext}
      >
        다음
      </button>
    </div>
  );
}
