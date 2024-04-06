import { NavLink } from "react-router-dom";
import { useUserContext } from "../../../utils/useUserContext";

function NavigationPanel() {
  const { session } = useUserContext();

  const isAdmin = session?.user.publicMetadata.admin ? true : false;

  return (
    <div className="flex mx-48 pt-3 ">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "m-2 mb-4"
            : isActive
            ? "m-2 mb-4 underline underline-offset-[10px]"
            : "m-2 mb-4"
        }
      >
        Community
      </NavLink>
      <NavLink
        to="/classroom"
        className={({ isActive, isPending }) =>
          isPending
            ? "m-2 mb-4"
            : isActive
            ? "m-2 mb-4 underline underline-offset-[10px]"
            : "m-2 mb-4"
        }
      >
        Classroom
      </NavLink>

      <NavLink
        to={"/about"}
        className={({ isActive, isPending }) =>
          isPending
            ? "m-2 mb-4"
            : isActive
            ? "m-2 mb-4 underline underline-offset-[10px]"
            : "m-2 mb-4"
        }
      >
        About
      </NavLink>
      {isAdmin && (
        <NavLink
          to="/instructor"
          className={({ isActive, isPending }) =>
            isPending
              ? "m-2 mb-4"
              : isActive
              ? "m-2 mb-4 underline underline-offset-[10px]"
              : "m-2 mb-4"
          }
        >
          Instructor
        </NavLink>
      )}
    </div>
  );
}

export default NavigationPanel;
