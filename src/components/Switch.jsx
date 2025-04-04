export const Switch = ({ name, value, onChange }) => {
  return (
    <button
      className={`cursor-pointer border px-3 py-2 font-black ${value ? "bg-black text-white" : ""}`}
      type="button"
      onClick={onChange}
    >
      {name} {value ? "On" : "Off"}
    </button>
  );
};
