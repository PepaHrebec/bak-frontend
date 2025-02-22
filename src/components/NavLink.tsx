import { createLink, LinkComponent } from "@tanstack/react-router";
import { forwardRef } from "react";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
}

const BasicLinkComponent = forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => {
    return <a ref={ref} {...props} />;
  }
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const NavLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      className="hover:text-black transition duration-500 ease-in-ou hover:bg-gray-200 px-5 py-3"
      preload={"intent"}
      activeProps={{
        className: "text-black font-bold",
      }}
      inactiveProps={{
        className: "text-gray-500",
      }}
      activeOptions={{ exact: true }}
      {...props}
    >
      {props.text}
    </CreatedLinkComponent>
  );
};
