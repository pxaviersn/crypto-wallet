import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Error: no token found');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/comm`, { content: comment }, { headers });
      setComments([...comments, comment]);
      setComment('');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <div className='about-page'>
      <Navbar />
      <div className="about-container">
        <section className="product-section">
          <div><h2>About the Product</h2></div>
          <p>BitTracker is a portfolio management application designed to help investors keep track of their trades.
          With this tool, you can monitor your profits and losses in real-time and view essential information to make
          more informed decisions about your investments. BitTracker allows you to connect your brokerage account,
          automatically import your trades, calculate performance, and display charts and statistics to help identify
          patterns and opportunities. With this application, you can manage your trades more efficiently and make more
          strategic decisions to maximize your profits.</p>
        </section>

        <section className="about-me-section">
          <h2>About the developer</h2>
          <p>Paulo is an engineer by profession and passionate about technology. He developed this application with
          the goal of helping investors manage their portfolios more efficiently. With his extensive knowledge of both
          engineering and technology, Paulo has created a tool that allows users to monitor their profits and losses in
          real-time, providing them with valuable insights to make more informed investment decisions. His dedication to
          creating a user-friendly and intuitive application has resulted in a powerful tool that enables users to connect
          their brokerage accounts, automatically import their trades, and view detailed charts and statistics to help identify
          patterns and opportunities. Thanks to Paulo's expertise and vision, investors can now manage their trades more efficiently
          and make strategic decisions to maximize their profits.</p>
        </section>

        <section className="comments-section">
          <h2>Comments</h2>
          <form onSubmit={handleSubmit}>
            <div><label htmlFor="comment">Let us know how your experience with the application is going.</label></div>
            <div><textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              rows="4"
              cols="50"
            /></div>
            <div><button type="submit">Send</button></div>
          </form>
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
