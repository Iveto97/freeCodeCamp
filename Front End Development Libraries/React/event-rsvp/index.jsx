
const { useState } = React;

export const EventRSVPForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [attending, setAttending] = useState("");
  const [accompanies, setAccompanies] = useState("");
  const [numberAccompanies, setNumberAccompanies] = useState('');
  const [preferences, setPreferences] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendInvitation, setSendInvitation] = useState("No");

  const handleSubmitForm = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
  };

  const handleChange = (e) => {
 const target = e.target;

 if (target.checked) {
  switch (target.name) {
    case 'accompanied':
      setAccompanies(target.value)
      break;
   case 'attending':
      setAttending(target.value)
      break
    default:
      break;
  }
 }
 
  }

  return (
    <div className="container">
      <img
        src="https://media.istockphoto.com/id/2183005772/vector/merry-christmas-17.jpg?s=612x612&w=0&k=20&c=s1-cdK3Hbii3F_D4eW5fq-KyaCVLkfz-ty3sJqAeMTY="
        className="christmas-image"
        alt="Christmas card"
      />
      <p>You are invited to our Christmas party.</p>
      <hr className="line" />
      <form
        action="https://superhero-application-form.freecodecamp.org"
        method="post"
        onSubmit={handleSubmitForm}
      >
        <div className="section">
          <div>
            <label htmlFor="" className="input-label">
              Name:
            </label>
            <div className="input-container">
              <input
                type="text"
                className="input-style"
                placeholder="First"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                className="input-style"
                placeholder="Last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-container">
            <div>
              <label htmlFor="#" className="input-label">
                Email address:
              </label>
              <input
                type="email"
                className="input-style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="number" className="input-label">
                Phone number:
              </label>
              <input
                type="tel"
                name="number"
                className="input-style"
                placeholder="### ### ####"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="checkbox-container">
            <label htmlFor="#" className="input-label margin">
              Will you be attending?
            </label>
            <label className="container-checkbox">
              Yes
              <input type="radio" name="attending" value="Yes" onChange={handleChange}/>
              <span className="checkmark"></span>
            </label>
            <label className="container-checkbox">
              No
              <input type="radio" name="attending" value="No" onChange={handleChange}/>
              <span className="checkmark"></span>
            </label>
          </div>

          <label htmlFor="#" className="input-label margin">
            Are you coming accompanied?
          </label>
          <label className="container-checkbox">
            Yes
            <input type="radio" className="checkbox" name="accompanied" value="Yes" onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
          <label className="container-checkbox">
            No
            <input type="radio" className="checkbox" name="accompanied" value="No" onChange={handleChange} />
            <span className="checkmark"></span>
          </label>
          <label htmlFor="#" className="input-label">
            Number of accompanies?
          </label>
          <input
            type="number"
            className="input-style"
            value={numberAccompanies}
            onChange={(e) => setNumberAccompanies(e.target.value)}
            required
          />
          <label htmlFor="#" className="input-label">
            Dietary preferences:
          </label>
          <textarea
            name=""
            id=""
            className="textArea"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          ></textarea>
          <label className="container-checkbox">
            Send form in email
            <input type="radio" className="checkbox" name="send-form" value={sendInvitation} onChange={(e) => setSendInvitation("Yes")} />
            <span className="checkmark"></span>
          </label>
        </div>
        <button className="submit-btn">Submit</button>
      </form>
      {!isSubmitted ? (
        ""
      ) : (
        <div className="input-style submit" id="submitted">
          <h3>Submitted!</h3>

          <p>
            <span className="submitted-info">Name:</span>
            {firstName} {lastName}
          </p>
          <p>
            <span className="submitted-info">Email:</span>
            {email}
          </p>
          <p>
            <span className="submitted-info">Phone number:</span>
            {phoneNumber}
          </p>
          <p>
            <span className="submitted-info">Attending:</span>
            {attending}
          </p>
          <p>
            <span className="submitted-info">Accompanied:</span>
            {accompanies}
          </p>
          <p>
            <span className="submitted-info">Number of accompanies:</span>
            {numberAccompanies}
          </p>
          <p>
            <span className="submitted-info">Dietary preferences:</span>
            {preferences}
          </p>
          <p>
            <span className="submitted-info">Send the invitation in email:</span>
            {sendInvitation}
          </p>
        </div>
      )}
    </div>
  );
};
