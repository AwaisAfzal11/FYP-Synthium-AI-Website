import React from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Redirect to localhost://5173/contact/tellus
    navigate('/contact/tellus');
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;


// import React from 'react';

// function Contact() {
//   return (
//     <div>
//       <h1>Contact Us</h1>
//       <form>
       

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Contact;



// import { useHistory } from 'react-router-dom';

// function Contact() {
//   const history = useHistory();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Redirect to localhost://5173/contact/tellus
//     history.push('/contact/tellus');
//   };

//   return (
//     <div>
//       <h1>Contact Us</h1>
//       <form onSubmit={handleSubmit}>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Contact;


