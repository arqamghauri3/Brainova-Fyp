import axios from "axios";
import { useSelector } from "react-redux";

const createPatient = async ({
  user,
  first_name,
  last_name,
  age,
  medical_history,
  current_medications,
  gender,
  accessToken,
}) => {
  const response = await axios.put(
    `http://127.0.0.1:8000/api/profile/update/${user}/`,
    {
      first_name,
      last_name,
      age,
      medical_history,
      current_medications,
      gender,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export { createPatient };
