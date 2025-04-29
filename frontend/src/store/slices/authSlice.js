import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const initialState = {
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  isAuthenticated: localStorage.getItem("access") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || null, // Persist user data  message: "",
  patient: JSON.parse(localStorage.getItem("patient")) || null, // Persist user data  message: "",
  status: "idle", // idle | loading | succeeded | failed
};

// ** Refresh Token Thunk **
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = localStorage.getItem("refresh");
      console.log(refresh);

      if (!refresh) throw new Error("No refresh token available");

      const response = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/token/refresh/",
        { refresh }
      );

      // Store new access token
      localStorage.setItem("access", response.data.access);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Token refresh failed");
    }
  }
);

// ** Login Thunk **
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/login/",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Store tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      await dispatch(getUser());

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

// ** Google Login Thunk **
export const googleLogin = createAsyncThunk(
  "auth/google-login",
  async ({ code }, { dispatch, rejectWithValue }) => {
    if (!localStorage.getItem("access")) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/dj-rest-auth/google/",
          { code },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // Store tokens
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || "Login failed");
      }
    } else {
      await dispatch(refreshToken())
      await dispatch(getUser());
    }
  }
);

// ** Signup Thunk **
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, first_name, last_name, password1, password2 },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/registration/",
        { email, first_name, last_name, password1, password2 },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

// ** Email Verification Thunk **
export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async ({ key }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/registration/verify-email/",
        { key },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Verification failed");
    }
  }
);

// ** Reset Password Thunk **
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/password/reset/",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Reset Password failed");
    }
  }
);

// ** Confirm Reset Password Thunk **
export const confirmResetPassword = createAsyncThunk(
  "auth/confirm-reset-password",
  async ({ uid, token, new_password1, new_password2 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/password/reset/confirm/",
        { uid, token, new_password1, new_password2 },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Reset Password failed");
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (localStorage.getItem("access")) {
        await axios.post(
          "http://127.0.0.1:8000/dj-rest-auth/token/verify/",
          { token: localStorage.getItem("access") },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        return true;
      } else {
        throw new Error("No access token");
      }
    } catch (err) {
      try {
        // If verification fails, try to refresh the token
        const refreshResponse = await dispatch(refreshToken()).unwrap();
        return !!refreshResponse.access;
      } catch {
        return rejectWithValue("Token verification failed");
      }
    }
  }
);

// ** Get User Data **
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/dj-rest-auth/user/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Fetching user failed");
    }
  }
);

// ** Logout Thunk **
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.post(
    "http://127.0.0.1:8000/dj-rest-auth/logout/",
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  // Clear tokens
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  return null;
});

export const getPatient = createAsyncThunk(
  "auth/getPatient",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/patients/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Fetching patient failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ new_password1, new_password2 }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("access");
    console.log("Access Token:", accessToken);
    console.log("New Password 1:", new_password1);
    console.log("New Password 2:", new_password2);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/dj-rest-auth/password/change/`,
        { new_password1, new_password2 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Fetching patient failed");
    }
  }
);


export const deleteUser = createAsyncThunk(
  "auth/userDelete",
  async (_, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.pk;
    

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${userId}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

    } catch (err) {
      return rejectWithValue("Deleting user failed");
    }
  }
);


// ** Auth Slice **
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    closeAlert: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true; // ✅ Set authenticated state
        state.message = "Login successful";
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        console.log("Refresh", state.refresh);
        console.log("Acees", state.access);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.message = "Login Failed";
        state.isAuthenticated = false;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(verify.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.access = action.payload.access;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.access = null;
        state.isAuthenticated = false;
        state.user = null;
        state.message = "Logged out";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.message = "Activation Email Sent";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.message = "Registration Failed";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.message = "Email Verified";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.message = "Email Verification Failed";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = "Password Reset Email Sent";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.message = "Password Reset Failed";
      })
      .addCase(confirmResetPassword.fulfilled, (state, action) => {
        state.message = "Password Reset Successful";
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.message = "Password Reset Failed";
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.patient = action.payload;
        console.log(state.patient);

      });
  },
});

export const { closeAlert } = authSlice.actions;
export default authSlice.reducer;
