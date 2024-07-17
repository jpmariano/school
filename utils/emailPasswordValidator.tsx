import validator from "validator";
import { stringSimilarity } from "string-similarity-js";

export const validateEmail = (email: string): boolean  => {
    //https://github.com/validatorjs/validator.js
    if (validator.isEmail(email)) {
        return true;
    } else {
        if(email !== ""){
            return false;
        } else {
            return true;
        }
        
    }
}

const validatePassword = (email: string, password: string): boolean  => {
    //https://github.com/validatorjs/validator.js
    if(validator.isStrongPassword(password) && (!(/(.)\1/).test(password))){
        if (email !== "") {
            //https://www.npmjs.com/package/string-similarity-js
            if(stringSimilarity(email, password) > .8){
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
        
    } else {
        return false;
    }
}

export default validatePassword;

