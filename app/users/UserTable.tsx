import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    // next: { revalidate: 10 },
    cache: "no-store",
  });
  // only works for fetch requests
  // wont work for axios
  // it will revalidate the data every 10 seconds

  // Rendering -> 1) Client Side
  //           -> 2) Server Side -> Dynamic and Static
  // Dynamic (at request time) -> Server Side Rendering
  // Static (at build time) -> Static Site Generation
  // If i use cache: "no-store" then it will always fetch the data from the server
  // if i use next: { revalidate: 10 } then it will revalidate the data every 10 seconds
  // if i dont use anything then it will fetch the data from the server only once and then it will cache the data

  const users: User[] = await res.json();
  const sortedUsers = sort(users).asc(
    sortOrder === "email" 
    ? (user) => user.email 
    : (user) => user.name
  );

  {
    /* <p>{new Date().toLocaleTimeString()}</p> */
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
