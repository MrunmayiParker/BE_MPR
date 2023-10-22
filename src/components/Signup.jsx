import React, { useEffect, useState } from "react";
// import "./Login.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    birthYear: "",
    email: "",
    disability: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const isSpeechRecognitionSupported =
    "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

  // Initialize the recognition object outside the component function.
  const recognition = isSpeechRecognitionSupported
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

  // Initialize a state variable to keep track of the recognition status.
  const [recognitionStarted, setRecognitionStarted] = useState(false);

  if (isSpeechRecognitionSupported && recognition) {
    recognition.onresult = function (event) {
      const result = event.results[0][0].transcript;
      // Update the form field here (e.g., email, disability, password)
      // ...
    };
  } else {
    console.warn("Speech recognition is not supported in this browser.");
  }

  const startSpeechRecognition = () => {
    if (recognition) {
      if (!recognitionStarted) {
        recognition.start();
        setRecognitionStarted(true);
      } else {
        recognition.stop();
        setRecognitionStarted(false);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    console.log(selectedFile);
    if (selectedFile) {
      console.log("uploading");
      var fileData = new FormData();
      fileData.append("input_file", selectedFile);
      var requestOptions = {
        method: "POST",
        body: fileData,
        redirect: "follow",
      };
      fetch("https://f1b3-103-207-59-68.ngrok-free.app/verify", requestOptions)
        .then((response) => {
          console.log(response);
          if (response.ok) {
            console.log("success");
            const data = response.json();
            if (data.status === "Authorized") {
              setFormData((f) => ({
                ...f,
                name: data.name,
                birthYear: data.year,
              }));
              setIsDisabled(true);
            } else {
              alert("Unauthorized");
            }
          } else {
            setFormData((f) => ({
              ...f,
              name: "Priyal",
              birthYear: "2003",
            }));
            alert(
              "Error: \nresponse type, status, text = " +
                response.type +
                ", " +
                response.status +
                ", " +
                response.statusText +
                ";"
            );
            setIsDisabled(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setFormData((f) => ({
            ...f,
            name: "Priyal",
            birthYear: "2003",
          }));
          alert("Error: \n" + error);
          setIsDisabled(true);
        });
        console.log("uploaded");
    }
  }, [selectedFile]);

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
                <MDBRow>
                <MDBInput
                wrapperClass="mb-4"
                id="form1"
                type="file"
                accept=".jpg, .jpeg"
                onChange={handleFileChange}
              />
                </MDBRow>
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    value={formData.name}
                    disabled={isDisabled}
                    id="form1"
                    type="text"
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Birth Year"
                    id="form1"
                    value={formData.birthYear}
                    disabled={isDisabled}
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol col="12">
                  <div className="position-relative">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      id="form1"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {isSpeechRecognitionSupported && (
                      <MDBIcon
                        icon="microphone"
                        className="position-absolute top-50 end-0 translate-middle-y"
                        onClick={startSpeechRecognition}
                        style={{ cursor: "pointer", color: "#007bff" }}
                      />
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass="mb-4"
                label="Disability"
                id="form1"
                type="text"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                type="password"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
                id="form1"
                type="password"
              />
              <MDBBtn className="w-100 mb-4" size="md" data-bs-dismiss="toast">
                sign up
              </MDBBtn>
              {/* <div class="toast-body">Verified</div> */}

              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
