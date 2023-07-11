import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import MyApp from '../App';
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}


export default function Contact() {
  const { contact } = useLoaderData();
  
  return (
    <div>
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}


        </h1>

        { <p> Date={contact.Date}</p>}

        <div>
        <Form action="edit">
            <button type="submit"><AiFillEdit></AiFillEdit></button>
            </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record."))
              {
                event.preventDefault();
              }}}>
                
            <button type="submit"><FaRegTrashAlt /></button>
          </Form>
        </div>
        
      </div>
       
    </div>
    <MyApp />
    </div>
  );
}
