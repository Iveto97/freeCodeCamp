const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [codeDisplay, setCodeDisplay] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const isCounting = timeRemaining > 0;

  const generatePassword = () => Math.round(100000 + Math.random() * 90000);

  const handleOtp = () => {
    setCodeDisplay(generatePassword());
    setTimeRemaining(5);
  };

  useEffect(() => {
    if (!isCounting) {
      return;
    }
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prevRemainingTime) => prevRemainingTime - 1);

    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [isCounting]);

  return (
    <div className="container">
      <h1 id="otp-title" className="title">
        OTP Generator
      </h1>
      <h2 id="otp-display" className="otp-display">
        {codeDisplay != null
          ? codeDisplay
          : "Click 'Generate OTP' to get a code"}
      </h2>
      <p id="otp-timer" className="timer" aria-live="polite">
        {isCounting
          ? `Expires in: ${timeRemaining} seconds`
          : codeDisplay &&
            `OTP expired. Click the button to generate a new OTP.`}
      </p>
      <button
        id="generate-otp-button"
        className={isCounting ? "disabledButton" : "enabledButton"}
        onClick={handleOtp}
        disabled={isCounting ? true : false}
      >
        Generate OTP
      </button>
    </div>
  );
};
