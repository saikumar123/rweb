const Error = (props) => {
  if (props.data === "") {
    return <></>;
  } else {
    return <div style={{ color: "#FFEE28" }}> {props.data} </div>;
  }
};

export default Error;
