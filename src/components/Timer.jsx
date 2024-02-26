const Timer = ({ seconds, minutes }) => {
  return (
    <div className='dark:text-slate-200'>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
