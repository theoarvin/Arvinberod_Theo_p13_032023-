import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { editUserData, getUserData } from "../feature/user.slice";
import Header from "../components/Header";

function Profile() {
  const token = useSelector((state) => state?.auth?.token?.token || "");
  const user = useSelector((state) => state?.user?.userData);
  const [isEdit, setIsEdit] = useState(false);
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const editButton = useRef();

  useEffect(() => {
    if (token) {
      axios({
        method: "post",
        url: "http://localhost:3001/api/v1/user/profile",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          dispacth(getUserData(res.data.body));
        })
        .catch((err) => console.log(err));
    } else {
      return navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:3001/api/v1/user/profile",
      data: {
        firstName,
        lastName,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        dispacth(editUserData(res.data.body));
        setIsEdit(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {token ? (
        <div className="body">
          <Header userProfile={true} />
          <main className="main bg-dark">
            <div className="header">
              {isEdit ? (
                <>
                  <h1 className="title-edit">Welcome back</h1>
                  <div className="edit-block">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="edit-block_input">
                        <input
                          type="text"
                          placeholder={user?.firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required={true}
                        />
                        <input
                          type="text"
                          placeholder={user?.lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required={true}
                        />
                      </div>
                      <div className="edit-block_button">
                        <button type="submit">Save</button>
                        <button onClick={() => setIsEdit(false)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <h1>
                    Welcome back
                    <br />
                    {`${user?.firstName} ${user?.lastName}!`}
                  </h1>
                  <button
                    ref={editButton}
                    className="edit-button"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Name
                  </button>
                </>
              )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Credit Card (x8349)
                </h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      ) : null}
    </>
  );
}

export default Profile;
