import React, { useState, useRef } from "react";
import Logo from "../elements/common/Logo";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";


export const JoinUs = () => {
  const [validate, setValidate] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refConfirmPassword = useRef();
  const Clear = () => {
    setValidate("");
    setName("");
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setconfirmPassword("");
  };
  const toastOption = {
    autoClose: 2000,
    pauseOnHover: true,
    position: "top-center",
  };
  const Register = async () => {
    if (name === "") {
      setValidate("ຊື່ວ່າງເປົ່າ !");
      refUsername.current.focus();
    } else if (email === "") {
      setValidate("ອີ່ເມລວ່າງເປົ່າ !");
      refEmail.current.focus();
    } else if (password === "") {
      setValidate("ລະຫັດວ່າງເປົ່າ !");
      refPassword.current.focus();
    } else if (confirmpassword === "") {
      setValidate("ລະຫັດຢືນຢັນວ່າງເປົ່າ !");
      refConfirmPassword.current.focus();
    } else {
      if (password !== confirmpassword) {
        setValidate("ລະຫັດຜ່ານບໍ່ກົງກັນ !");
      } else {
        setLoading(true);
        axios
          .post(
            "http://inventory.localhost:8000/api/user/register/",
            {
              username: name,
              password: password,
              email: email,
              first_name: firstname,
              last_name: lastname,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            setLoading(false);
            toast.success(`OK !`, toastOption);
            Clear();
            // var decoded = jwt_decode(result.data.access);
            // localStorage.setItem("token_access", JSON.stringify(result.data));
            // localStorage.setItem("user_permission", JSON.stringify(decoded));
            // var user_permission = localStorage.getItem("user_permission");
            // var permission = JSON.parse(user_permission);
            // console.log(permission);
            // router.push("/Admin").then(()=>Clear());
          })
          .catch((err) => {
            setLoading(false);
            setValidate("");
            if (err.response?.status === 403) {
              toast.error(`ສິດທິຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງ !`, toastOption);
            } else if (err.response?.status === 400) {
              toast.error("ຂໍອະໄພ ! ເກີດຂໍ້ຜິດພາດ ! ! !", toastOption);
              setValidate(err.response?.data.username);
            } else {
              toast.error(`ມີບາງຢ່າງຜິດພາດ:  ${err}`, toastOption);
            }
          });
      }
    }
  };
  return (
    <div id="contact">
      <section className="py-24 md:pb-28 text-coolGray-900 dark:text-white">
        <div className="container px-4 mx-auto">
          <div data-aos="fade-up" className="flex flex-wrap mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
              <div className="relative transition-all h-full overflow-hidden max-w-max mx-auto rounded-md">
                <img
                 className="cursor-pointer transition ease-in-out hover:scale-125 duration-700"
                  src='flex-ui-assets/logos/bi.webp'
                  alt="image"
                />
              </div>
            </div>
            {/* END OF IMAGE */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="container px-4 mx-auto mb-16 ">
                <div className="w-full lg:w-1/2 md-items-center">
                  <div className="max-w-sm mx-auto">
                    <div className="mb-6 text-center">
                      <div className="flex justify-center">
                        <Logo />
                      </div>
                      <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                        ເຂົ້າຮ່ວມກັບພວກເຮົາ
                      </h3>
                      <p className="text-lg font-medium">
                        ເລີ່ມຕົ້ນການເດີນທາງຂອງທ່ານກັບຜະລິດຕະພັນຂອງພວກເຮົາ
                      </p>
                    </div>
                    <div className="mb-2">
                      <label
                        for="username"
                        className={`${
                          validate === "ຊື່ວ່າງເປົ່າ !" ? "text-red-500" : ""
                        } mb-2 font-medium`}
                      >
                        User Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="username"
                        className={`${
                          validate === "ຊື່ວ່າງເປົ່າ !" ? "border-red-500" : ""
                        } border outline-none rounded-md w-full p-2`}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        value={name}
                        ref={refUsername}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="fname"
                        aria-label="Left align"
                        className={`mb-2 font-medium`}
                      >
                        First Name
                      </label>
                      <input
                        id="fname"
                        className={`border outline-none rounded-md w-full p-2`}
                        onChange={(e) => setFirstname(e.target.value)}
                        type="text"
                        value={firstname}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="lname"
                        aria-label="Left align"
                        className={`mb-2 font-medium`}
                      >
                        Last Name
                      </label>
                      <input
                        id="lname"
                        className={`border outline-none rounded-md w-full p-2`}
                        onChange={(e) => setLastname(e.target.value)}
                        type="text"
                        value={lastname}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="email"
                        aria-label="Left align"
                        className={`block ${
                          validate === "ອີ່ເມລວ່າງເປົ່າ !" ? "text-red-500" : ""
                        } mb-2 font-medium`}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        className={`${
                          validate === "ອີ່ເມລວ່າງເປົ່າ !"
                            ? "border-red-500"
                            : ""
                        } border outline-none rounded-md w-full p-2`}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        value={email}
                        ref={refEmail}
                        placeholder="xxx@xxxxx.com"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="pwd"
                        aria-label="Left align"
                        className={`block ${
                          validate === "ລະຫັດວ່າງເປົ່າ !" ? "text-red-500" : ""
                        } mb-2 font-medium`}
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="pwd"
                        className={`${
                          validate === "ລະຫັດວ່າງເປົ່າ !"
                            ? "border-red-500"
                            : ""
                        } border outline-none rounded-md w-full p-2`}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        ref={refPassword}
                        placeholder="password"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="cpwd"
                        aria-label="Left align"
                        className={`block ${
                          validate === "ລະຫັດຢືນຢັນວ່າງເປົ່າ !"
                            ? "text-red-500"
                            : ""
                        } mb-2 font-medium`}
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="cpwd"
                        className={`${
                          validate === "ລະຫັດຢືນຢັນວ່າງເປົ່າ !"
                            ? "border-red-500"
                            : ""
                        } border outline-none rounded-md w-full p-2`}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        type="password"
                        value={confirmpassword}
                        ref={refConfirmPassword}
                        placeholder="password"
                      />
                    </div>
                    <div className="py-1 text-center text-red-500">
                      {validate}
                    </div>
                    <button
                      disabled={loading ? true : false}
                      type="button"
                      onClick={() => Register()}
                      className={`
                ${loading ? "cursor-not-allowed disabled:opacity-50" : ""}
                bg-yellow-500 hover:bg-yellow-600 text-white flex mr-2 justify-center outline-none rounded-md p-2 w-full mb-2`}
                    >
                      {loading ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="mr-2 w-6 h-6 animate-spin text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      ) : null}
                      {loading ? "" : "ຕົກລົງ"}
                    </button>{" "}
                    <p className="text-center">
                      <span className="text-base font-medium">
                        ມີລະຫັດແລ້ວ?
                      </span>
                      <Link href="/Login">
                        <a className="inline-block text-base font-medium text-yellow-500 hover:text-yellow-600 hover:underline">
                          ເຂົ້າສູ່ລະບົບ
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* END OF CARD INPUT */}
          </div>
        </div>
      </section>
    </div>
  );
};
