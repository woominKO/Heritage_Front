import React, { useState } from "react";

const items = [
  { value: "bed", label: "침대" },
  { value: "desk", label: "책상" },
  { value: "sofa", label: "소파" },
  { value: "refrigerator", label: "냉장고" },
  { value: "washing_machine", label: "세탁기" },
];

export default function MoveItemForm({ onNext, onBack }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggle = (value) => {
    setSelectedItems((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleNext = () => {
    if (selectedItems.length > 0) {
      onNext(selectedItems);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>옮길 항목을 선택해주세요.</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "24px 0 0 0" }}>
        {items.map((item) => (
          <div
            key={item.value}
            onClick={() => handleToggle(item.value)}
            style={{
              padding: "14px 28px",
              borderRadius: 32,
              border: selectedItems.includes(item.value) ? "2px solid #4f6cff" : "1px solid #ddd",
              background: selectedItems.includes(item.value) ? "#e6f0ff" : "#f8f8f8",
              color: selectedItems.includes(item.value) ? "#2176ff" : "#222",
              fontWeight: selectedItems.includes(item.value) ? 700 : 400,
              fontSize: 16,
              marginBottom: 0,
              cursor: "pointer",
              minWidth: 100,
              textAlign: "center",
              transition: "all 0.18s",
              boxShadow: selectedItems.includes(item.value) ? "0 2px 8px rgba(33,118,255,0.08)" : "none",
              outline: "none",
              userSelect: "none"
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
      <button
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 8,
          border: "none",
          background: selectedItems.length > 0 ? "#4f6cff" : "#eee",
          color: selectedItems.length > 0 ? "#fff" : "#aaa",
          fontSize: 18,
          marginTop: 16,
          cursor: selectedItems.length > 0 ? "pointer" : "not-allowed",
        }}
        disabled={selectedItems.length === 0}
        onClick={handleNext}
      >
        다음
      </button>
      <button
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "none",
          background: "#eee",
          color: "#333",
          fontSize: 16,
          marginTop: 8,
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        이전
      </button>
    </div>
  );
}
