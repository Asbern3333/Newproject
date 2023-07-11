import { Outlet,NavLink,useNavigation,useLoaderData, Form,redirect } from "react-router-dom";  

import { getContacts, createContact } from "../contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
  return { contact };
}

export async function loader({request}) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts };
}


  
export default  function Root() {
  const { contacts } = useLoaderData();
 
  return ( 
       <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        
        <div 
        id="detail"
        className={
          useNavigation.state === "loading" ? "loading" : ""
        }>
        <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
         <Form method="post">
            <button  type="submit">New</button>
          </Form>
        
        </div>
        <nav>
           {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                    <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}<br></br>{contact.Date}<br></br>
                        </>
                      ) : (
                        <i>No Name</i> 
                      )}{" "}
                    </NavLink>
                   
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
           </nav>
      </div>
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}