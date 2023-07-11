import { useState } from "react";

const initialJobFormState = {
  todo: "",
  date: "",
  state: "",
  iau: "NAN", // important and urgent
};

function AddJobForm({ onAddJob }) {
  const [jobFormState, setJobFormState] = useState(initialJobFormState);

  const handleInputChange = (e) => {
    setJobFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e) => {
    setJobFormState((prevState) => ({
      ...prevState,
      iau: e.target.value,
    }));
  };
// 1) UseEffect to make POST request with information received from jobFormState


  const handleAddJobFormSubmit = async (e) => {
    e.preventDefault();
    // modal should close
    // form should clear
    const preparedJob={
      ...jobFormState,
    };
  
    const response=await fetch("http://localhost:4002/todolists/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(preparedJob),
    });
    const newJob=await response.json();
    onAddJob(newJob);
    setJobFormState(initialJobFormState);
    // new job should be added to the DOM
     
  };

  return (
    <form onSubmit={handleAddJobFormSubmit} className="selection:bg-blue-200 flex flex-col gap-2">
      <h1>Add Job Posting</h1>
      <fieldset className="flex flex-col">
        <label htmlFor="todo">To-Do</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.todo}
          type="text"
          name="todo"
          id="todo"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="date">Date</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.date}
          type="date"
          name="date"
          id="date"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>

      <fieldset className="flex flex-col">
        <label htmlFor="state">State</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.state}
          type="number"
          name="state"
          id="state"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>

      <fieldset className="flex flex-col">
        <label>
          <span>Select whether it is important or not</span>
        </label>
        <select name="userdecide" id="sel" onChange={handleSelectChange}>
          <option  value="alert" selected disabled>Press to select</option>
          <option id="1" value="IAU">Important and urgent</option>
          <option id="2" value="IAN">Important and not urgent</option>
          <option id="3" value="NAU">Not important and urgent</option>
          <option id="4" value="NAN">Not important and not urgent</option>
        </select>
      </fieldset>

      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
      />
    </form>
  );
}

export default AddJobForm;













/*useEffect(()=>{
  async function postjob(url="",data={})
  {
 const reponse = await fetch(url, {
   method:"POST",
  mode:"cors", // check what cors value you need to use
  cache: "no-cache",
  credentials: "same-origin",
  // sets the datatype, we want "application/json",  
  headers:{
    "Content-type":"application/joson",
   },
   redirect:"follow",
   referrerPolicy:"no-referrer",
  
  body: JSON.stringify(data),
});
return Response.json();
}
postjob("http://localhost:4002/todolist",{answer:42}).then((data)=>{
  console.log(data)
})
});
*/