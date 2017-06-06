import LoginImg from "../../../../../public/images/back.png";
import RegisterImg from "../../../../../public/images/back2.png";

export const universalStyles = {
  margin_left_minus_15: {
    marginLeft: -15
  },
  header: {
    marginTop: 12,
    color: '#FFFFFF',
  }
};

export const commentStyles = {
  comment: {
    commentsContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: '100%',
      padding: 15,

    },
    commentsBox: {
      overflowY: 'scroll',
      height: '50%',
    },
    singleComment: {
      fontSize: 15,
      fontWeight: 400,
      overflowWrap: 'break-word'
    },
    commentsList: {
      padding: 0,
      color: '#ffffff',
      listStyleType: 'none',
    },
    pipeStyle: {
      fontWeight: 200,
      marginLeft: 12,
      marginRight: 12,
      color: '#bbbbbb'
    },
    nameAndDate: {
      fontWeight: 200,
      color: '#bbbbbb'
    }
  }
};
export const userStyle = {
  usersSidebarDiv: {
    width: "20%",
    height: "100%",
    position: "absolute",
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12
  },
  refreshButton: {
    position: "absolute",
    bottom: "2%",
    width: "92%"
  },
  hr_style: {
    marginBottom: "10%"
  }
};
export const placeStyle = {
  container: {
    padding: 16,
    background: '#f9f9f9',
    marginTop: 12,
    marginLeft: 16,
    border: '1px solid #ddd'
  },
  header: {
    marginTop: 0,
    marginBottom: 0
  },
  title: {
    textDecoration: 'none',
    color: 'red'
  },
  inputs: {
    textArea: {
      width: "93%"
    }
  }
};

export const formsStyle = {
  loginStyle: {
    backgroundImage: `url(${LoginImg})`,
    backgroundSize: 'cover',
    position: 'fixed',
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    top: 0,
    left: 0
  },
  registerStyle: {
    backgroundImage: `url(${RegisterImg})`,
    backgroundSize: 'cover',
    position: 'fixed',
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    top: 0,
    left: 0
  },
  warningPrompt: {
    color: 'red'
  },
  errorMessage: {
    margin: 12,
    padding: 6
  }
};
export const chatStyle = {
  chatWidget: {
  },
  chatPage: {
  }
};