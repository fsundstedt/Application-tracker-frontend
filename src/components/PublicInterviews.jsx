import React, { Component } from "react";
import NoInterviewData from "./NoInterviewData";
import PublicInterviewsHeader from "./PublicInterviewsHeader";
import { Link } from "react-router-dom";

class PublicInterviews extends Component {
  state = {
    interviews: [],
  };

  async getData() {
    const { id } = this.props.match.params;
    const response = await fetch(`http://localhost:2000/companies/${id}`);
    const data = await response.json();
    return data;
  }

  async componentDidMount() {
    const interviews = await this.getData();

    this.setState({
      interviews: interviews,
    });
  }

  render() {
    let interviewsArray = this.state.interviews;
    console.log("data", interviewsArray);

    return (
      <div>
        <>
          <PublicInterviewsHeader />
          <br />
          <Link style={back} to={`/companies`} type="submit">
            Back
          </Link>
          <h3> Interview Information</h3>
          <ul style={userApp}>
            {interviewsArray.length > 0 ? (
              interviewsArray.map((interview) => (
                <li>
                  Interview Round: {interview.round}
                  <br />
                  Interview Type: {interview.interview_type}
                  <br />
                  Date of Interview: {interview.interview_date}
                  <br />
                  Rating: {interview.interview_rating}
                  <br />
                  Whiteboarding?: {interview.whiteboarding}
                  <br />
                  Code Challenge? {interview.code_challenge}
                  <br />
                  Comments: {interview.comments}
                  <br />
                  <br />
                </li>
              ))
            ) : (
              <li>
                <NoInterviewData />
              </li>
            )}
          </ul>
        </>
      </div>
    );
  }
}

const back = {
  borderRadius: "10px",
  fontFamily: "Lato, sans-serif",
  fontSize: "14px",
  height: "20px",
  background: "#1c53df",
  border: "solid 2px #1c53df",
  color: "#FFFFFF",
  textDecoration: "none",
  padding: "0px 8px",
  position: "relative",
  marginRight: "5px",
};

const userApp = {
  listStyle: "none",
};
export default PublicInterviews;
