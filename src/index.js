import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import MoveTypeForm from "./MoveTypeForm";
import MoveItemForm from "./MoveItemForm";

function RegionSelectForm({ onBack, onNext }) {
  const [region, setRegion] = useState("");
  const handleNext = () => {
    if (region) {
      onNext(region);
    }
  };
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>거주지역을 선택해주세요.</h3>
      <div style={{ display: "flex", gap: 12, margin: "32px 0 24px 0" }}>
        <div
          onClick={() => setRegion("안산")}
          style={{
            padding: "16px 36px",
            borderRadius: 32,
            border: region === "안산" ? "2px solid #4f6cff" : "1px solid #ddd",
            background: region === "안산" ? "#e6f0ff" : "#f8f8f8",
            color: region === "안산" ? "#2176ff" : "#222",
            fontWeight: region === "안산" ? 700 : 400,
            fontSize: 18,
            cursor: "pointer",
            minWidth: 100,
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
      <button
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 8,
          border: "none",
          background: region ? "#4f6cff" : "#eee",
          color: region ? "#fff" : "#aaa",
          fontSize: 18,
          marginTop: 16,
          cursor: region ? "pointer" : "not-allowed",
        }}
        disabled={!region}
        onClick={handleNext}
      >
        다음
      </button>
      <button
        style={{
          width: "100%",
          padding: 10,
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

function LoadingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#111"
    }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{
          width: 64,
          height: 64,
          border: "6px solid #2c2c2c",
          borderTop: "6px solid #f5d76e",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
      </div>
      <div style={{ fontSize: 22, color: "#f5d76e", fontWeight: 600, marginBottom: 10 }}>근처의 창고를 검색중이에요</div>
      <div style={{ fontSize: 15, color: "#f5d76e", opacity: 0.7 }}>잠시만 기다려주세요...</div>
    </div>
  );
}

function EstimateForm() {
  const [step, setStep] = useState(0);
  const [moveType, setMoveType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [appliances, setAppliances] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [departEnv, setDepartEnv] = useState([]);
  const [departDesc, setDepartDesc] = useState("");
  const [arriveEnv, setArriveEnv] = useState([]);
  const [arriveDesc, setArriveDesc] = useState("");
  const [situation, setSituation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const moveTypeOptions = [
    { value: "storage", label: "유산/상속 물품 보관" },
    { value: "family", label: "가정이사" },
    { value: "small", label: "소형이사" },
    { value: "office", label: "기업·사무실이사" },
  ];
  const serviceTypeOptions = [
    { value: "self", label: "셀프보관" },
    { value: "pack", label: "포장이사" },
    { value: "halfpack", label: "반포장이사" },
    { value: "normal", label: "일반이사" },
  ];
  const applianceOptions = [
    "TV/모니터", "냉장고", "김치냉장고", "세탁기", "건조기", "에어컨", "의류관리기", "안마의자",
    "전자레인지", "가스레인지/인덕션", "공기청정기", "청소기", "정수기", "비데", "운동용품", "PC/데스크탑", "기타"
  ];
  const furnitureOptions = [
    "침대 매트리스", "침대 프레임", "책상", "의자", "소파", "테이블", "수납장", "서랍장", "책장", "옷장", "행거", "화장대"
  ];
  const envOptions = ["엘리베이터 사용", "계단 사용", "사다리차 사용"];

  const handleToggle = (list, setList, value) => {
    setList(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  if (loading) return <LoadingPage />;
  if (submitted) {
    return (
      <div style={{ maxWidth: 420, margin: "0 auto", padding: 32, textAlign: "center", fontFamily: "sans-serif", background: "#111", color: "#f5d76e", minHeight: "100vh" }}>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 18 }}>견적 요청이 접수되었습니다!</div>
        <div style={{ color: "#f5d76e", fontSize: 16, marginBottom: 30, opacity: 0.8 }}>
          입력하신 정보를 바탕으로 빠르게 연락드릴게요.<br />
          감사합니다.
        </div>
      </div>
    );
  }

  const logoHeader = (
    <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "38px 0 18px 0", justifyContent: "center" }}>
      <img src="/logo.png" alt="logo" style={{ height: 54, width: 54, objectFit: "contain" }} />
      <span style={{ fontFamily: 'cursive', fontSize: 34, color: "#f5d76e", fontWeight: 600, letterSpacing: 1 }}>Noble Heritage</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#111" }}>
      {logoHeader}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: 32,
          fontFamily: "sans-serif",
          color: "#f5d76e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {step === 0 && (
          <>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: "#f5d76e", textAlign: "center" }}>
              안녕하세요!<br />이사나 보관 서비스를 원하시면,<br />아래 항목을 입력해 주세요!
            </div>
            <div style={{ marginBottom: 24, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>1. 어느 유형의 이사를 계획하고 계신가요?</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {moveTypeOptions.map(opt => (
                  <div
                    key={opt.value}
                    onClick={() => setMoveType(opt.value)}
                    style={{
                      padding: "13px 24px",
                      borderRadius: 32,
                      border: moveType === opt.value ? "2px solid #f5d76e" : "1px solid #444",
                      background: moveType === opt.value ? "#f5d76e" : "#222",
                      color: moveType === opt.value ? "#222" : "#f5d76e",
                      fontWeight: moveType === opt.value ? 700 : 400,
                      fontSize: 15,
                      cursor: "pointer",
                      minWidth: 90,
                      textAlign: "center",
                      transition: "all 0.18s",
                      boxShadow: moveType === opt.value ? "0 2px 8px rgba(245,215,110,0.13)" : "none",
                      outline: "none",
                      userSelect: "none"
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={!moveType}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: moveType ? "#f5d76e" : "#444",
                color: moveType ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: moveType ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>2. 어떤 서비스가 적합할지 알려주세요!</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 24 }}>
              {serviceTypeOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => setServiceType(opt.value)}
                  style={{
                    padding: "13px 24px",
                    borderRadius: 32,
                    border: serviceType === opt.value ? "2px solid #f5d76e" : "1px solid #444",
                    background: serviceType === opt.value ? "#f5d76e" : "#222",
                    color: serviceType === opt.value ? "#222" : "#f5d76e",
                    fontWeight: serviceType === opt.value ? 700 : 400,
                    fontSize: 15,
                    cursor: "pointer",
                    minWidth: 90,
                    textAlign: "center",
                    transition: "all 0.18s",
                    boxShadow: serviceType === opt.value ? "0 2px 8px rgba(245,215,110,0.13)" : "none",
                    outline: "none",
                    userSelect: "none"
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={!serviceType}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: serviceType ? "#f5d76e" : "#444",
                color: serviceType ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: serviceType ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: "#f5d76e", border: "none", fontSize: 16, cursor: "pointer" }}>이전</button>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>2-1. 이사를 언제쯤 계획하고 계신가요?</div>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{
                padding: "11px 18px",
                borderRadius: 10,
                border: "1px solid #f5d76e",
                fontSize: 15,
                background: "#222",
                color: "#f5d76e",
                marginTop: 4,
                width: 180,
                marginBottom: 24
              }}
            />
            <button
              type="button"
              onClick={handleNext}
              disabled={!date}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: date ? "#f5d76e" : "#444",
                color: date ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: date ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: "#f5d76e", border: "none", fontSize: 16, cursor: "pointer" }}>이전</button>
          </>
        )}
        {step === 3 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>2-2. 옮길 가전제품 목록을 알려주세요!</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 400, marginBottom: 24 }}>
              {applianceOptions.map(opt => (
                <div
                  key={opt}
                  onClick={() => handleToggle(appliances, setAppliances, opt)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 32,
                    border: appliances.includes(opt) ? "2px solid #f5d76e" : "1px solid #444",
                    background: appliances.includes(opt) ? "#f5d76e" : "#222",
                    color: appliances.includes(opt) ? "#222" : "#f5d76e",
                    fontWeight: appliances.includes(opt) ? 700 : 400,
                    fontSize: 14,
                    cursor: "pointer",
                    minWidth: 60,
                    textAlign: "center",
                    marginBottom: 4,
                    transition: "all 0.18s",
                    boxShadow: appliances.includes(opt) ? "0 2px 8px rgba(245,215,110,0.13)" : "none",
                    outline: "none",
                    userSelect: "none"
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={appliances.length === 0}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: appliances.length > 0 ? "#f5d76e" : "#444",
                color: appliances.length > 0 ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: appliances.length > 0 ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: "#f5d76e", border: "none", fontSize: 16, cursor: "pointer" }}>이전</button>
          </>
        )}
        {step === 4 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>2-3. 옮길 가구 목록을 알려주세요!</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 400, marginBottom: 24 }}>
              {furnitureOptions.map(opt => (
                <div
                  key={opt}
                  onClick={() => handleToggle(furniture, setFurniture, opt)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 32,
                    border: furniture.includes(opt) ? "2px solid #f5d76e" : "1px solid #444",
                    background: furniture.includes(opt) ? "#f5d76e" : "#222",
                    color: furniture.includes(opt) ? "#222" : "#f5d76e",
                    fontWeight: furniture.includes(opt) ? 700 : 400,
                    fontSize: 14,
                    cursor: "pointer",
                    minWidth: 60,
                    textAlign: "center",
                    marginBottom: 4,
                    transition: "all 0.18s",
                    boxShadow: furniture.includes(opt) ? "0 2px 8px rgba(245,215,110,0.13)" : "none",
                    outline: "none",
                    userSelect: "none"
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={furniture.length === 0}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: furniture.length > 0 ? "#f5d76e" : "#444",
                color: furniture.length > 0 ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: furniture.length > 0 ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: "#f5d76e", border: "none", fontSize: 16, cursor: "pointer" }}>이전</button>
          </>
        )}
        {step === 5 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>2-4. 출발지는 어떤 환경인가요?</div>
            <input
              type="text"
              value={departDesc}
              onChange={e => setDepartDesc(e.target.value)}
              placeholder="출발지 주소/특이사항"
              style={{
                width: "100%",
                padding: "11px 16px",
                borderRadius: 10,
                border: "1px solid #f5d76e",
                fontSize: 15,
                marginBottom: 8,
                background: "#222",
                color: "#f5d76e"
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 400, marginBottom: 24 }}>
              {envOptions.map(opt => (
                <div
                  key={opt}
                  onClick={() => handleToggle(departEnv, setDepartEnv, opt)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 32,
                    border: departEnv.includes(opt) ? "2px solid #f5d76e" : "1px solid #444",
                    background: departEnv.includes(opt) ? "#f5d76e" : "#222",
                    color: departEnv.includes(opt) ? "#222" : "#f5d76e",
                    fontWeight: departEnv.includes(opt) ? 700 : 400,
                    fontSize: 14,
                    cursor: "pointer",
                    minWidth: 60,
                    textAlign: "center",
                    marginBottom: 4,
                    transition: "all 0.18s",
                    boxShadow: departEnv.includes(opt) ? "0 2px 8px rgba(245,215,110,0.13)" : "none",
                    outline: "none",
                    userSelect: "none"
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={!departDesc || departEnv.length === 0}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: departDesc && departEnv.length > 0 ? "#f5d76e" : "#444",
                color: departDesc && departEnv.length > 0 ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: departDesc && departEnv.length > 0 ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: "#f5d76e", border: "none", fontSize: 16, cursor: "pointer" }}>이전</button>
          </>
        )}
        {step === 6 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>2-5. 도착지는 어떤 환경인가요?</div>
            <input
              type="text"
              value={arriveDesc}
              onChange={e => setArriveDesc(e.target.value)}
              placeholder="도착지 주소/특이사항"
              style={{
                width: "100%",
                padding: "11px 16px",
                borderRadius: 10,
                border: "1px solid #f5d76e",
                fontSize: 15,
                marginBottom: 8,
                background: "#222",
                color: "#f5d76e"
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 400, marginBottom: 24 }}>
              {envOptions.map(opt => (
                <div
                  key={opt}
                  onClick={() => handleToggle(arriveEnv, setArriveEnv, opt)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 32,
                    border: arriveEnv.includes(opt) ? "2px solid #f5d76e" : "1px solid #444",
                    background: arriveEnv.includes(opt) ? "#f5d76e" : "#222",
                    color: arriveEnv.includes(opt) ? "#222" : "#f5d76e",
                    fontWeight: arriveEnv.includes(opt) ? 700 : 400,
                    fontSize: 14,
                    cursor: "pointer",
                    minWidth: 60,
                    textAlign: "center",
                    marginBottom: 4,
                    transition: "all 0.18s",
                    boxShadow: arriveEnv.includes(opt) ? "0 2px 8px rgba(245,215,110,0.13)" : "none",
                    outline: "none",
                    userSelect: "none"
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={!arriveDesc || arriveEnv.length === 0}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: arriveDesc && arriveEnv.length > 0 ? "#f5d76e" : "#444",
                color: arriveDesc && arriveEnv.length > 0 ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: arriveDesc && arriveEnv.length > 0 ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: "#f5d76e", border: "none", fontSize: 16, cursor: "pointer" }}>이전</button>
          </>
        )}
        {step === 7 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center" }}>3. 현장 상황을 간단하게 알려주세요!</div>
            <input
              type="text"
              value={situation}
              onChange={e => setSituation(e.target.value)}
              placeholder="출발지·도착지 대략 위치 입력 (예: 서울 강남구 → 경기 수원시)"
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 10,
                border: "1px solid #f5d76e",
                fontSize: 15,
                marginTop: 4,
                background: "#222",
                color: "#f5d76e",
                marginBottom: 24
              }}
            />
            <button
              type="submit"
              disabled={!situation}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                border: "none",
                background: situation ? "#f5d76e" : "#444",
                color: situation ? "#222" : "#aaa",
                fontSize: 18,
                marginTop: 8,
                cursor: situation ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              간단 견적 요청하기
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: "#f5d76e", border: "none", fontSize: 16, cursor: "pointer" }}>이전</button>
          </>
        )}
      </form>
    </div>
  );
}

function App() {
  return <EstimateForm />;
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
