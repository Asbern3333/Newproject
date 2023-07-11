import { useState } from "react";

async function Changestate() {
  try {
    const response = await fetch("http://localhost:5002/todolist");
    const t = await response.json();

    // Modify the state property of each object in the array
    const updatedT = t.map((item) => {
      return { ...item, state: "2" };
    });

    const updateResponse = await fetch("http://localhost:5002/todolist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedT),
    });

    if (updateResponse.ok) {
      console.log("State updated successfully.");
    } else {
      console.error("Failed to update the state. Server returned status:", updateResponse.status);
    }
  } catch (error) {
    console.error("An error occurred while updating the state:", error);
  }
}

export default Changestate;
