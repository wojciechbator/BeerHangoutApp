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
      height: 650,
      padding: 15,

    },
    commentsBox: {
      overflowY: 'scroll',
      height: '50%',
      maxHeight: 500
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
    minWidth: '350',
    padding: 8,
    width: '30%',
    height: 650,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: "ffffff",
    overflowWrap: 'break-word'


  },
  refreshButton: {

    width: "92%",
    marginLeft: 10

  },
  hr_style: {
    marginBottom: "10%"
  },
  userList: {
    color: '#ffffff',
    paddingBottom: 8,
    border:0,
      pointPadding:0,
      borderWidth:0,
      marginRight:0
  },
  userBox: {
    overflowY: 'scroll',
    height: '80%',
      width: '100%',
    maxHeight: 500,
      marginBottom: 10,
    justifyItems: 0,
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
export const textStyle ={
bold:{
  fontWeight:20,
    fontColor:"#F12345"

}

}
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

export const aStyle = {
  color: 'inherit',
  textDecoration: 'inherit'
}

export const menuButton = {
  position: 'relative',
  verticalAlign: 'middle',
  lineHeight: 1,
  textDecoration: 'none',
  webkitTapHighlightColor: 'transparent',
  webkitBoxFlex: '0',
  webkitFlex: '0 0 auto',
  msFlex: '0 0 auto',
  flex: '0 0 auto',
  webkitUserSelect: 'none',
  mozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  background: 'none',
  padding: '0.92857143em 1.14285714em',
  textTransform: 'none',
  color: 'rgba(0, 0, 0, 0.87)',
  fontWeight: 'normal',
  webkitTransition: 'background 0.1s ease, box-shadow 0.1s ease, color 0.1s ease',
  transition: 'background 0.1s ease, box-shadow 0.1s ease, color 0.1s ease',
  fontcolor: 'rgba(0, 0, 0, 0.87)',
};
