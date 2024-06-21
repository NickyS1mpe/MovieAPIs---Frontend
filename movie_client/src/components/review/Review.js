import React, { useEffect, useRef, useState } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import toast from "react-hot-toast";
import "./Review.css";

function Review({ getMovieData, movie, reviews, setReviews, user }) {
  const revText = useRef();
  const { movieId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 8;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReviews = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    if (!rev.value) {
      toast.error(`Review cannot be empty!`);
      return;
    }
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        nickname: user.nickname,
        username: user.username,
        imdbId: movie.imdbId,
      });

      const responseData = response.data;

      const updatedReviews = [
        ...reviews,
        {
          nickname: responseData.nickname,
          body: rev.value,
          create_time: responseData.create_time,
        },
      ];

      rev.value = "";

      setReviews(updatedReviews);
      toast.success("Successfully reviewed!");
    } catch (err) {
      console.error(err);
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="parent-c">
      <div className="blur-b">
        <Container>
          <Row>
            <Col>
              <h3>Reviews</h3>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <img src={movie?.poster} alt="" />
            </Col>
            <Col>
              <Col>
                <hr />
              </Col>
              {currentReviews?.map((review) => (
                <div key={review.create_time}>
                  <Row>
                    <Col>
                      <a target="_blank" href={``} rel="noopener noreferrer">
                        {review.nickname}
                      </a>{" "}
                      : {review.body} -- {review.create_time}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </div>
              ))}
              <Row>
                <Col>
                  <nav>
                    <ul className="pagination">
                      {currentPage > 1 ? (
                        <Button
                          onClick={() => paginate(currentPage - 1)}
                          variant="link"
                        >
                          {"<"}
                        </Button>
                      ) : null}
                      {Array.from(
                        { length: Math.ceil(reviews.length / reviewsPerPage) },
                        (_, index) => (
                          <li key={index + 1} className="page-item">
                            <Button
                              onClick={() => paginate(index + 1)}
                              variant="link"
                            >
                              {index + 1}
                            </Button>
                          </li>
                        )
                      )}
                      {currentPage <
                      Math.ceil(reviews.length / reviewsPerPage) ? (
                        <Button
                          onClick={() => paginate(currentPage + 1)}
                          variant="link"
                        >
                          {">"}
                        </Button>
                      ) : null}
                    </ul>
                  </nav>
                </Col>
              </Row>
              {user === null ? (
                <Row>
                  <Col>
                    <a>Hint: Please login before writing a review</a>
                  </Col>
                </Row>
              ) : (
                <>
                  <Row>
                    <Col>
                      <ReviewForm
                        handleSubmit={addReviews}
                        revText={revText}
                        labelText="Write a Review"
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Review;
