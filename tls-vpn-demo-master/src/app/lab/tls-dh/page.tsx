"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 간단한 모듈러 거듭제곱(BigInt)
function powmod(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = BigInt(1);
  base = base % mod;
  let e = exp;
  while (e > BigInt(0)) {
    if (e % BigInt(2) === BigInt(1)) result = (result * base) % mod;
    e = e / BigInt(2);
    base = (base * base) % mod;
  }
  return result;
}

// 단계별 SVG 시각화 및 애니메이션
const StepAnimation = ({
  step,
  clientShared,
  serverShared,
}: {
  step: number;
  clientShared: bigint | null;
  serverShared: bigint | null;
}) => {
  // 색상 정의
  const clientColor = '#6c63ff';
  const serverColor = '#ff6584';
  const keyColor = '#f8d90f';
  const sharedColor = clientShared && serverShared && clientShared === serverShared ? '#7ed957' : '#f8d90f';

  return (
    <svg width="360" height="120" style={{ marginBottom: 10 }}>
      {/* Client */}
      <motion.circle
        cx={70}
        cy={60}
        r={30}
        fill={clientColor}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
      />
      <text x={70} y={66} textAnchor="middle" fill="#fff" fontSize="20" fontWeight={700}>Client</text>

      {/* Server */}
      <motion.circle
        cx={290}
        cy={60}
        r={30}
        fill={serverColor}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
      />
      <text x={290} y={66} textAnchor="middle" fill="#fff" fontSize="20" fontWeight={700}>Server</text>

      {/* 단계별 애니메이션 */}
      <AnimatePresence>
        {step === 0 && (
          <motion.rect
            x={110} y={40} width={60} height={40} rx={10}
            fill="#f8d90f"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
          />
        )}
        {step === 0 && (
          <motion.text
            x={140} y={66} textAnchor="middle" fill="#333" fontSize="15"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >암호화 목록</motion.text>
        )}

        {step === 1 && (
          <motion.rect
            x={190} y={40} width={60} height={40} rx={10}
            fill="#b2f7ef"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          />
        )}
        {step === 1 && (
          <motion.text
            x={220} y={66} textAnchor="middle" fill="#333" fontSize="15"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >인증서</motion.text>
        )}

        {step === 2 && (
          <>
            {/* Client → Server 화살표 (A) */}
            <motion.line
              x1={100} y1={60} x2={260} y2={60}
              stroke={clientColor} strokeWidth={5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
              markerEnd="url(#arrowheadA)"
            />
            <motion.circle
              cx={180} cy={60} r={18}
              fill={keyColor}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.text
              x={180} y={66} textAnchor="middle" fill="#333" fontSize="18" fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >A</motion.text>
            <defs>
              <marker id="arrowheadA" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={clientColor} />
              </marker>
            </defs>
          </>
        )}

        {step >= 3 && (
          <>
            {/* 양방향 화살표 (공개키 교환) */}
            <motion.line
              x1={100} y1={40} x2={260} y2={40}
              stroke={clientColor} strokeWidth={3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7 }}
              markerEnd="url(#arrowheadA)"
            />
            <motion.line
              x1={260} y1={80} x2={100} y2={80}
              stroke={serverColor} strokeWidth={3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              markerEnd="url(#arrowheadB)"
            />
            {/* 공유키 */}
            <motion.circle
              cx={180} cy={60} r={22}
              fill={sharedColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.6 }}
              style={{ filter: clientShared && serverShared && clientShared === serverShared ? 'drop-shadow(0 0 8px #7ed957)' : undefined }}
            />
            <motion.text
              x={180} y={66} textAnchor="middle" fill="#333" fontSize="20" fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >S</motion.text>
            <defs>
              <marker id="arrowheadB" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={serverColor} />
              </marker>
              <marker id="arrowheadA" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={clientColor} />
              </marker>
            </defs>
          </>
        )}
      </AnimatePresence>
    </svg>
  );
};

