import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import { useEffect, useState } from "react";

function App() {
  const [appointentList, setAppointentList] = useState([]);
  const [query, setQuery] = useState("");
  const filterAppointments = appointentList.filter((item) => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    );
  });

  useEffect(() => {
    fetch("http://localhost:3000/data.json")
      .then((response) => response.json())
      .then(setAppointentList);
  }, [setAppointentList]);

  function handleDeletion(appointmentId) {
    setAppointentList(
      appointentList.filter((appointment) => appointment.id !== appointmentId)
    );
  }

  function handleSearch(myQuery) {
    setQuery(myQuery);
  }

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <AddAppointment />
      <Search onQueryChange={handleSearch} query={query} />

      <ul className="divide-y divide-gray-200">
        {filterAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={handleDeletion}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
