export default {
  palette: {
    primary: {
      light: "#e1bee7",
      main: "#9c27b0",
      dark: "#6a1b9a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#d1c4e9",
      main: "#673ab7",
      dark: "#4527a0",
      contrastText: "#fff",
    },
  },
  styles: {
    form: {
      textAlign: "center",
    },
    image: {
      width: "50px",
      height: "50px",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    button: {
      margin: "20px auto 20px auto",
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgb(0,0,0,0.1)",
      marginBottom: 20,
    },
    card: {
      display: "flex",
      marginBottom: 20,
    },
    cardContent: {
      width: "100%",
      flexDirection: "column",
      padding: 25,
    },
    cover: {
      minWidth: 200,
      objectFit: "cover",
    },
    handle: {
      width: 60,
      height: 20,
      backgroundColor: "#9c27b0",
      marginBottom: 7,
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: "rgb(0,0,0,0.3)",
      marginBottom: 10,
    },
    fullLine: {
      height: 15,
      width: "90%",
      backgroundColor: "rgb(0,0,0,0.6)",
      marginBottom: 10,
    },
    halfLine: {
      height: 15,
      width: "50%",
      backgroundColor: "rgb(0,0,0,0.6)",
      marginBottom: 10,
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-detail": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#9c27b0",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
    },
  },
};
