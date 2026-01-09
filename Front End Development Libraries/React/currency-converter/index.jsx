
const { useState, useMemo, useCallback } = React;

const currencies = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GBP");
  const [result, setResult] = useState("");

  const code = (countryCode) => {
    return countryCode.substring(0, 2);
  };

  const calculation = useMemo(() => {
    return (
      amount *
      (currencies[fromCurrency] / currencies[toCurrency])
    ).toFixed(2);
  }, [fromCurrency, amount]);

  const handleSetFirstCur = useCallback((e) => {
    setFromCurrency(e.target.value);
  });

  const handleSetSecondCur = useCallback((e) => {
    setToCurrency(e.target.value);
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();

    setResult(calculation);
  };

  const handleChangeCurr = (e) => {
    e.preventDefault();
    const currency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(currency);
  };

  return (
    <form
      action="#"
      className="container box-shadow"
      onSubmit={handleSubmitForm}
    >
      <h1>Currency Converter</h1>

      <div>
        <label htmlFor="#" className="label-amount">
          Enter Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
      </div>

      <div className="form-group">
        <div>
          <label htmlFor="#" className="form-label">
            From:
          </label>
          <div className="flag-container">
            <img
              src={`https://flagsapi.com/${code(fromCurrency)}/flat/64.png`}
              alt="Flag"
              className="flag"
            />
            <select
              name="select-from"
              id=""
              className="select"
              value={fromCurrency}
              onChange={handleSetFirstCur}
            >
              {Object.entries(currencies).map((currency) => (
                <option value={currency[0]} key={currency[0]}>
                  {currency[0]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="swap-icon">
          <svg
            width="16"
            viewBox="0 0 20 19"
            xmlns="https://www.svgrepo.com/show/391547/swap.svg"
            onClick={handleChangeCurr}
          >
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#000"
            />
          </svg>
        </div>

        <div>
          <label htmlFor="#" className="form-label">
            To:
          </label>
          <div className="flag-container">
            <img
              src={`https://flagsapi.com/${code(toCurrency)}/flat/64.png`}
              alt="Flag"
              className="flag"
            />
            <select
              name="select-from"
              id=""
              className="select"
              value={toCurrency}
              onChange={handleSetSecondCur}
            >
              {Object.entries(currencies).map((currency) => (
                <option value={currency[0]} key={currency[0]}>
                  {currency[0]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className="exchange-btn">Exchange Rate</button>
      <p className="exchange-result">{`${amount} ${fromCurrency} = ${result} ${toCurrency}`}</p>
    </form>
  );
}