export default function FixedDHDynamic() {
  // 고정 파라미터
  const p = BigInt(23);
  const g = BigInt(5);

  // 서버의 고정 비밀키/공개키 (b/B)
  const [serverSecretB] = useState(() => BigInt(Math.floor(Math.random() * 10) + 2)); // 2~11
  const serverPublicB = powmod(g, serverSecretB, p);

  // 클라이언트 임시 키/공개키 (a/A)
  const [clientSecretA, setClientSecretA] = useState<bigint | null>(null);
  const [clientPublicA, setClientPublicA] = useState<bigint | null>(null);

  // 공유된 Pre-Master Secret
  const [clientShared, setClientShared] = useState<bigint | null>(null);
  const [serverShared, setServerShared] = useState<bigint | null>(null);

  // 단계 진행
  const [step, setStep] = useState(0);

  // 임시 키 생성
  function generateClientKeys() {
    const a = BigInt(Math.floor(Math.random() * 10) + 2); // 2~11
    const A = powmod(g, a, p);
    setClientSecretA(a);
    setClientPublicA(A);
    setClientShared(null);
    setServerShared(null);
    setStep(3); // 4단계로 자동 이동
  }

  // Pre-Master Secret 계산
  function calcShared() {
    if (clientSecretA && clientPublicA) {
      const clientS = powmod(serverPublicB, clientSecretA, p);
      const serverS = powmod(clientPublicA, serverSecretB, p);
      setClientShared(clientS);
      setServerShared(serverS);
      setStep(4); // 5단계로 자동 이동
    }
  }

  // 단계별 설명
  const steps = [
    '클라이언트가 통신을 시작하며 지원하는 암호화 방식 목록을 서버에 보냅니다. (ClientHello)',
    '서버는 자신의 인증서를 보냅니다. 이 인증서에는 서버의 "고정된" DH 공개키가 포함되어 있습니다. (Certificate)',
    '클라이언트는 임시 DH 키 쌍(a, A)을 생성하고, 공개키 A를 서버에 보냅니다. (ClientKeyExchange)',
    '클라이언트와 서버는 각자 상대방의 공개키와 자신의 비밀키로 Pre-Master Secret(대칭키)을 계산합니다.',
    '핸드셰이크 완료! 생성된 대칭키로 암호화 통신을 시작합니다. (Finished)',
  ];

  return (
    <div style={{
      maxWidth: 750,
      margin: 'auto',
      fontFamily: 'sans-serif',
      border: '1px solid #ddd',
      borderRadius: 12,
      padding: '2.2rem',
      background: '#fafdff',
      boxShadow: '0 2px 24px #b2f7ef33'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        🔐 TLS with Fixed Diffie-Hellman 동적 시뮬레이션
      </h2>

      {/* 단계별 애니메이션 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <StepAnimation
          step={step}
          clientShared={clientShared}
          serverShared={serverShared}
        />
      </div>

      {/* 단계별 설명 */}
      <motion.div
        style={{
          minHeight: 100,
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: 8,
          padding: '1.5rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.1rem',
          lineHeight: 1.6,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={step}
      >
        <b>[{step + 1}단계]</b> {steps[step]}
      </motion.div>

      {/* 파라미터 및 키 정보 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}>
          <b>공통 파라미터</b> <br />
          <span>p = {p.toString()}, g = {g.toString()}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>서버 고정 비밀키 (b):</b> <span style={{ color: '#aaa' }}>(비공개)</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>서버 고정 공개키 (B = g^b mod p):</b> <span>{serverPublicB.toString()}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>클라이언트 임시 비밀키 (a):</b> <span>{clientSecretA ? clientSecretA.toString() : '(미생성)'}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>클라이언트 임시 공개키 (A = g^a mod p):</b> <span>{clientPublicA ? clientPublicA.toString() : '(미생성)'}</span>
        </div>
      </div>

      {/* 단계별 버튼 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
          style={buttonStyle(step === 0)}
        >
          ← 이전 단계
        </button>
        <button
          onClick={() => {
            if (step === 2) generateClientKeys();
            else if (step === 3) calcShared();
            else setStep((prev) => Math.min(prev + 1, steps.length - 1));
          }}
          disabled={
            (step === 2 && clientSecretA !== null) ||
            (step === 3 && clientShared !== null) ||
            step >= steps.length - 1
          }
          style={buttonStyle(
            (step === 2 && clientSecretA !== null) ||
            (step === 3 && clientShared !== null) ||
            step >= steps.length - 1
          )}
        >
          {step === 2 ? '임시 키 생성' : step === 3 ? '대칭키 계산' : '다음 단계 →'}
        </button>
      </div>

      {/* 결과 표시 */}
      {step >= 3 && (
        <motion.div
          style={{
            background: '#f4f4f4',
            borderRadius: 8,
            padding: 18,
            marginTop: 12,
            boxShadow: '0 0 10px #7ed95744'
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <b>클라이언트 계산 (S = B^a mod p):</b> {clientShared !== null ? clientShared.toString() : '-'}
          </div>
          <div>
            <b>서버 계산 (S = A^b mod p):</b> {serverShared !== null ? serverShared.toString() : '-'}
          </div>
          {clientShared !== null && serverShared !== null && (
            <div style={{ marginTop: 10, color: clientShared === serverShared ? 'green' : 'red', fontWeight: 'bold' }}>
              {clientShared === serverShared
                ? '✅ 성공! 양측이 동일한 대칭키를 생성했습니다.'
                : '❌ 오류! 대칭키가 다릅니다.'}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

const buttonStyle = (disabled: boolean): React.CSSProperties => ({
  padding: '10px 20px',
  fontSize: '1rem',
  cursor: disabled ? 'not-allowed' : 'pointer',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: disabled ? '#e9ecef' : '#fff',
  opacity: disabled ? 0.6 : 1,
  transition: 'background-color 0.2s',
});
