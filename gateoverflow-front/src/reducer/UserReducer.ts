import { toast } from "react-toastify";

const UserReducer = (state: any, action: any) => {
  switch (action.type) {

    case "HANDLE_LOGIN":
      let userImage;
      let userImageLoaded;
      let loggedIn;

      sessionStorage.setItem("isloggedIn", JSON.stringify(action.payload));
      if (action.payload.userimage === "empty") {
        console.log("object");
        userImage = "logo512.png";
        userImageLoaded = false;
      } else {
        userImage = action.payload.userimage;
        userImageLoaded = true;
      }

      return {
        ...state,
        isLoggedIn: true,
        userDetailInfo: action.payload,
        userImage: userImage,
        imageLoaded: userImageLoaded,
      };

    case "HANDLE_USER_UPDATE":
      const { username, newdata } = action.payload;
      fetch("http://localhost:5000/updateuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          newdata,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "OK") {
            toast.success("Data Updated !!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
      return state;

    case "HANDLE_USER_PASSWORD_UPDATE":
        const{password,newpassword}=action.payload;
        fetch("http://localhost:5000/updatepassword", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            password,
            newpassword
            }),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "FAILED") {
            toast.error("No Password Match", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.success("Password Updated !!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
        return state;

    default:
      return state;
  }
};

export default UserReducer;
