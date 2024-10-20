import { useState, useEffect } from "react";
import styleRegister from "./Register.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);

  const phoneRegex = /^(01)\d{9}$/;
  const nameRegex = /^[A-Z]\w{2,}\s[A-Z]\w{2,}$/;
  const emailRegex = /^[A-Za-z]\w+@\w+\.\w+$/;

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!nameRegex.test(name)) {
      setError("Invalid name. Make sure both names start with a capital letter and are at least 3 characters long.");
      return;
    }


    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }


    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number. It should start with '01' and be 11 digits long.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("phone", phone);
    if (photo) {
      formData.append("photo", photo);
    }
    try {
      const response = await fetch('http://localhost:4000/user/register', {
        method: 'POST',

        body: formData,
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }
      const result = await response.json();
      // Store the user ID in local storage
      localStorage.setItem('userId', result._id);

      setSuccess(`Thank you for registering, ${name}.`);

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setPhoto(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className={styleRegister.container}>
      <h1 className={styleRegister.header}>Register</h1>
      <form onSubmit={handleSubmit} className={styleRegister.form}>
        <label className={styleRegister.label}>
          Name:
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styleRegister.input}
          />
        </label>
        <br />
        <label className={styleRegister.label}>
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styleRegister.input}
          />
        </label>
        <br />
        <label className={styleRegister.label}>
          Phone:
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={styleRegister.input}
          />
        </label>
        <br />
        <label className={styleRegister.label}>
          Password:
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styleRegister.input}
          />
        </label>
        <br />
        <label className={styleRegister.label}>
          Address:
          <input
            type="text"
            placeholder="Enter your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className={styleRegister.input}
          />
        </label>

        <br />
        <label className={styleRegister.label}>
          Photo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className={styleRegister.input}
          />
        </label>


        <br />
        <button type="submit" className={styleRegister.button}>
          Register
        </button>
        {error && <div className={styleRegister.error}>{error}</div>}
        {success && <div className={styleRegister.success}>{success}</div>}
      </form>
    </div>
  );
}

