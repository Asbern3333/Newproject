import { Form, useLoaderData } from "react-router-dom";
//first
 import { redirect,useNavigate, } from "react-router-dom";
 import { updateContact } from "../contacts";

 export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }
export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Date</span>
      <input
          placeholder="Date"
          aria-label="Date"
          type="Date"
          name="Date"
          defaultValue={contact.Date}
        /></label>
        <label>
          <span>Avatar URL</span>
          <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
        
      </label>
     
      <p>
        <button type="submit">Save</button                                                                        >
        <button  onClick={() => {
            navigate(-1);
          }} type="button">Cancel</button>
      </p>
    </Form>
  );
}