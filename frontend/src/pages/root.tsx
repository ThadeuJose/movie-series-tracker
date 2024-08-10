import { NavLink, Outlet } from 'react-router-dom';

export function Root() {
  return (
    <div className="m-4">
      <nav className="flex my-4">
        <NavLink to={`/`} className="text-3xl font-bold mr-auto">
          Media Tracker
        </NavLink>

        <NavLink
          to={`Tv`}
          className={({ isActive }) => {
            if (isActive) {
              return 'border-b-2 border-blue-500 m-2';
            }
            return 'm-2';
          }}
        >
          TV
        </NavLink>

        <NavLink
          to={`movies`}
          className={({ isActive }) => {
            if (isActive) {
              return 'border-b-2 border-blue-500 m-2';
            }
            return 'm-2';
          }}
        >
          Movies
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
