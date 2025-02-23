interface LogOutButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const LogOutButton = ({ ...props }: LogOutButton) => {
  return (
    <button
      {...props}
      className="hover:text-white text-red-500 hover:cursor-pointer transition duration-500 ease-in-ou hover:bg-red-500 md:px-5 md:py-3 px-3 py-1"
    >
      Log-out
    </button>
  );
};
