import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSave,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showFormPassword, setshowFormPassword] = useState(false);
  const [passwords, setPasswords] = useState(() => {
    const response = localStorage.getItem("passwords");
    const data = JSON.parse(response);
    return data ? data : [];
  });

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    if (errors.website || errors.username || errors.password) {
      toast.error("Please fill out all required fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [errors]);

  const onSubmit = (data) => {
    if (editIndex === null) {
      setPasswords([
        ...passwords,
        {
          site: data.website,
          username: data.username,
          password: data.password,
          showPassword: false,
        },
      ]);
      toast.success("Password saved successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const updatedPasswords = passwords.map((item, index) =>
        index === editIndex
          ? {
              site: data.website,
              username: data.username,
              password: data.password,
              showPassword: item.showPassword,
            }
          : item
      );
      setPasswords(updatedPasswords);
      toast.success("Password edited successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setEditIndex(null);
    setPassword("");
    setSite("");
    setUsername("");
    reset();
  };

  const handleTogglePassword = (index) => {
    const updatedPasswords = passwords.map((item, i) =>
      i === index ? { ...item, showPassword: !item.showPassword } : item
    );
    setPasswords(updatedPasswords);
  };

  const handleToggleFormPassword = () => {
    setshowFormPassword(!showFormPassword);
  };

  const changeEditIndex = (index) => {
    setEditIndex(index);
    setSite(passwords[index].site);
    setUsername(passwords[index].username);
    setPassword(passwords[index].password);
  };

  const deletePassword = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmed) {
      setPasswords(passwords.filter((_, i) => i !== index));
      toast.success("Password deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-center mt-8 text-xl flex flex-col gap-3 items-center w-10/12 mx-auto text-gray-200"
      >
        <div className="w-full flex max-sm:flex-wrap justify-center items-center">
          <label htmlFor="website-name" className="w-2/12 max-sm:w-full">
            Website:
          </label>
          <input
            className={`h-12 p-3 border-2 rounded-full w-10/12 outline-none max-sm:w-full ${
              errors.website ? "border-red-500" : "border-gray-600 bg-black"
            }`}
            placeholder="Enter website"
            {...register("website", { required: true })}
            id="website-name"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            autoFocus
          />
        </div>
        <div className="w-full flex flex-wrap items-center justify-center max-sm:flex-col">
          <label htmlFor="username" className="w-2/12 max-sm:w-full">
            Username:
          </label>
          <input
            className={`h-12 rounded-full p-2 border-gray-600 bg-black border-2 w-5/12 max-sm:w-full max-md:w-10/12 outline-none max-md:my-3 ${
              errors.username ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Enter username"
            {...register("username", { required: true })}
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="w-2/12 max-sm:w-full">
            Password:
          </label>
          <div className="relative w-3/12 max-sm:w-full max-md:w-10/12 max-md:my-3">
            <input
              className={`h-12 rounded-full p-2 border-gray-600 bg-black border-2 w-full pr-10 outline-none ${
                errors.password ? "border-red-700" : "border-gray-600"
              }`}
              type={showFormPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", { required: true })}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 px-3 text-gray-400"
              onClick={handleToggleFormPassword}
              type="button"
            >
              <FontAwesomeIcon icon={showFormPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-gold p-1 py-2 w-3/5 mt-4 rounded-full cursor-pointer text-black"
        >
          {editIndex !== null ? (
            <>
              <FontAwesomeIcon icon={faSave} className="mr-4" />
              Save Password
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSave} className="mr-4" />
              Add Password
            </>
          )}
        </button>
      </form>

      <div className="mt-4 w-[80%] mx-auto text-gray-200">
        {passwords.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Stored Passwords</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-white">
                    <th className="p-3 bg-gray-800 rounded-tl-2xl">Site</th>
                    <th className="p-3 bg-gray-800 min-w-32">Username</th>
                    <th className="p-3 bg-gray-800 min-w-32">Password</th>
                    <th className="p-3 bg-gray-800 rounded-tr-2xl min-w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" border border-gray-800">
                  {passwords.map((password, index) => (
                    <tr
                      key={index}
                      className="text-gray-400 border-b border-gray-800"
                    >
                      <td className="p-3 bg-black">{password.site}</td>
                      <td className="p-3 bg-black">{password.username}</td>
                      <td className="p-3 bg-black">
                        {password.showPassword ? (
                          <span className="mr-2">{password.password}</span>
                        ) : (
                          <span className="mr-2">
                            {"•".repeat(password.password.length)}
                          </span>
                        )}
                        <button
                          onClick={() => handleTogglePassword(index)}
                          className="text-gold"
                        >
                          <FontAwesomeIcon
                            icon={password.showPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      </td>
                      <td className="p-3 bg-black">
                        <button
                          onClick={() => changeEditIndex(index)}
                          className="text-blue-400 mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => deletePassword(index)}
                          className="text-red-500"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-xl text-gray-400">No passwords saved yet.</p>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Form;

