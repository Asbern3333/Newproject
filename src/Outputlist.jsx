import {PropTypes} from "prop-types";
import Changestate from "./Changestate";
function Outputlist({todolist})
{
const{
    id,
    todo,
    date,
    state,
}=todolist;

return(
    <div data-testid="to-do" className="flex items-start">
        <div>
        <ul>
            <li>
             <h2 className="text-xl font-bold " data-testid={id}>
                {todo}
                
             <br></br>
             {date}
             <br></br> 
            {state}
            </h2>
             id={id}
        </li>
         </ul>

         
        </div>
    </div>
);}
Outputlist.propTypes ={
todolist: PropTypes.shape({
    todo: PropTypes.string,
    date: PropTypes.string,
    state:PropTypes.number,
    }),
};
// function e()
// {

// }
export default Outputlist;
//86118873367
//422545