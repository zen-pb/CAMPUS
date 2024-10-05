import { useState } from "react";

export default function Profile({ session }, user_type) {
  const [userData, setUserData] = useState({
    id_number: session.user.id_number,
    given_name: session.user.given_name,
    middle_name: session.user.middle_name,
    surname: session.user.surname,
  });

  return (
    <div>
      <h1>{given_name} {middle_name[0]}.</h1>
    </div>
    
  );
}
