import axios from "axios";

const viewProfile = async ({ user }) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/profile/${user}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const viewPatient = async ({ user }) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/patients/${user}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const getDiagnosis = async ({ patient }) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/diagnosis/${patient}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export { viewProfile, viewPatient, getDiagnosis };

