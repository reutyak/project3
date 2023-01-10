import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Vacation from "../../Models/Vacation";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import "./addVacation.css";
import { Alert } from "@mui/material";
import { store } from "../redux/store";
import { addVacationSt, deleteVacationSt, updateVacationSt, vacationActionType } from "../redux/vacationState";

function AddVacation(): JSX.Element {
    const { register, handleSubmit } = useForm<Vacation>();
    const [file, setFile] = useState("");
    const [alert, setAlert] = useState<Boolean>(false);
    const [vacation, setVacation] = useState<Vacation>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const myCurrentToken = localStorage.getItem("myToken");
    axios.defaults.headers.common = {'Authorization': myCurrentToken}
    // var storageVacation = JSON.parse(localStorage.vacations);
    // const [vacations, setVacations] = useState<Vacation[]>(storageVacation);
    const [vacations, setVacations] = useState<Vacation[]>(store.getState().vacationState.vacationsSt);
    // store.subscribe(()=>{
    //     setVacations(store.getState().vacationState.vacations);
    // });
    const alertOn = ()=>{
        if (alert === true){
            return <Alert variant="outlined" severity="error">Image size must be smaller than 530KB </Alert>
        }
    };

    // useEffect(() => {
    //     localStorage.setItem('vacations', JSON.stringify(vacations));
    //   }, [vacations]);
    
    useEffect(()=>{
        if (id > 0 ){
            const myVacation = (vacations.filter(vacation => vacation.id === id));
            setVacation(myVacation[0]);
            // axios.get(`http://localhost:3003/admin/vacation/single/${params.id}`)
            // .then(response => setVacation(response.data[0]));
        }
    },[]);

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
        })
    }
    
    const send = async (newVacation: Vacation) => {
        if(newVacation.vacation_img[0].size>57000){
            setAlert(true);
        }else{
        console.log(newVacation.vacation_img[0])
        console.log(await getBase64(newVacation.vacation_img[0]));
        setFile(await getBase64(newVacation.vacation_img[0]));
        newVacation.vacation_img = await getBase64(newVacation.vacation_img[0]);
        try {
            if (id===0){
                await axios.post("http://localhost:3003/admin/vacation/",newVacation,
                )
                .then(res=>{
                    console.log(res.data);
                    const currentToken = res.headers["authorization"];
                    localStorage.setItem("myToken", currentToken||"");
                    const addProduct = res.data;
                    // (addProduct.amountOfFollowers?addProduct.amountOfFollowers=0:addProduct.amountOfFollowers="NULL")
                    //update the localStorage
                    // storageVacation.push(newVacation);
                    // setVacations(storageVacation);
                    // localStorage.setItem("vacations", JSON.stringify(vacations));
                    // console.log(newVacation);
                    //send a new vacation to redux-global state
                    store.dispatch(addVacationSt(addProduct));
                    setVacations(store.getState().vacationState.vacationsSt);
                    navigate("/admin");
                });
            }
            if(id>0){
                newVacation.id = id;
                newVacation.description = newVacation.description || vacation?.description;
                newVacation.destination = newVacation.destination || vacation?.destination;
                newVacation.price = newVacation.price || vacation?.price;
                newVacation.start_date = newVacation.start_date || vacation?.start_date;
                newVacation.end_date = newVacation.end_date || vacation?.end_date;
                newVacation.vacation_img = newVacation.vacation_img || vacation?.vacation_img;
                await axios.put("http://localhost:3003/admin/vacation/update", newVacation)
                .then(res=>{
                    //update the localStorage
                    // storageVacation = storageVacation.filter((vacation: { id: number; })=> (vacation.id !== id));
                    // storageVacation.push(newVacation);
                    // setVacations(storageVacation);
                    // localStorage.setItem("vacations", JSON.stringify(vacations));
                    const addProduct = res.data;
                    // store.dispatch(updateVacationSt(addProduct));
                    const currentToken = res.headers["authorization"];
                    localStorage.setItem("myToken", currentToken||"");
                    store.dispatch(deleteVacationSt(id));
                    console.log(store.getState().vacationState.vacationsSt);
                    store.dispatch(addVacationSt(addProduct));
                    console.log(store.getState().vacationState.vacationsSt);
                    // setVacations(store.getState().vacationState.vacationsSt);
                    navigate("/admin");
                });
            }
                
        } catch (err: any) {
            console.log(err.message);
        }}
    }

    return (
        <div className="addVacation">
			<header><MenuAdmin/></header>
            <div className="Box">
                <form onSubmit={handleSubmit(send)}>
                    <h2>Add Vacation!</h2>
                    <div className = "Alert">{alertOn()}</div>
                    <label>destination:</label>
                    <input type="text" defaultValue={vacation?.destination} required {...register("destination")}/>
        
                    <label>description:</label>
                    <input type="text" defaultValue={vacation?.description} required {...register("description")}/>

                    <label>start_date:</label>
                    <input type="date" defaultValue={vacation?(new Date(vacation?.start_date)).toISOString().slice(0,10):""}  required {...register("start_date")}/>

                    <label>end_date:</label>
                    <input type="date" defaultValue={vacation?(new Date(vacation?.end_date)).toISOString().slice(0,10):""} required {...register("end_date")}/>

                    <label>price:</label>
                    <input type="number" defaultValue={vacation?.price} required {...register("price")}/>

                    <label>vacation_img:</label>
                    <input type="file" defaultValue={vacation?.vacation_img} {...register("vacation_img")} />
                    

                    <input type="submit" value="save vacation" style={{ height: 50, backgroundColor: "blue", borderRadius: 20 }} />
                </form>
            </div>
        </div>
    );
    }

export default AddVacation;
