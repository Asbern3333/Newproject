import { useState } from "react";
function DelJobForm({ ondeleteJob }) {
  const [jobFormState, setJobFormState] = useState(0);
let id;
  const handleInputChange = (e) => {
    console.log(e.target.value);
    id=e.target.value;
    
  };
// 1) UseEffect to make POST request with information received from jobFormState
  const handleAddJobFormSubmit = async (e) => {
  
    e.preventDefault();

    // modal should close
    // form should clear
    const response= await fetch(`http://localhost:4002/todolists/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
      },
    });
    ondeleteJob();
     
  };

  return (
    <form onSubmit={handleAddJobFormSubmit} className="selection:bg-blue-200 flex flex-col gap-2">
      <h1>DELETE Job Posting</h1>
      <fieldset className="flex flex-col">
        <label htmlFor="id">ID</label>
        <input
          onChange={handleInputChange}
          value={id}
          type="number"
          name="id"
          id="aaa"
          className="bg-white border-4 focus:outline-none p-2"
        >{id}</input>
      </fieldset>

      <input
        className="bg-red-500 hover:bg-red-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
      />
    </form>
  );
}

export default DelJobForm;













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