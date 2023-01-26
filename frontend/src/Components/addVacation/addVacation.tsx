import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Vacation from "../../Models/Vacation";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import "./addVacation.css";
import { Alert } from "@mui/material";
import { store } from "../redux/store";
import { addVacationSt, deleteVacationSt } from "../redux/vacationState";
import ModalAuth from "../modalAuth/modalAuth";

function AddVacation(): JSX.Element {
  const [modalShow, setModalShow] = useState(false);
  const { register, handleSubmit } = useForm<Vacation>();
  const [file, setFile] = useState("");
  const [alert, setAlert] = useState<Boolean>(false);
  const [pic, setPic] = useState<Boolean>(false);
  const [vacation, setVacation] = useState<Vacation>();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const myCurrentToken = localStorage.getItem("myToken");
  axios.defaults.headers.common = { Authorization: myCurrentToken };
  const [vacations, setVacations] = useState<Vacation[]>(
    store.getState().vacationState.vacationsSt
  );
  const alertOn = () => {
    if (alert === true) {
      return (
        <Alert variant="outlined" severity="error">
          Image size must be smaller than 530KB{" "}
        </Alert>
      );
    }
  };

  const setPicFunc = () => {
    setPic(true);
  };

  const updatePic = () => {
    if (pic === true) {
      return (
        <input
          className="form-control"
          type="file"
          {...register("vacation_img")}
        />
      );
    }
  };

  const modalUp = () => {
    if (modalShow === true) {
      return (
        <ModalAuth
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            navigate("/");
          }}
        />
      );
    }
  };

  useEffect(() => {
    if (id > 0) {
      const myVacation = vacations.filter((vacation) => vacation.id === id);
      setVacation(myVacation[0]);
    }
  }, []);

  //convert a file to string
  const getBase64 = (file: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        resolve(reader.result?.toString());
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  };

  const send = async (newVacation: Vacation) => {
    console.log(newVacation.start_date);
    if (newVacation.vacation_img[0]?.size > 57000) {
      setAlert(true);
    } else {
      try {
        console.log(newVacation.vacation_img[0]);
        console.log(await getBase64(newVacation.vacation_img[0]));
        setFile(await getBase64(newVacation.vacation_img[0]));
        newVacation.vacation_img = await getBase64(newVacation.vacation_img[0]);
      } catch (err: any) {
        console.log(err.message);
      }
      try {
        if (id === 0) {
          await axios
            .post("http://localhost:3003/admin/vacation/", newVacation)
            .then((res) => {
              console.log(res.data);
              const currentToken = res.headers["authorization"];
              localStorage.setItem("myToken", currentToken || "");
              const addProduct = res.data;
              //send a new vacation to redux-global state
              store.dispatch(addVacationSt(addProduct));
              setVacations(store.getState().vacationState.vacationsSt);
              navigate("/admin");
            });
        }
        if (id > 0) {
          newVacation.id = id;
          newVacation.description =
            newVacation.description || vacation?.description;
          newVacation.destination =
            newVacation.destination || vacation?.destination;
          newVacation.price = newVacation.price || vacation?.price;
          newVacation.start_date =
            newVacation.start_date || vacation?.start_date;
          newVacation.end_date = newVacation.end_date || vacation?.end_date;
          if (pic === false) {
            newVacation.vacation_img = vacation?.vacation_img;
          } else {
            newVacation.vacation_img = newVacation.vacation_img;
          }
          await axios
            .put("http://localhost:3003/admin/vacation/update", newVacation)
            .then(async (res) => {
              const addProduct = res.data;
              const currentToken = res.headers["authorization"];
              localStorage.setItem("myToken", currentToken || "");
              await store.dispatch(deleteVacationSt(id));
              console.log(store.getState().vacationState.vacationsSt);
              store.dispatch(addVacationSt(addProduct));
              console.log(store.getState().vacationState.vacationsSt);
              navigate("/admin");
            });
        }
      } catch (err: any) {
        if (err.message == "Request failed with status code 401") {
          setModalShow(true);
        }
        console.log(err.message);
      }
    }
  };

  return (
    <div className="addVacation">
      <div>{modalUp()}</div>
      <header>
        <MenuAdmin />
      </header>
      <div>
        <form className="add" onSubmit={handleSubmit(send)}>
          <h4 className="head">
            {id === 0 ? "Add Vacation:" : "Update Vacation:"}
          </h4>
          <div className="Alert">{alertOn()}</div>
          <label>Destination:</label>
          <input
            className="form-control"
            type="text"
            defaultValue={vacation?.destination}
            required
            {...register("destination")}
          />

          <label>Description:</label>
          <input
            className="form-control"
            type="text"
            defaultValue={vacation?.description}
            required
            {...register("description")}
          />

          <label>Start date:</label>
          <input
            className="form-control"
            type="date"
            defaultValue={
              vacation
                ? new Date(vacation?.start_date).toISOString().slice(0, 10)
                : ""
            }
            required
            {...register("start_date")}
          />

          <label>End date:</label>
          <input
            className="form-control"
            type="date"
            defaultValue={
              vacation
                ? new Date(vacation?.end_date).toISOString().slice(0, 10)
                : ""
            }
            required
            {...register("end_date")}
          />

          <label>Price:</label>
          <input
            className="form-control"
            type="number"
            defaultValue={vacation?.price}
            required
            {...register("price")}
          />

          <label>Relevance image:</label>
          {vacation ? (
            <>
              <p hidden>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={vacation?.vacation_img}
                  {...register("vacation_img")}
                />
              </p>
              <button
                className="btn btn-xs btn-link"
                type="button"
                onClick={setPicFunc}
              >
                Update Picture
              </button>
            </>
          ) : (
            <input
              className="form-control"
              type="file"
              {...register("vacation_img")}
            />
          )}
          <p>{updatePic()}</p>
          <p hidden>
                <input
                  className="form-control"
                  type="number"
                  defaultValue={vacation?.amountOfFollowers||0}
                  {...register("amountOfFollowers")}
                />
              </p>
          <input
            className="btn btn-primary"
            type="submit"
            value="save vacation"
          />
        </form>
      </div>
    </div>
  );
}

export default AddVacation;
