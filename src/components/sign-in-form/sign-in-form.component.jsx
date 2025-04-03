import {useState} from "react";

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import {ButtonsContainer} from "./sign-in-form.style";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/invalid-credential":
                    alert("Wrong email or password");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <ButtonsContainer>
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </div>
    );
};
export default SignInForm;
