// import { useState, useEffect } from "react";
// import styleLogin from "./Login.module.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState("");

//   const emailRegex = /^[A-Za-z]\w+@\w+\.\w+$/;

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!emailRegex.test(email)) {
//       setError("Invalid email format.");
//       return;
//     }

//     const payload = {
//       email,
//       password,
//     };

//     try {
//       const response = await fetch('http://localhost:4000/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Set content type to JSON
//         },
//         body: JSON.stringify(payload), // Convert payload to JSON string
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'An unknown error occurred.');
//       }

//       const result = await response.json();
//       localStorage.setItem('userId', result.user._id); // Adjust according to your response structure
//       setError("");
//       setSuccess("Welcome back!");
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         setSuccess(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [success]);

//   return (
//     <div className={styleLogin.container}>
//       <h1 className={styleLogin.header}>Login</h1>
//       <form onSubmit={handleSubmit} className={styleLogin.form}>
//         <label className={styleLogin.label}>
//           Email:
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className={styleLogin.input}
//           />
//         </label>
//         <br />
//         <label className={styleLogin.label}>
//           Password:
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className={styleLogin.input}
//           />
//         </label>
//         <br />
//         <button type="submit" className={styleLogin.button}>
//           Login
//         </button>
//         {error && <div className={styleLogin.error}>{error}</div>}
//         {success && <div className={styleLogin.success}>{success}</div>}
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import styleLogin from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Create a navigate function for redirection

  const emailRegex = /^[A-Za-z]\w+@\w+\.\w+$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(payload), // Convert payload to JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred.');
      }

      const result = await response.json();
      localStorage.setItem('userId', result.user._id); // Adjust according to your response structure
      setError("");
      setSuccess("Welcome back!");

      // Clear the form fields
      setEmail("");
      setPassword("");

      // Navigate to user page after successful login
      navigate('/user'); // Assuming /userpage is the route for the user's profile page
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
    <div className={styleLogin.container}>
      <h1 className={styleLogin.header}>Login</h1>
      <form onSubmit={handleSubmit} className={styleLogin.form}>
        <label className={styleLogin.label}>
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styleLogin.input}
          />
        </label>
        <br />
        <label className={styleLogin.label}>
          Password:
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styleLogin.input}
          />
        </label>
        <br />
        <button type="submit" className={styleLogin.button}>
          Login
        </button>
        {error && <div className={styleLogin.error}>{error}</div>}
        {success && <div className={styleLogin.success}>{success}</div>}
      </form>
    </div>
  );
}
