import React, { useState, FormEvent } from 'react';

type MessageType = 'success' | 'error' | '';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage('이메일과 비밀번호를 모두 입력하세요.');
      setMessageType('error');
      return;
    }

    // 이메일 형식 검증
    if (!EMAIL_REGEX.test(email)) {
      setMessage('올바른 이메일 형식이 아닙니다.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        setMessage('로그인 성공!');
        setMessageType('success');
        // 추가 작업 (예: 토큰 저장, 페이지 이동 등)
        // const data = await response.json();
        // localStorage.setItem('token', data.token);
      } else {
        setMessage('로그인 실패. 아이디와 비밀번호를 확인하세요.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('네트워크 오류가 발생했습니다.');
      setMessageType('error');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          로그인
        </button>
      </form>
      {message && (
        <p style={{ 
          marginTop: '15px', 
          textAlign: 'center',
          color: messageType === 'success' ? 'green' : 'red'
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginPage;
