//use state to make an object or var with set function+ the formala 
//useEffect run by it self every amount of time. 
import { useState,useEffect } from 'react'
import './App.css'
import Outputlist from './Outputlist';
  //classNames is a html and css  but we use it in java scripte
import classNames from "classnames";
import AddModal from "./ui/AddModal";
import DeleteModal from "./ui/deleteModal";
import AddJobForm from "./AddJobForm";
import DelJobForm from "./DeletejobForm";
import Updatemodle from "./ui/Updatemodle";
import UpJobForm from "./Updatejobform"

// to select the button
const statuses= {
  1:"Working on",
  2:"removed",
  3:"finished",
};
export default function MyApp() {  
 
  const [todolist,setToDoList]=useState([]);
//to select the 
  const [selectedStatus,setSelectedStatus]=useState(1);

  const [isModalVisible, setIsModalVisible]=useState(false);
  const [deleteVisible, setIsModalVisible1]=useState(false);
  const [updateVisible, setIsModalVisible2]=useState(false);
  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch("http://localhost:4002/todolists");
      const todoList = await response.json();      
      setToDoList(todoList);
      return todoList;
    }
  
    fetchJobs();
    
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        hideModal();
        hidedelete();
        hideupdate();
      }
    };
    
  
    console.log("adding event listener");
    window.addEventListener("keydown", handleEscape);
  
    return () => {
      console.log("removing event listener");
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);
  


  //console.log(selectedStatus);
//  console.log(todolist)
//   todolist.forEach(it=>console.log(it.to))

  const filterIU=todolist.filter(todo=>(todo.iau=="IAU"&&todo.state==selectedStatus));
  const IU=filterIU.map((todo,i)=>{
  return( <Outputlist id={todo.id} todolist={todo} key={i} /> )
});
const filterNU=todolist.filter(todo=>(todo.iau=="NAU"&&todo.state==selectedStatus));
const NU=filterNU.map((todo,i)=>{
  return <Outputlist todolist={todo} key={i} />
});
const filterIN=todolist.filter(todo=>(todo.iau=="IAN"&&todo.state==selectedStatus));
const IN=filterIN.map((todo,i)=>{
  return <Outputlist todolist={todo} key={i} />
});
const filterNN=todolist.filter(todo=>(todo.iau=="NAN"&&todo.state==selectedStatus))
const NN=filterNN.map((todo,i)=>{
  return <Outputlist todolist={todo} key={i} />
});
const statusButtons=Object.keys(statuses).map(statusId=>{
  //classNames is a html but we use it in java scripte
  const buttonClass=classNames(
    "px-4 py-2 border",
    {
      "bg-blue-500": selectedStatus===parseInt(statusId)
    }
  )
  
  //console.log(statusId);
  return(
    
    <button
    key={statusId}
    className={buttonClass}
    onClick={()=>setSelectedStatus(parseInt(statusId  ))}>{statuses[statusId]}</button>
  );
})

const showModal=() =>{
  setIsModalVisible(true);
};
const hideModal=() =>{
  setIsModalVisible(false);
};
const onAddJob =(newJob) => {
  hideModal();
  setToDoList((todolist)=>{

    return [...todolist, newJob];
  });
};
const showdelete=() =>{
  setIsModalVisible1(true);
};
const hidedelete=() =>{
  setIsModalVisible1(false);
};
const ondeleteJob =() => {
  hidedelete();
  setToDoList((todolist)=>{

    return [...todolist];
  });
};
const showupdate=() =>{
  setIsModalVisible2(true);
};
const hideupdate=() =>{
  setIsModalVisible2(false);
};
const onupdateJob =() => {
  hideupdate();
  setToDoList((todolist)=>{

    return [...todolist];
  });
};

return(
<div><br />
 
 
 <div id="first" className='px-60 bg-yellow-400'>  
<div className="grid grid-cols-6 my-4 ">{statusButtons}</div>
<div className="flex justify-between "> 
<div></div>
<div>
  <button
  className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
  onClick={showModal}>+add Job</button>
  <button className="bg-red-600 text-white"
  onClick={showdelete}>- delete</button>
 <button className="bg-green-600 text-white"
  onClick={showupdate}>& update</button>
</div>
</div>
{/*isVisible and hidemodal is prameter so we write the prameter in
<tag    paramter call here  /> */}
<AddModal isVisible={isModalVisible} hideModal={hideModal}>
<AddJobForm onAddJob={onAddJob} />
</AddModal>

<DeleteModal isVisible1={deleteVisible} hideModal1={hidedelete}>
  <DelJobForm ondeleteJob={ondeleteJob}/>
</DeleteModal>
<Updatemodle isVisible2={updateVisible} hideModal2={hideupdate}>
<UpJobForm onupdateJob={onupdateJob} />
</Updatemodle>
<h1>state:<br /> 1:working on<br />  2:remove<br />3:finished
</h1>
  <div>
  <table id="T">
    <thead>
      <tr>
        <th>Important and urgent</th>
        <th>Important and not urgent</th>
        <th>not important and urgent</th>
        <th>not important and not urgent</th>
      </tr>
    </thead>
    <th>
      <tr>
         {IU} 
      </tr>
    </th>
  <th>
    <tr>
    {IN}
    </tr>
  </th>
    <th>
      <tr>
      {NU}
      </tr>
  </th>
    <th>
      <tr> 
        {NN}
      </tr>
    </th>
     
    </table>
    </div>

    </div>
    </div>
    
);}



// const [isdeletvisible, setDeleteisVisble]=useState(false);
// const showModalDelete=()=>{
//   setDeleteisVisble(true);

// };
// const hideModalDelete=()=>{
//   setDeleteisVisble(false);
// };
//  const ondelete =(deletejob) => {
//    hideModalDelete();
//    setToDoList((todoList) => {
//     const deleteElement = (element) => {
//   // Filter out the element from the todolist
//   const updatedList = todoList.filter((item) => item.todo == element);
//   todoList.state=2;
//   // Set the updated list as the new state value
//  }
// });
//  };
/* <div>
  <button
  className="bg-red-500 px-4 py-2 hover:bg-red-600 transition"
  onClick={showModalDelete}>- DeleteModel</button>
</div>
<DeleteModel isVisible1={isdeletvisible} hideModal1={hideModalDelete}  >
<AddJobForm  deletejob={ondelete} />      </DeleteModel> */



