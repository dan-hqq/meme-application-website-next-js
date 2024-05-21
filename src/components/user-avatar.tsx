import { auth } from "../auth"
import Image from "next/image";

 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session.user) return null
 
  return (
    <div>
      <Image 
        src={session.user.img}
        alt="User Avatar"
      />
    </div>
  )
}