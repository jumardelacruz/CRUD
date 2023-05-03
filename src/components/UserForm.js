import { Form, useNavigate, useActionData } from "react-router-dom";
import { json, redirect, useSubmit } from "react-router-dom";
import classes from "./UserForm.module.css";
import { useRef } from "react";
import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isFourChars = (value) => value.trim().length === 4;
const isEmail = (value) => value.includes("@");
const isTenDigit = (value) => value.trim().length === 10;

function UserForm({ method, user }) {
  const formRef = useRef();
  const submit = useSubmit();

  const data = useActionData();

  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  let {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  let {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
  } = useInput(isNotEmpty);

  let {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  let {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty);

  let {
    value: suiteValue,
    isValid: suiteIsValid,
    hasError: suiteHasError,
    valueChangeHandler: suiteChangeHandler,
    valueBlurHandler: suiteBlurHandler,
  } = useInput(isNotEmpty);

  let {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);

  let {
    value: zipcodeValue,
    isValid: zipcodeIsValid,
    hasError: zipcodeHasError,
    valueChangeHandler: zipcodeChangeHandler,
    valueBlurHandler: zipcodeBlurHandler,
  } = useInput(isFourChars);

  let {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
  } = useInput(isTenDigit);

  let {
    value: websiteValue,
    isValid: websiteIsValid,
    hasError: websiteHasError,
    valueChangeHandler: websiteChangeHandler,
    valueBlurHandler: websiteBlurHandler,
  } = useInput(isNotEmpty);

  let {
    value: companyValue,
    isValid: companyIsValid,
    hasError: companyHasError,
    valueChangeHandler: companyChangeHandler,
    valueBlurHandler: companyBlurHandler,
  } = useInput(isNotEmpty);

  console.log("Name Is Valid ", nameIsValid);

  let formIsValid = false;

  if (
    nameIsValid &&
    usernameIsValid &&
    emailIsValid &&
    streetIsValid &&
    suiteIsValid &&
    cityIsValid &&
    zipcodeIsValid &&
    phoneIsValid &&
    websiteIsValid &&
    companyIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    let userData = {
      name: nameValue,
      username: usernameValue,
      email: emailValue,
      street: streetValue,
      city: cityValue,
      zipcode: zipcodeValue,
      suite: suiteValue,
      phone: phoneValue,
      website: websiteValue,
      company: companyValue,
    };

    // overiding
    if (method === "PATCH") {
      if (!nameValue) {
        userData.name = user.name;
        nameIsValid = isNotEmpty(userData.name);
      }
      if (!usernameValue) {
        userData.username = user.username;
        usernameIsValid = isNotEmpty(userData.username);
      }
      if (!emailValue) {
        userData.email = user.email;
        emailIsValid = isEmail(userData.email);
      }
      if (!streetValue) {
        userData.street = user.address.street;
        streetIsValid = isNotEmpty(userData.street);
      }
      if (!cityValue) {
        userData.city = user.address.city;
        cityIsValid = isNotEmpty(userData.city);
      }
      if (!zipcodeValue) {
        userData.zipcode = user.address.zipcode;
        zipcodeIsValid = isFourChars(userData.zipcode);
      }
      if (!suiteValue) {
        userData.suite = user.address.suite;
        suiteIsValid = isNotEmpty(userData.suite);
      }
      if (!phoneValue) {
        userData.phone = user.phone;
        phoneIsValid = isTenDigit(userData.phone);
      }
      if (!websiteValue) {
        userData.website = user.website;
        websiteIsValid = isNotEmpty(userData.website);
      }
      if (!companyValue) {
        userData.company = user.company.name;
        companyIsValid = isNotEmpty(userData.company);
      }

      if (
        nameIsValid &&
        usernameIsValid &&
        emailIsValid &&
        streetIsValid &&
        suiteIsValid &&
        cityIsValid &&
        zipcodeIsValid &&
        phoneIsValid &&
        websiteIsValid &&
        companyIsValid
      ) {
        formIsValid = true;
      }

      // Validation for Edit
    }

    if (!formIsValid) {
      alert(" Please check Error Message/s !");
      return;
    }

    submit(userData, { method: method, encType: "multipart/form-data" });
  };

  const nameClasses = nameHasError ? "invalid" : "";
  const usernameClasses = usernameHasError ? "invalid" : "";
  const emailClasses = emailHasError ? "invalid" : "";
  const streetClasses = streetHasError ? "invalid" : "";
  const suiteClasses = suiteHasError ? "invalid" : "";
  const cityClasses = cityHasError ? "invalid" : "";
  const zipcodeClasses = zipcodeHasError ? "invalid" : "";
  const phoneClasses = phoneHasError ? "invalid" : "";
  const websiteClasses = websiteHasError ? "invalid" : "";
  const companyClasses = companyHasError ? "invalid" : "";

  return (
    <Form
      ref={formRef}
      method={method}
      className={classes.form}
      onSubmit={confirmHandler}
    >
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <div className={nameClasses}>
        <label htmlFor="name">
          Name {"    "}
          {nameHasError && (
            <span className={classes.error_text}>
              ( Name must not be empty. )
            </span>
          )}
        </label>
        <input
          style={{
            borderColor: !nameClasses ? "" : "red",
          }}
          id="name"
          type="text"
          name="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          defaultValue={user ? user.name : ""}
          autoComplete="off"
        />
      </div>

      <div className={usernameClasses}>
        <label htmlFor="username">
          Userame {"    "}
          {usernameHasError && (
            <span className={classes.error_text}>
              ( Username must not be empty. )
            </span>
          )}
        </label>
        <input
          style={{
            borderColor: !usernameClasses ? "" : "red",
          }}
          id="username"
          type="text"
          name="username"
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          defaultValue={user ? user.username : ""}
          autoComplete="off"
        />
      </div>

      <div className={emailClasses}>
        <label htmlFor="email">
          Email {"    "}
          {emailHasError && (
            <span className={classes.error_text}>
              (Please enter valid email. )
            </span>
          )}
        </label>
        <input
          style={{
            borderColor: !emailClasses ? "" : "red",
          }}
          id="email"
          type="email"
          name="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          defaultValue={user ? user.email : ""}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="address">
          Address{"    "}
          {streetHasError && (
            <span className={classes.error_text}>
              ( Street must not be empty. )
            </span>
          )}
          {suiteHasError && (
            <span className={classes.error_text}>
              {" "}
              ( Suite must not be empty. )
            </span>
          )}
          {cityHasError && (
            <span className={classes.error_text}>
              ( City must not be empty. )
            </span>
          )}
          {zipcodeHasError && (
            <span className={classes.error_text}>
              ( Zipcode must 4 dgit long.)
            </span>
          )}
        </label>

        <div className={classes.address}>
          <input
            style={{
              borderColor: !streetClasses ? "" : "red",
            }}
            id="street"
            type="text"
            name="street"
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            defaultValue={user ? user.address.street : ""}
            autoComplete="off"
            placeholder="Street"
          />
          &nbsp;
          <input
            style={{
              borderColor: !suiteClasses ? "" : "red",
            }}
            id="suite"
            type="text"
            name="suite"
            onChange={suiteChangeHandler}
            onBlur={suiteBlurHandler}
            defaultValue={user ? user.address.suite : ""}
            autoComplete="off"
            placeholder="Suite"
          />
          &nbsp;
          <input
            style={{
              borderColor: !cityClasses ? "" : "red",
            }}
            id="city"
            type="text"
            name="city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            defaultValue={user ? user.address.city : ""}
            autoComplete="off"
            placeholder="City"
          />
          &nbsp;
          <input
            style={{
              borderColor: !zipcodeClasses ? "" : "red",
            }}
            id="zipcode"
            type="text"
            name="zipcode"
            onChange={zipcodeChangeHandler}
            onBlur={zipcodeBlurHandler}
            defaultValue={user ? user.address.zipcode : ""}
            autoComplete="off"
            placeholder="Zipcode"
          />
        </div>
      </div>

      <div className={phoneClasses}>
        <label htmlFor="phone">
          Phone {"    "}
          {phoneHasError && (
            <span className={classes.error_text}>
              ( Phone must be 10 characters long with corrected format. )
            </span>
          )}
        </label>
        <input
          style={{
            borderColor: !phoneClasses ? "" : "red",
          }}
          id="phone"
          type="text"
          name="phone"
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          defaultValue={user ? user.phone : ""}
          autoComplete="off"
        />
      </div>

      <div className={websiteClasses}>
        <label htmlFor="website">
          Website {"    "}
          {websiteHasError && (
            <span className={classes.error_text}>
              ( Please enter valid website. )
            </span>
          )}
        </label>
        <input
          style={{
            borderColor: !websiteClasses ? "" : "red",
          }}
          id="website"
          type="url"
          name="website"
          onChange={websiteChangeHandler}
          onBlur={websiteBlurHandler}
          defaultValue={user ? user.website : ""}
          autoComplete="off"
        />
      </div>

      <div className={companyClasses}>
        <label htmlFor="company">
          Company {"    "}
          {companyHasError && (
            <span className={classes.error_text}>
              ( Company must not be empty. )
            </span>
          )}
        </label>
        <input
          style={{
            borderColor: !companyClasses ? "" : "red",
          }}
          id="company"
          type="text"
          name="company"
          onChange={companyChangeHandler}
          onBlur={companyBlurHandler}
          defaultValue={user ? user.company.name : ""}
          autoComplete="off"
        />
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default UserForm;

export async function action({ request, params }) {
  console.log("add action in UserForm called");
  console.log(request);
  console.log(params);

  const method = await request.method;
  //you can access localStorage here

  const data = await request.formData();

  const userData = {
    name: data.get("name"),
    username: data.get("username"),
    email: data.get("email"),
    address: {
      street: data.get("street"),
      suite: data.get("suite"),
      city: data.get("city"),
      zipcode: data.get("zipcode"),
    },
    phone: data.get("phone"),
    website: data.get("website"),
    company: {
      name: data.get("company"),
    },
  };

  let url = "http://localhost:8080/users";

  if (method === "PATCH") {
    const userId = params.userId;
    url = "http://localhost:8080/users/" + userId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save user." }, { status: 500 });
  }

  return redirect("/users");
}
