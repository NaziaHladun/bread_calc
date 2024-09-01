import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = () => {};

  const handleSubmit = () => {
    setErr(null);
  };

  return (
    <div className="auth">
      <h1>Admin</h1>
      <form className="auth-form">
        <input
          required
          type="password"
          placeholder="Пароль"
          name="password"
          autoComplete="off"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Увійти</button>
        {err && (
          <div className="err">
            <p>{err}</p>
          </div>
        )}
        <Link to={"/"}>На головну сторінку</Link>
      </form>
    </div>
  );
};

export default AuthPage;
