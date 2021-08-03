function Welcome(props){
    return(
        <p>Hello, {props.name ? props.name : "who are u?" }</p>
    )
};

export default Welcome;