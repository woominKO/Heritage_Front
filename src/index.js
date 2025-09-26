import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import MoveTypeForm from "./MoveTypeForm";
import MoveItemForm from "./MoveItemForm";

function LoadingPage({ onFinish }) {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    let t2;
    if (phase === 1) {
      t2 = setTimeout(() => { if (onFinish) onFinish(); }, 4000);
    }
    return () => { clearTimeout(t1); if (t2) clearTimeout(t2); };
  }, [phase, onFinish]);
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
      {phase === 0 ? (
        <>
          <div style={{ fontSize: 22, color: "#f5d76e", fontWeight: 600, marginBottom: 10 }}>근처의 창고를 검색중이에요</div>
          <div style={{ fontSize: 15, color: "#f5d76e", opacity: 0.7 }}>잠시만 기다려주세요...</div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 22, color: "#f5d76e", fontWeight: 600, marginBottom: 10 }}>해당 창고의 재고를 확인하고 있어요</div>
          <div style={{ fontSize: 15, color: "#f5d76e", opacity: 0.7 }}>조금만 더 기다려주세요...</div>
        </>
      )}
    </div>
  );
}

function EstimateForm() {
  const [step, setStep] = useState(0);
  const [moveType, setMoveType] = useState("");
  const [serviceType, setServiceType] = useState("");
  // const [date, setDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [appliances, setAppliances] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [departEnv, setDepartEnv] = useState([]);
  const [departDesc, setDepartDesc] = useState("");
  const [arriveEnv, setArriveEnv] = useState([]);
  const [arriveDesc, setArriveDesc] = useState("");
  const [situation, setSituation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);

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

  // 날짜 스텝(2-1) 제거: 0(유형)→1(서비스)→2(가전)→3(가구)→4(출발)→5(도착)
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

  if (loading) return <LoadingPage onFinish={() => setLoading(false)} />;
  if (showReview) {
    // 후기/리뷰 이미지 샘플 (6개)
    // review2~review6.png로 교체
    const reviewImages = [
      "/review2.png",
      "/review3.png",
      "/review4.png",
      "/review5.png",
      "/review6.png"
    ];
    return (
      <div style={{ minHeight: "100vh", background: "#111", color: "#f5d76e", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <div style={{ maxWidth: 900, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 10 }}>
            
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, textAlign: "center" }}>
            만약 고민이 되신다면,<br />저희 노블스토리지 이용 고객님들의 생생한 후기와<br />서비스 경험담을 확인해보시면 도움이 될 거예요!
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            margin: "0 auto",
            maxWidth: 720,
            marginBottom: 32
          }}>
            {reviewImages.map((src, i) => (
              <div key={i} style={{ width: 200, height: 200, borderRadius: 20, overflow: "hidden", background: "#222", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={src} alt={`리뷰${i+1}`} style={{ width: 200, height: 200, objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
          <button
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 8,
              border: "none",
              background: "#f5d76e",
              color: "#222",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              marginTop: 10
            }}
            onClick={() => window.location.reload()}
          >
            다시 이어서 견적 요청하기
          </button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 18 }}>
            <a
              href="https://www.noblestorage.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f5d76e", fontWeight: 700, fontSize: 16, textDecoration: "underline" }}
            >
              노블스토리지 홈페이지 바로가기
            </a>
            <a
              href="https://blog.naver.com/noblestorage"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f5d76e", fontWeight: 700, fontSize: 16, textDecoration: "underline" }}
            >
              블로그 후기 더 보기
            </a>
          </div>
        </div>
      </div>
    );
  }
  if (submitted) {
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", padding: 32, textAlign: "center", fontFamily: "sans-serif", background: "#111", color: "#f5d76e", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 18 }}>견적 요청이 접수되었습니다!</div>
        <div style={{ color: "#f5d76e", fontSize: 16, marginBottom: 30, opacity: 0.8 }}>
          입력하신 정보를 바탕으로 빠르게 연락드릴게요.<br />
          감사합니다.
        </div>
        <div style={{ fontSize: 17, color: "#f5d76e", marginBottom: 18, marginTop: 10, fontWeight: 500 }}>
          이제 더 자세한 맞춤 견적을 위해<br />몇 가지 정보를 여쭤봐도 될까요?
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", width: "100%", marginBottom: 10 }}>
          <button
            style={{
              flex: 1,
              padding: "14px 0",
              borderRadius: 8,
              border: "none",
              background: "#f5d76e",
              color: "#222",
              fontSize: 17,
              fontWeight: 700,
              cursor: "pointer"
            }}
            onClick={() => window.location.reload()}
          >
            바로 견적 이어서 진행하기
          </button>
          <button
            style={{
              flex: 1,
              padding: "14px 0",
              borderRadius: 8,
              border: "none",
              background: "#222",
              color: "#f5d76e",
              fontSize: 17,
              fontWeight: 700,
              cursor: "pointer",
              borderColor: "#f5d76e",
              borderWidth: 2,
              borderStyle: "solid"
            }}
            onClick={() => setShowReview(true)}
          >
            고민해볼게요
          </button>
        </div>
      </div>
    );
  }

  // 첫 페이지(스텝0)용 로고/테마
  const logo2Header = (
    <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "38px 0 18px 0", justifyContent: "center" }}>
      <img src="/logo2.png" alt="logo2" style={{ height: 60, width: 60, objectFit: "contain" }} />
      <span style={{ fontFamily: 'cursive', fontSize: 34, color: "#2176ff", fontWeight: 600, letterSpacing: 1 }}>Noble Storage</span>
    </div>
  );
  // 헤리티지(노랑/검정) 테마 로고
  const logoHeader = (
    <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "38px 0 18px 0", justifyContent: "center" }}>
      <img src="/logo.png" alt="logo" style={{ height: 54, width: 54, objectFit: "contain" }} />
      <span style={{ fontFamily: 'cursive', fontSize: 34, color: "#f5d76e", fontWeight: 600, letterSpacing: 1 }}>Noble Heritage</span>
    </div>
  );

  // 첫 페이지(스텝0) - 흰/파랑 테마, 이후(헤리티지) - 검정/노랑 테마
  const isFirstPage = step === 0;
  const isHeritage = moveType === "storage";
  const mainBg = isFirstPage ? "#fff" : "#111";
  const mainColor = isFirstPage ? "#2176ff" : "#f5d76e";
  const mainBtnBg = isFirstPage ? "#2176ff" : "#f5d76e";
  const mainBtnColor = isFirstPage ? "#fff" : "#222";
  const mainBtnDisabledBg = isFirstPage ? "#eee" : "#444";
  const mainBtnDisabledColor = isFirstPage ? "#aaa" : "#aaa";
  const mainCardBg = isFirstPage ? "#f8faff" : "#222";
  const mainCardBorder = isFirstPage ? "1px solid #b5d0ff" : "1px solid #444";
  const mainCardActiveBorder = isFirstPage ? "2px solid #2176ff" : "2px solid #f5d76e";
  const mainCardActiveBg = isFirstPage ? "#e6f0ff" : "#f5d76e";
  const mainCardActiveColor = isFirstPage ? "#2176ff" : "#222";
  const mainCardColor = isFirstPage ? "#2176ff" : "#f5d76e";

  return (
    <div style={{
      minHeight: "100vh",
      background: mainBg,
      transition: "background 0.5s cubic-bezier(.4,0,.2,1)"
    }}>
      {isFirstPage ? logo2Header : logoHeader}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: 32,
          fontFamily: "sans-serif",
          color: mainColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "color 0.5s cubic-bezier(.4,0,.2,1)"
        }}
      >
        {step === 0 && (
          <>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: mainColor, textAlign: "center" }}>
              안녕하세요!<br />이사나 보관 서비스를 원하시면,<br />아래 항목을 입력해 주세요!
            </div>
            <div style={{ marginBottom: 24, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center", color: mainColor }}>1. 어느 유형의 이사를 계획하고 계신가요?</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {moveTypeOptions.map(opt => (
                  <div
                    key={opt.value}
                    onClick={() => setMoveType(opt.value)}
                    style={{
                      padding: "13px 24px",
                      borderRadius: 32,
                      border: moveType === opt.value ? mainCardActiveBorder : mainCardBorder,
                      background: moveType === opt.value ? mainCardActiveBg : mainCardBg,
                      color: moveType === opt.value ? mainCardActiveColor : mainCardColor,
                      fontWeight: moveType === opt.value ? 700 : 400,
                      fontSize: 15,
                      cursor: "pointer",
                      minWidth: 90,
                      textAlign: "center",
                      transition: "all 0.18s, background 0.5s cubic-bezier(.4,0,.2,1), color 0.5s cubic-bezier(.4,0,.2,1), border 0.5s cubic-bezier(.4,0,.2,1)",
                      boxShadow: moveType === opt.value ? (isFirstPage ? "0 2px 8px rgba(33,118,255,0.13)" : "0 2px 8px rgba(245,215,110,0.13)") : "none",
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
                background: moveType ? mainBtnBg : mainBtnDisabledBg,
                color: moveType ? mainBtnColor : mainBtnDisabledColor,
                fontSize: 18,
                marginTop: 8,
                cursor: moveType ? "pointer" : "not-allowed",
                fontWeight: 700,
                transition: "background 0.5s cubic-bezier(.4,0,.2,1), color 0.5s cubic-bezier(.4,0,.2,1)"
              }}
            >
              다음
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, textAlign: "center", color: mainColor }}>2. 어떤 서비스가 적합할지 알려주세요!</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 24 }}>
              {serviceTypeOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => setServiceType(opt.value)}
                  style={{
                    padding: "13px 24px",
                    borderRadius: 32,
                    border: serviceType === opt.value ? mainCardActiveBorder : mainCardBorder,
                    background: serviceType === opt.value ? mainCardActiveBg : mainCardBg,
                    color: serviceType === opt.value ? mainCardActiveColor : mainCardColor,
                    fontWeight: serviceType === opt.value ? 700 : 400,
                    fontSize: 15,
                    cursor: "pointer",
                    minWidth: 90,
                    textAlign: "center",
                    transition: "all 0.18s, background 0.5s cubic-bezier(.4,0,.2,1), color 0.5s cubic-bezier(.4,0,.2,1), border 0.5s cubic-bezier(.4,0,.2,1)",
                    boxShadow: serviceType === opt.value ? (isFirstPage ? "0 2px 8px rgba(33,118,255,0.13)" : "0 2px 8px rgba(245,215,110,0.13)") : "none",
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
                background: serviceType ? mainBtnBg : mainBtnDisabledBg,
                color: serviceType ? mainBtnColor : mainBtnDisabledColor,
                fontSize: 18,
                marginTop: 8,
                cursor: serviceType ? "pointer" : "not-allowed",
                fontWeight: 700
              }}
            >
              다음
            </button>
            <button type="button" onClick={handleBack} style={{ marginTop: 10, background: "none", color: mainColor, border: "none", fontSize: 16, cursor: "pointer", transition: "color 0.5s cubic-bezier(.4,0,.2,1)" }}>이전</button>
          </>
        )}
        {/* 날짜 선택 달력: 월별/일별 요금 랜덤 표시 */}
        {step === 2 && (
          <DatePriceCalendar
            selectedDate={selectedDate}
            selectedPrice={selectedPrice}
            onSelect={(date, price) => {
              setSelectedDate(date);
              setSelectedPrice(price);
              setStep(3);
            }}
            onBack={handleBack}
          />
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
              type="submit"
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

// 날짜+요금 달력 컴포넌트
function DatePriceCalendar({ selectedDate, selectedPrice, onSelect, onBack }) {
  const year = 2026;
  const month = 2; // 2월
  // 요금 샘플: 67.9, 69.9, 74.9, 89.9, 94.9, 149.9만
  const priceList = [67.9, 69.9, 74.9, 89.9, 94.9, 149.9];
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const prices = Array(daysInMonth).fill(0).map(() => priceList[Math.floor(Math.random() * priceList.length)]);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "sans-serif", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 24 }}>
      <div style={{ fontWeight: 700, fontSize: 22, textAlign: "center", marginBottom: 18, color: "#222" }}>{year}. {month.toString().padStart(2, "0")}. </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, color: "#e55" }}>
        {["일", "월", "화", "수", "목", "금", "토"].map(d => <div key={d} style={{ textAlign: "center", fontWeight: 600 }}>{d}</div>)}
        {Array(firstDay).fill(0).map((_, i) => <div key={"empty"+i}></div>)}
        {Array(daysInMonth).fill(0).map((_, i) => {
          const dateStr = `${year}-${month.toString().padStart(2,"0")}-${(i+1).toString().padStart(2,"0")}`;
          const isSelected = selectedDate === dateStr;
          return (
            <div key={i}
              onClick={() => onSelect && onSelect(dateStr, prices[i])}
              style={{
                textAlign: "center",
                padding: 6,
                borderRadius: 8,
                background: isSelected ? "#5a5ad6" : "#fff",
                color: isSelected ? "#fff" : "#e55",
                fontWeight: isSelected ? 700 : 400,
                cursor: "pointer",
                border: isSelected ? "2px solid #5a5ad6" : "1px solid #eee",
                marginBottom: 2,
                minHeight: 38
              }}
            >
              <div>{i+1}</div>
              <div style={{ fontSize: 13, marginTop: 2 }}>{prices[i]}만</div>
            </div>
          );
        })}
      </div>
      <button onClick={onBack} style={{ marginTop: 18, width: "100%", padding: 12, borderRadius: 8, border: "none", background: "#eee", color: "#333", fontSize: 16, cursor: "pointer" }}>이전</button>
    </div>
  );
}
