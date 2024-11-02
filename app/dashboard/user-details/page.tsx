import Icon from "@/app/components/icon"
import Link from "next/link"
import UserDetailsData from "@/app/components/userDetailsData"

export default function UserDetails() {
  return (
    <div className="dashbContentWrapper">
      <main className="userDetails">
        <header>
          <Link href="/dashboard" className="linkBack">
            <Icon filename="arrow-back.svg" />
            Back to Users
          </Link>
          <div className="buttonGroup">
            <h1>User Details</h1>
            <span className="buttons">
              <button className="blacklist">Blacklist User</button>
              <button className="activate">Activate User</button>
            </span>
          </div>
        </header>
        <UserDetailsData />
      </main>
    </div>
  )
}
