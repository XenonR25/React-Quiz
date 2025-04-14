import classes from "../styles/Form.module.css"

export default function Form({children,className,...rest}){
    return(
        <form action="#" className={`${className} ${classes.form}`} {...rest}>{children}</form>
    )
}