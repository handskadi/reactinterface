import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import { useEffect, useState } from "react";

function App() {
  const [appointentList, setAppointentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("clientName");
  const [orderBy, setOrderBy] = useState("asc");

  const filterAppointments = appointentList
    .filter((item) => {
      return (
        item.clientName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      const order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
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
    <div className="App container mx-auto mt-3 font-thin p-4">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-yellow-500 align-top" />
        Your Appointments
      </h1>
      <AddAppointment
        onSendAppointment={(myAppointment) =>
          setAppointentList([...appointentList, myAppointment])
        }
        lastId={appointentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        onQueryChange={handleSearch}
        query={query}
        orderby={orderBy}
        onOrderByChange={(mySort) => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />

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
