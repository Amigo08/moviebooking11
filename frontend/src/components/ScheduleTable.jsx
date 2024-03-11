import React, { useContext, useRef } from 'react';
import { EyeSlashIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ScheduleTable = ({ cinema, selectedDate }) => {
  const ref = useRef(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const isPast = (date) => {
    return date < new Date();
  };

  return (
    <>
      <div ref={ref}>
        {cinema.theaters?.map((theater, index) => (
          <React.Fragment key={index}>
            {theater.showtimes?.map((showtime, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isPast(new Date(showtime.showtime)) || auth.role === 'admin')
                    return navigate(`/showtime/${showtime._id}`);
                }}
                disabled={isPast(new Date(showtime.showtime)) && auth.role !== 'admin'}
              >
                {!showtime.isRelease && <EyeSlashIcon />}
                <p>{showtime.movie.name}</p>
                <p>
                  {new Date(showtime.showtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {new Date(new Date(showtime.showtime).getTime() + showtime.movie.length * 60000).toLocaleTimeString(
                    [],
                    { hour: '2-digit', minute: '2-digit' }
                  )}
                </p>
              </button>
            ))}
          </React.Fragment>
        ))}
        {cinema.theaters.length === 0 && (
          <div>There are no showtimes available</div>
        )}
        {cinema.theaters.map((theater, index) => (
          <div key={index}>
            <p>{index + 1}</p>
            {auth.role === 'admin' && (
              <>
                <div>
                  <p>A - {theater.seatPlan.row}</p>
                  <p>1 - {theater.seatPlan.column}</p>
                </div>
                <p>
                  <UserIcon />
                  {(theater.seatPlan.row.charCodeAt(0) - 64) * theater.seatPlan.column}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ScheduleTable;
