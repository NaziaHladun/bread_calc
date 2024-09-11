import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ref, get } from "firebase/database";
import { database } from "../firebase";

const AuthPage = () => {
  const [err, setErr] = useState<null | string>(null);
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr(null);

    try {
      const passwordRef = ref(database, "adminPassword");
      const snapshot = await get(passwordRef);
      const storedPassword = snapshot.val();

      if (password === storedPassword) {
        localStorage.setItem("isAdmin", "true");
        navigate("/");
      } else {
        setErr("Невірний пароль!");
      }
    } catch (error) {
      setErr("Помилка під час авторизації!");
      console.error(error);
    }
  };

  return (
    <div className="auth">
      <h1>Admin</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          required
          type="password"
          placeholder="Пароль"
          name="password"
          autoComplete="off"
          onChange={handleChange}
          value={password}
        />
        <button type="submit">Увійти</button>
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
