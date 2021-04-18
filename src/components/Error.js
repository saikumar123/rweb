const Error = (props) => {
  if (props.data === "") {
    return <></>;
  } else {
    return <div style={{ color: "red" }}> {props.data} </div>;
  }
};

export default Error;
